# API MLBT - GA7_220501096_AA5_EV03

## Proyecto

MLBT Project - María La Bonita Taquería

## Evidencia

GA7-220501096-AA5-EV03 - Diseño y Desarrollo de servicios web - proyecto

## Propósito

Este módulo contiene los servicios REST de MLBT para autenticación, usuarios, inventario y ventas.

## Tecnologías utilizadas

- Node.js.
- Express.
- Prisma ORM.
- MySQL / MariaDB con XAMPP.
- bcrypt.
- JSON Web Token.
- Zod.
- pnpm.
- Postman para la siguiente evidencia EV04.

## URL local

http://localhost:3001

## Endpoints principales

- GET /
- GET /api/health
- POST /api/auth/login
- GET /api/auth/profile
- GET /api/users
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id
- GET /api/inventory
- POST /api/inventory
- PUT /api/inventory/:id
- DELETE /api/inventory/:id
- GET /api/sales
- POST /api/sales
- PUT /api/sales/:id
- DELETE /api/sales/:id

## Ejecución local

Antes de ejecutar, iniciar MySQL desde XAMPP.

Desde la carpeta api-mlbt:

node .\src\server.js

## Validación rápida

node .\src\server.js --check

## Base de datos

- Motor: MySQL / MariaDB.
- Base local: mlbt_api_ga7_aa5_ev03.
- ORM: Prisma.

## Datos iniciales

Para cargar datos iniciales:

node prisma/seed.js

## Documentación

- docs/ENDPOINTS_EV03.md
- docs/BASE_DATOS_EV03.md
- docs/DATOS_INICIALES_EV03.md
- docs/VALIDACION_ENDPOINTS_EV03.md

## Nota

El archivo .env es local y no debe versionarse. Se incluye .env.example como plantilla segura.
## Evidencia EV04 - Pruebas Postman

La evidencia **GA7-220501096-AA5-EV04 - API MLBT** valida esta API mediante una colección Postman.

Archivo de colección:

- `postman/GA7_220501096_AA5_EV04_MLBT_API.postman_collection.json`

Guía de pruebas:

- `docs/POSTMAN_EV04.md`

Pruebas documentadas:

- Ruta raíz de la API.
- Health check.
- Login correcto con generación de token JWT.
- Perfil protegido con token.
- Consulta de usuarios.
- Consulta de inventario.
- Consulta de ventas.
- Login incorrecto rechazado.
- Perfil sin token rechazado.

Capturas de evidencia:

- `../docs/evidencias/GA7_220501096_AA5_EV04/capturas/postman/`

Resultado:

La API fue probada en Postman y los endpoints principales respondieron según lo esperado.



