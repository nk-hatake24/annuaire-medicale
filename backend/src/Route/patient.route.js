const route = require('express').Router()

const {createPatient, getAllPatients,deletePatientById, getPatientById, modifyPatientById} =require('../controllers/patientContoller')

route.post('/',createPatient)
route.get('/', getAllPatients)
route.get('/:id', getPatientById)
route.patch('/:id', modifyPatientById)
route.delete('/:id', deletePatientById)


module.exports= route