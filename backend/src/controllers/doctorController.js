const Doctor = require('../models/doctorModel');


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
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };


module.exports={createDoctor, getAllDoctors}