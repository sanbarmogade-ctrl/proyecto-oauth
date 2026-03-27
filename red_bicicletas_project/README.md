# Red de Bicicletas

Proyecto base en Node.js con Express, MongoDB y Mongoose para gestionar una red de bicicletas.

## Requisitos cumplidos

- Base local MongoDB llamada `red_bicicletas`
- CRUD completo para bicicletas
- Modelo `Bicicleta` conectado con Mongoose
- Tests API y tests de persistencia del modelo
- Archivo `bicicleta_api_test.spec.js`
- Carpeta `spec/models`
- Preparado para usar con Postman y Mongo Compass

## Instalación

```bash
npm install
```

## Ejecutar aplicación

```bash
npm start
```

## Ejecutar en desarrollo

```bash
npm run devstart
```

## Ejecutar tests

```bash
npm test
```

## Base de datos

La app usa por defecto la base local:

```bash
mongodb://127.0.0.1:27017/red_bicicletas
```

## Endpoints

- `GET /api/bicicletas`
- `GET /api/bicicletas/:id`
- `POST /api/bicicletas`
- `PUT /api/bicicletas/:id`
- `DELETE /api/bicicletas/:id`

## Ejemplo POST para Postman

```json
{
  "codigo": 1,
  "color": "roja",
  "modelo": "urbana",
  "lat": -34.6037,
  "lng": -58.3816
}
```

## Repositorio

Pega aquí la URL de tu repositorio GitHub o Bitbucket después de subirlo.
