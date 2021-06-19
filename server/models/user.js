const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: [4, 'Too shord, min 4 chars'],
    max: [32, 'Too long, max 32 chars']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    min: [4, 'Too shord, min 4 chars'],
    max: [32, 'Too long, max 32 chars']
  },
  email: {
    type: String,
    required: 'Email is required',
    unique: true,
    lowercase: true,
    min: [4, 'Too shord, min 4 chars'],
    max: [32, 'Too long, max 32 chars'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  level: {
    type: String,
    enum: ['User', 'Bronze Member', 'Silver Member', 'Gold Member', 'Moderator', 'Super User', 'Admin'],
    default: 'User'
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
      type: Date
  },
  rentals: [{
    type: Schema.Types.ObjectId, ref: 'Rental'
  }]
});

userSchema.pre('save', function(next){
  const user = this;
  const saltRounds = 10;
  const plainPassword = user.password;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(saltRounds, function(err, salt){
    if (err) return next(err);
    bcrypt.hash(plainPassword, salt, function(err, hash){
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema)