const { Schema } = mongoose;
const Building = require('./buildingModel');
const pharmacySchema = new Schema({
  hasDriveThru: {
    type: Boolean,
    required: [true, 'Drive-thru availability is required']
  },
  numberOfPharmacists: {
    type: Number,
    required: [true, 'Number of pharmacists is required'],
    min: [0, 'Number of pharmacists cannot be negative']
  }
});

const Pharmacy = Building.discriminator('Pharmacy', pharmacySchema);

module.exports = Pharmacy;
