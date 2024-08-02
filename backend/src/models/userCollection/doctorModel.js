const User = require('./userModel'); 
const { Schema } = mongoose;

const doctorSchema = new Schema({
  specialty: {
    type: String,
    required: [true, 'Specialty is required'],
    trim: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'License number is required'],
    unique: true,
    trim: true
  }
});

const DoctorModel = User.discriminator('Doctor', doctorSchema);

module.exports = DoctorModel;