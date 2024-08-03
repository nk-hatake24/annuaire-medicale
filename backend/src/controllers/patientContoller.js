const Patient = require('../models/userCollection/patientModel');

const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else if (error.code === 11000) {
      res.status(409).json({ message: 'Duplicate entry' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};


const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(400).json({ message: 'Invalid patient ID' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};


const modifyPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else if (error.code === 11000) {
      res.status(409).json({ message: 'Duplicate entry' });
    } else if (error.kind === 'ObjectId') {
      res.status(400).json({ message: 'Invalid patient ID' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};


const deletePatientById = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(400).json({ message: 'Invalid patient ID' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = { createPatient, getAllPatients, getPatientById, modifyPatientById, deletePatientById };
