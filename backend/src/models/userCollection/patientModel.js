const User = require('./userModel'); 
const { Schema } = mongoose;

const patientSchema = new Schema({
    medicalHistory: {
      type: String,
      trim: true
    },
    allergies: {
      type: String,
      trim: true
    },
    currentTreatments: {
      type: String,
      trim: true
    },
    remarks: {
      type: String,
      trim: true
    }
  });
  
  const Patient = User.discriminator('Patient', patientSchema);
  
  module.exports = Patient;
  