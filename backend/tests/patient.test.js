const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { createPatient, getAllPatients, getPatientById, modifyPatientById, deletePatientById } = require('../src/controllers/patientContoller'); 

const app = express();
app.use(express.json());

app.post('/patients', createPatient);
app.get('/patients', getAllPatients);
app.get('/patients/:id', getPatientById);
app.put('/patients/:id', modifyPatientById);
app.delete('/patients/:id', deletePatientById);

beforeAll(async () => {
  const url = `mongodb+srv://nkMichel:Viande2@cluster0.2h7ebpu.mongodb.net/annuaireMedical`;
  await mongoose.connect(url);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Patient Controller', () => {
  let patientId;

  it('should create a new patient', async () => {
    const response = await request(app).post('/patients').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
      phoneNumber: '12345678901234567890',
      address: '456 Main St',
      dateOfBirth: '1990-01-01',
      medicalHistory: 'No major illnesses',
      allergies: 'None',
      currentTreatments: 'None',
      remarks: 'Healthy'
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    patientId = response.body._id;
  });

  it('should not create a patient with missing required fields', async () => {
    const response = await request(app).post('/patients').send({
      lastName: 'Doe'
    });
    expect(response.status).toBe(400);
  });

  it('should get all patients', async () => {
    const response = await request(app).get('/patients');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a patient by id', async () => {
    const response = await request(app).get(`/patients/${patientId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', patientId);
  });

  it('should return 404 for non-existing patient', async () => {
    const response = await request(app).get(`/patients/${new mongoose.Types.ObjectId()}`);
    expect(response.status).toBe(404);
  });

  it('should return 400 for invalid patient id', async () => {
    const response = await request(app).get('/patients/invalid-id');
    expect(response.status).toBe(400);
  });

  it('should update a patient by id', async () => {
    const response = await request(app).put(`/patients/${patientId}`).send({
      medicalHistory: 'Updated medical history'
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('medicalHistory', 'Updated medical history');
  });

  it('should not update a patient with invalid data', async () => {
    const response = await request(app).put(`/patients/${patientId}`).send({
      email: 'invalid-email'
    });
    expect(response.status).toBe(400);
  });

  it('should delete a patient by id', async () => {
    const response = await request(app).delete(`/patients/${patientId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Patient deleted successfully');
  });

  it('should return 404 when deleting non-existing patient', async () => {
    const response = await request(app).delete(`/patients/${new mongoose.Types.ObjectId()}`);
    expect(response.status).toBe(404);
  });

  it('should return 400 when deleting with invalid patient id', async () => {
    const response = await request(app).delete('/patients/invalid-id');
    expect(response.status).toBe(400);
  });
});
