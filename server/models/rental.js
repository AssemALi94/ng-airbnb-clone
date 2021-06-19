const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {type: String, required: true, max: [128, 'Too long, max 128 chars']},
  city: {type: String, required: true, lowercase: true},
  street: {type: String, required: true, min: [4, 'Too short, min 4 chars']},
  category: {type: String, required: true, lowercase: true},
  image: {type: String, required: true},
  bedrooms: Number,
  shared: Boolean,
  description: {type: String, required: true},
  dailyRates: Number,
  createAt: {
    type: Date,
    default: Date.now,
    get: v => moment(v).format('YYYY-MM-DD HH:mm')
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
});

module.exports = mongoose.model('Rental', rentalSchema);