const route = require('express').Router()

const {createDoctor, deleteDoctorById, getAllDoctors, getDoctorById, modifyDoctorById} =require('../controllers/doctorController')


route.post('/', createDoctor)
route.get('/', getAllDoctors)
route.get('/:id', getDoctorById)
route.patch('/:id', modifyDoctorById)
route.delete('/:id', deleteDoctorById)

module.exports = route