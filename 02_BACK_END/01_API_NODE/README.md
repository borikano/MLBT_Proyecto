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
- MySQL / MariaDB con XAMPP para ambiente local y Aiven MySQL 8.4 para despliegue público.
- bcrypt.
- JSON Web Token.
- Zod.
- pnpm.
- Postman para la evidencia EV04.

## URL pública

https://mlbt-proyecto.onrender.com

Health check público:

https://mlbt-proyecto.onrender.com/api/health

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

    pnpm test
    pnpm check

Validación de arranque sin levantar el servidor:

    node .\src\server.js --check

## Pruebas automatizadas

| Archivo | Alcance |
|---|---|
| src/__tests__/config.test.js | Configuración por ambiente y reglas de producción. |
| src/__tests__/http.test.js | Endpoints públicos, autenticación, autorización y errores HTTP. |
| src/__tests__/middlewares.test.js | Middlewares de autenticación y roles. |
| src/__tests__/schemas.test.js | Validación de entradas con Zod. |

## Base de datos

- Motor local: MySQL / MariaDB.
- Motor público: Aiven MySQL 8.4.
- Base local: mlbt_api_ga7_aa5_ev03.
- Base pública: defaultdb en Aiven.
- ORM: Prisma.

## Estado de producción

![API](https://img.shields.io/badge/API-Render-blue)
![Base de datos](https://img.shields.io/badge/DB-Aiven%20MySQL%208.4-orange)
![Prisma](https://img.shields.io/badge/Prisma-6.x-success)

La API está preparada para funcionar en producción con la configuración actual siempre que Render conserve las variables requeridas y la instancia Aiven permanezca activa.

| Requisito | Estado esperado |
|---|---|
| `DATABASE_URL` | Debe apuntar a Aiven MySQL mediante una cadena privada no versionada. |
| `JWT_SECRET` | Debe existir en Render para firmar tokens JWT. |
| `FRONTEND_ORIGIN` | Debe apuntar al dominio público de Vercel permitido por CORS. |
| Prisma | Se mantiene en `6.19.3` para conservar compatibilidad con `schema.prisma`. |
| Migraciones | Deben ejecutarse de forma controlada con `pnpm prisma:deploy` cuando aplique. |

> [!IMPORTANT]
> La migración a Prisma 7 queda fuera del cierre actual. Prisma 7 ya no acepta `url = env("DATABASE_URL")` dentro de `schema.prisma`; por eso los upgrades mayores de `prisma` y `@prisma/client` están bloqueados en Dependabot hasta realizar una migración planificada.

> [!NOTE]
> Si las variables de Render y la instancia Aiven continúan activas, la base de datos productiva debe seguir funcionando con esta versión. El CI valida configuración y lógica local, pero no expone ni prueba secretos reales de producción.

## Verificación pública de cierre

| Prueba | Resultado | Alcance |
|---|---|---|
| `GET /api/health` | Aprobado | Confirma disponibilidad pública de la API. |
| `POST /api/auth/login` con usuario controlado | Aprobado | Confirma autenticación, consulta de usuario en base de datos y emisión de JWT. |

La autenticación pública aprobada confirma que la API publicada puede comunicarse con la base de datos productiva vigente. Esta validación no publica tokens, secretos ni cadenas de conexión.

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

## Variables de entorno de producción

| Variable | Uso |
|---|---|
| NODE_ENV | Define ambiente de ejecución. |
| DATABASE_URL | Cadena de conexión segura hacia Aiven MySQL. |
| JWT_SECRET | Secreto para firmar tokens JWT. |
| JWT_EXPIRES_IN | Tiempo de expiración del token. |
| BCRYPT_SALT_ROUNDS | Rondas de cifrado bcrypt. |
| FRONTEND_ORIGIN | Dominio público permitido para CORS. |

Estas variables se administran en Render y no se versionan en el repositorio.

## Nota de seguridad

El archivo .env es local y no debe versionarse. Se incluye .env.example como plantilla segura.
