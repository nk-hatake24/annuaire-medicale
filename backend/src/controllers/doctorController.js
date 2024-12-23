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
 
  const getSearchedDoctor = async (req, res) => {
    const { username, speciality, hospital, town, page = 1, limit = 10 } = req.query;
  
    const query = {};
    // { $regex: `^${search}`, $options: 'i' }
    if (username) query.username={ $regex: `^${username}`, $options: 'i' }; // 'i' for case-insensitive search
    if (speciality) query.speciality = { $regex: `^${speciality}`, $options: 'i' };
    if (hospital) query.hospital = { $regex: `^${hopital}`, $options: 'i' }
    if (town) query.town = { $regex: `^${town}`, $options: 'i' };
    
    try {
      const doctors = await Doctor.find(query)
        .limit(parseInt(limit)) // Limit the number of results per page
        .skip((parseInt(page) - 1) * parseInt(limit)); // Skip the results for previous pages
  
      const total = await Doctor.countDocuments(query); // Get total count of matching documents
      
      res.json(
        doctors
        // total,
        // page: parseInt(page),
        // totalPages: Math.ceil(total / parseInt(limit)), 
      );
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  

  const getAllDoctors = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10; // Default limit to 10
      const cursor = req.query.cursor || null; // Get cursor from query
  
      let query = {};
  
      // If a cursor is provided, filter documents with _id greater than the cursor
      if (cursor) {
        query = { _id: { $gt: cursor } }; // Use the cursor to get documents after the given _id
      }
  
      // Fetch doctors from the database, sorted by _id in ascending order
      const doctors = await Doctor.find(query)
        .sort({ _id: 1 }) // Sort by _id to ensure correct order
        .limit(limit); // Limit the number of results
  
      // If there are no doctors returned, return an empty array and null for the next cursor
      if (doctors.length === 0) {
        return res.json({ doctors: [], nextCursor: null });
      }
  
      // The next cursor is the _id of the last doctor in the returned array
      const nextCursor = doctors[doctors.length - 1]._id;
  
      // Respond with the fetched doctors and the next cursor
      res.status(200).json({ doctors, nextCursor });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


  const getAllDoctorWithOutCursorBase = async (req, res) => {
    const { search, page = 1, limit = 5 } = req.query;
    try {
        const skip = (page - 1) * limit;

        const allDoctors = await Doctor.find({
            username: { $regex: `^${search}`, $options: 'i' },
        })
            .select('username')
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json(allDoctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
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

module.exports={createDoctor, getAllDoctors, getDoctorById, getAllDoctorWithOutCursorBase,  modifyDoctorById,getSearchedDoctor, deleteDoctorById, signupDoctor}