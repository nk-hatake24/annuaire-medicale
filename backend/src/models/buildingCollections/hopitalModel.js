const mongoose = require('mongoose');
const { Schema } = mongoose;
const Building = require('./buildingModel');
const Services = require('./servicesModel');

const hospitalSchema = new Schema({
  numberOfBeds: {
    type: Number,
    required: [true, 'Number of beds is required'],
    min: [0, 'Number of beds cannot be negative']
  },
  emergencyServices: {
    type: Boolean,
    required: [true, 'Emergency services availability is required']
  },
  services: [{
    type: Schema.Types.ObjectId,
    ref: 'Services',
    required: [true, 'Hospital services are required']
  }]
});

const Hospital = Building.discriminator('Hospital', hospitalSchema);

module.exports = Hospital;

