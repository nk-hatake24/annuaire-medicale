const Doctor = require('../models/userCollection/doctorModel');
const {main} = require('../config/scrapped')


const createDoctor = async (req, res) => {
    try {
      const doctor = new Doctor(req.body);
      await doctor.save();
      res.status(201).json(doctor);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
      } else if (error.code === 11000) {
        res.status(409).json({ message: 'License number already exists' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  const getAllDoctors = async (req, res) => {

    try {
      // const scrappedDoctors = await main()
      const doctors = await Doctor.find().limit(10);
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getDoctorById = async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.params.id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (error) {
      if (error.kind === 'ObjectId') {
        res.status(400).json({ message: 'Invalid doctor ID' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  const modifyDoctorById =  async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
      } else if (error.code === 11000) {
        res.status(409).json({ message: 'License number already exists' });
      } else if (error.kind === 'ObjectId') {
        res.status(400).json({ message: 'Invalid doctor ID' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };

  const signupDoctor = async (req, res) => {
  try {
    const { licenseNumber } = req.body;


    const updatedDoctor = await Doctor.findOneAndUpdate(
      { licenseNumber }, // Filter to find the doctor by license number
      req.body,          // Data to update
      { new: true,
        upsert: true
       }      // Return the updated document
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    // Error handling based on error type
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else if (error.code === 11000) {
      res.status(409).json({ message: 'License number already exists' });
    } else if (error.kind === 'ObjectId') {
      res.status(400).json({ message: 'Invalid doctor ID' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

  const deleteDoctorById = async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndDelete(req.params.id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
      if (error.kind === 'ObjectId') {
        res.status(400).json({ message: 'Invalid doctor ID' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

module.exports={createDoctor, getAllDoctors, getDoctorById, modifyDoctorById, deleteDoctorById, signupDoctor}