# API MLBT - GA7_220501096_AA5_EV03

## Proyecto

MLBT Project - María La Bonita Taquería.

## Evidencia

GA7-220501096-AA5-EV03 - Diseño y Desarrollo de servicios web - proyecto.

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
- Postman para la evidencia EV04.

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

Desde la carpeta 02_BACK_END/01_API_NODE:

    pnpm install
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

## Documentación del módulo

| Documento | Ruta |
|---|---|
| Endpoints EV03 | [docs/ENDPOINTS_EV03.md](docs/ENDPOINTS_EV03.md) |
| Base de datos EV03 | [docs/BASE_DATOS_EV03.md](docs/BASE_DATOS_EV03.md) |
| Datos iniciales EV03 | [docs/DATOS_INICIALES_EV03.md](docs/DATOS_INICIALES_EV03.md) |
| Validación de endpoints EV03 | [docs/VALIDACION_ENDPOINTS_EV03.md](docs/VALIDACION_ENDPOINTS_EV03.md) |
| Guía Postman EV04 | [docs/POSTMAN_EV04.md](docs/POSTMAN_EV04.md) |
| Separación de evidencias AA5 | [docs/SEPARACION_EVIDENCIAS_AA5.md](docs/SEPARACION_EVIDENCIAS_AA5.md) |

## Evidencia EV04 - Pruebas Postman

La evidencia GA7-220501096-AA5-EV04 valida esta API mediante una colección Postman.

Archivo de colección:

- [postman/GA7_220501096_AA5_EV04_MLBT_API.postman_collection.json](postman/GA7_220501096_AA5_EV04_MLBT_API.postman_collection.json)

Capturas de evidencia:

- [../../03_DOCS/evidencias/GA7_220501096_AA5_EV04/capturas/postman](../../03_DOCS/evidencias/GA7_220501096_AA5_EV04/capturas/postman)

## Nota de seguridad

El archivo .env es local y no debe versionarse. Se incluye .env.example como plantilla segura.
