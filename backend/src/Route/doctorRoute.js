const route = require('express').Router()

const {createDoctor,signupDoctor, deleteDoctorById, getAllDoctors, getDoctorById, modifyDoctorById} =require('../controllers/doctorController')


route.post('/', createDoctor)
route.get('/', getAllDoctors)
route.get('/:id', getDoctorById)
route.put('/:id', modifyDoctorById)
route.patch('/', signupDoctor)
route.delete('/:id', deleteDoctorById)

module.exports = route