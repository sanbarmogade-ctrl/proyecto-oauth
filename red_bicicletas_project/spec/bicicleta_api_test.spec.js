const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Bicicleta = require('../models/bicicleta');

beforeAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
});

beforeEach(async () => {
  await Bicicleta.deleteMany({});
});

afterAll(async () => {
  await Bicicleta.deleteMany({});
  await mongoose.connection.close();
});

describe('API Bicicleta CRUD', () => {
  it('GET /api/bicicletas devuelve 200 y un array', async () => {
    const res = await request(app).get('/api/bicicletas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTrue();
  });

  it('POST /api/bicicletas crea una bicicleta', async () => {
    const res = await request(app)
      .post('/api/bicicletas')
      .send({ codigo: 1, color: 'roja', modelo: 'urbana', lat: -34.60, lng: -58.38 });

    expect(res.statusCode).toBe(201);
    expect(res.body.color).toBe('roja');
    expect(res.body.ubicacion[0]).toBe(-34.60);
  });

  it('GET /api/bicicletas/:id devuelve una bicicleta', async () => {
    const bicicleta = await Bicicleta.create({ codigo: 2, color: 'azul', modelo: 'mountain', ubicacion: [-34.61, -58.39] });

    const res = await request(app).get(`/api/bicicletas/${bicicleta._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.codigo).toBe(2);
  });

  it('PUT /api/bicicletas/:id actualiza una bicicleta', async () => {
    const bicicleta = await Bicicleta.create({ codigo: 3, color: 'verde', modelo: 'fixie', ubicacion: [-34.62, -58.40] });

    const res = await request(app)
      .put(`/api/bicicletas/${bicicleta._id}`)
      .send({ color: 'negra', modelo: 'gravel', lat: -34.63, lng: -58.41 });

    expect(res.statusCode).toBe(200);
    expect(res.body.color).toBe('negra');
    expect(res.body.modelo).toBe('gravel');
  });

  it('DELETE /api/bicicletas/:id elimina una bicicleta', async () => {
    const bicicleta = await Bicicleta.create({ codigo: 4, color: 'blanca', modelo: 'city', ubicacion: [-34.64, -58.42] });

    const res = await request(app).delete(`/api/bicicletas/${bicicleta._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('Eliminada');
  });
});
