const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const {normalizeErrors} = require('../helpers/mongoose');
const user = require('../controllers/user');

router.get('/secret', user.authMiddleware, function(req, res) {
  res.json({"secret": true});
});

router.get('', function(req, res) {
  Rental.find({}, function(err, foundRentals) {
    if (err) {
      res.status(422).json({
        errors: normalizeErrors(err.errors)
      });
    } else {
      res.status(200).json({ data: foundRentals });
    }
  });
});

router.get('/:id', function(req, res) {
  const rentalId = req.params.id;
  Rental.findById(rentalId, function(err, foundRental) {
    if (err) {
      res.status(422).json({
        errors: [
          {
            source: '/rentals/:id',
            title: 'Rental Error',
            description: 'Could not find Rental!'
          }
        ]
      });
    } else {
      res.status(200).json({ data: foundRental });
    }
  });
});

module.exports = router;