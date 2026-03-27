# Proyecto Node.js - Registro, Passport y JWT

Este proyecto base cumple con la consigna de autenticación y autorización:

## Incluye

1. Modelo `User` con atributos:
   - `email`
   - `password`
   - `passwordResetToken`
   - `passwordResetTokenExpires`
   - `verificado`
2. Modelo `Token` con:
   - referencia al usuario
   - token
   - fecha de creación
3. Ejecución de email simulada por consola
4. Email de bienvenida con link de verificación
5. Vistas de login, registro y recupero de password
6. `serializeUser` y `deserializeUser` en `config/passport.js`
7. Flujo de credenciales correctas e incorrectas
8. Redirección al login si se intenta entrar a `/bicicletas` sin sesión
9. Login de API con JWT para Postman en `POST /api/auth/login`
10. Protección de recursos de bicicletas con token Bearer JWT

## Base de datos

Configura Mongo local:

`mongodb://127.0.0.1:27017/red_bicicletas`

## Uso

1. Copia `.env.example` como `.env`
2. Ejecuta `npm install`
3. Asegúrate de tener MongoDB local activo
4. Ejecuta `npm run devstart`

## Rutas web

- `GET /register`
- `GET /login`
- `GET /forgot-password`
- `GET /bicicletas` (protegida por sesión)

## Rutas API

- `POST /api/auth/login`
- `GET /api/bicicletas` (Bearer token)
- `POST /api/bicicletas` (Bearer token)

## Ejemplo Postman

### Login correcto

`POST /api/auth/login`

```json
{
  "email": "demo@example.com",
  "password": "123456"
}
```

### Respuesta

```json
{
  "token": "...jwt..."
}
```

### Recurso protegido

Header:

`Authorization: Bearer TU_TOKEN`

## Nota

El envío de email está implementado como simulación por consola para que puedas mostrar evidencia del paso “email ejecutado” sin depender de credenciales SMTP reales.
