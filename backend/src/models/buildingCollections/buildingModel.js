const mongoose = require('mongoose');
const { Schema } = mongoose;

const buildingSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Building name is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);  // Example for a 10-digit phone number
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  openingHours: {
    type: String,
    required: [true, 'Opening hours are required']
  }
}, {
  discriminatorKey: 'type', // our discriminator key, could be anything
  timestamps: true
});

const Building = mongoose.model('Building', buildingSchema);

module.exports = Building;
