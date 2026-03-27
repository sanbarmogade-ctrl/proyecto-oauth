const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');
const db = require('../../config/db');

describe('Bicicleta Model con persistencia', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await db.connect();
    }
  });

  beforeEach(async () => {
    await Bicicleta.deleteMany({});
  });

  afterAll(async () => {
    await Bicicleta.deleteMany({});
  });

  it('debe crear y persistir una bicicleta en MongoDB', async () => {
    const bici = Bicicleta.createInstance(10, 'amarilla', 'hibrida', -34.6037, -58.3816);
    await bici.save();

    const encontrada = await Bicicleta.findOne({ codigo: 10 });
    expect(encontrada).not.toBeNull();
    expect(encontrada.color).toBe('amarilla');
    expect(encontrada.ubicacion[1]).toBe(-58.3816);
  });

  it('debe listar documentos persistidos', async () => {
    await Bicicleta.create({ codigo: 11, color: 'gris', modelo: 'ruta', ubicacion: [-34.60, -58.37] });
    await Bicicleta.create({ codigo: 12, color: 'negra', modelo: 'bmx', ubicacion: [-34.61, -58.38] });

    const docs = await Bicicleta.find({});
    expect(docs.length).toBe(2);
  });
});
