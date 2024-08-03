const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { createDoctor, getAllDoctors, getDoctorById, modifyDoctorById, deleteDoctorById } = require('../src/controllers/doctorController'); 

const app = express();
app.use(express.json());

app.post('/doctors', createDoctor);
app.get('/doctors', getAllDoctors);
app.get('/doctors/:id', getDoctorById);
app.put('/doctors/:id', modifyDoctorById);
app.delete('/doctors/:id', deleteDoctorById);

beforeAll(async () => {
  const url = `mongodb+srv://nkMichel:Viande2@cluster0.2h7ebpu.mongodb.net/annuaireMedical`;
  await mongoose.connect(url);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Doctor Controller', () => {
  let doctorId;

  it('should create a new doctor', async () => {
    const response = await request(app).post('/doctors').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phoneNumber: '12345678901234567890',
      address: '123 Main St',
      dateOfBirth: '1990-01-01',
      specialty: 'Cardiology',
      licenseNumber: '12345'
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    doctorId = response.body._id;
  });

  it('should get all doctors', async () => {
    const response = await request(app).get('/doctors');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a doctor by id', async () => {
    const response = await request(app).get(`/doctors/${doctorId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', doctorId);
  });

  it('should update a doctor by id', async () => {
    const response = await request(app).put(`/doctors/${doctorId}`).send({
      specialty: 'Neurology'
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('specialty', 'Neurology');
  });

  it('should delete a doctor by id', async () => {
    const response = await request(app).delete(`/doctors/${doctorId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Doctor deleted successfully');
  });

  it('should return 404 for non-existing doctor', async () => {
    const response = await request(app).get(`/doctors/${new mongoose.Types.ObjectId()}`);
    expect(response.status).toBe(404);
  });

  it('should return 400 for invalid doctor id', async () => {
    const response = await request(app).get('/doctors/invalid-id');
    expect(response.status).toBe(400);
  });
});
