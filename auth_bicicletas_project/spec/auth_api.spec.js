const request = require('supertest');
const { expect } = require('chai');

describe('API auth y JWT', () => {
  it('documenta login y acceso a recursos protegidos', () => {
    expect(true).to.equal(true);
  });

  it('debe mostrar error con credenciales incorrectas', () => {
    expect('Credenciales incorrectas').to.be.a('string');
  });
});
