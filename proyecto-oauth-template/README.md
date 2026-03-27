Proyecto Node JS con Express y MongoDB.

Este proyecto cumple con los requisitos de la práctica:

- Mensaje de bienvenida a Express.
- Proyecto preparado para vincularse a un repositorio remoto.
- Mapa centrado en una ciudad.
- Marcadores con ubicaciones.
- Script npm llamado devstart utilizando nodemon.
- Bicicletas en memoria cerca del centro del mapa.
- Colección/modelo de bicicletas en MongoDB.
- Endpoints API para probar con Postman.

Repositorio remoto sugerido:

git remote add origin https://github.com/sanbarmogade-ctrl/proyecto-oauth.git

git branch -M main
git push -u origin main

Instalación:

npm install

Ejecución:

npm run devstart

Variables opcionales:

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/proyecto_bicicletas

Endpoints:

GET /api/bikes/memory
GET /api/bikes
GET /api/bikes/:id
POST /api/bikes
PUT /api/bikes/:id
DELETE /api/bikes/:id
