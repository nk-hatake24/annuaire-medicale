const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    specialty: { type: String, required: true },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
