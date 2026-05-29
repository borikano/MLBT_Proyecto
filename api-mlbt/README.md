# API MLBT - GA7_220501096_AA5_EV03

## Proyecto

MLBT Project - María La Bonita Taquería

## Evidencia

GA7-220501096-AA5-EV03 - Diseño y Desarrollo de servicios web - proyecto

## Propósito

Este módulo contiene la API del proyecto MLBT. Expone servicios web para autenticación, usuarios, inventario y ventas.

## Stack técnico

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

