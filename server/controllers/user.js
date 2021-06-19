const { User } = require('../models');
const {normalizeErrors} = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const {environment} = require('../config');

exports.auth = function(req, res) {
  const {email, password} = req.body;
  if (!password || !email) {
    return send422Message(res, '/users/auth', 'Data Missing!', 'Provide email and password');
  }
  User.findOne({email}, function(err, user) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if(!user) {
      return send422Message(res, '/users/auth', 'Invalid User', 'User doesn\'t exists!');
    }
    user.comparePassword(password, function(err, isMatch) {
      if (err) return res.status(422).send({errors: normalizeErrors(err.errors)});
      else if (!isMatch) {
        return send422Message(res, '/users/register', 'Invalid Username or Email!', 'Username or Email not valid!');
      } else {
        // Generate JWT Token
        const token = jwt.sign({
          userId: user.id,
          username: user.username,
        }, environment.JWT_SECRET, { expiresIn: '1h'});
        res.status(200).send({token});

      }
    });
  });
}

exports.register = function(req, res) {
  const {username, email, password, passwordConfirmation} = req.body;
  if (!username || !password || !email) {
    return send422Message(res, '/users/register', 'Data Missing!', 'Provide username, email and password!');
  }

  const checkPassword = password===passwordConfirmation;
  if(!checkPassword){
    return send422Message(res, '/users/register', 'Invalid Password!', 'Password is not a same as confirmation!');
  }
  User.findOne({$or: [
      {email},
      {username}
    ]}, function(err, existingUser) {
    if (err) {
      res.status(422).json({
        errors: normalizeErrors(err.errors)
      });
    } else if (existingUser) {
      return send422Message(res, '/users/register', 'Invalid Username or Email!', 'Username or Email already used!');
    } else {
      const user = new User({
        username,
        email,
        password
      });
      user.save(function(err){
        if (err) {
          res.status(422).json({
            errors: normalizeErrors(err.errors)
          });
        } else {
          res.status(200).json({success: true, message: 'User registered successfully!'});
        }
      });
    }
  });

}

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {

    return send422Message(res, '/users/autMiddleware', 'Not Authorized!', 'You need to provide a token to get access!!!');
  } else {

    const user = parseToken(token);
    if(!user) {
      return send422Message(res, '/users/autMiddleware', 'JWT Malformed!', 'You need to provide a valid token to get access!!!');
    }
    User.findById(user.userId, function(err, user){
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      if (user) {
        // pass the user to the next middleware
        res.locals.user = user;
        next();
      } else {
        return send422Message(res, '/users/autMiddleware', 'Not Authorized!', 'You need to provide a token to get access!!!');
      }
    });
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], environment.JWT_SECRET, function(err, res ){
    if(err) {
      return null;
    }
    return res;
  });

}

function send422Message(res, source, title, description) {
  return res.status(422).json({
    errors: [
      {
        source,
        title,
        description
      }
    ]
  });
}