const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    speciality: { type: String, required: true },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
