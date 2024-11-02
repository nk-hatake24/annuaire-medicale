const express = require('express')
require('dotenv').config()
const {dbConnection} =require('./src/config/dbConfig')
const cors =require('cors')
const morgan = require('morgan')



const app = express()
const port =3001


app
.use(cors())
.options('*', cors())
.use(express.json())
.use(morgan("dev"))



dbConnection()



const doctorRoute = require('./src/Route/doctorRoute')
const patientRoute = require('./src/Route/patient.route')

app.use('/api/doctor', doctorRoute)
app.use('/api/patient', patientRoute)




 


app.listen(port , ()=> console.log(`the server is running on port ${port}`))