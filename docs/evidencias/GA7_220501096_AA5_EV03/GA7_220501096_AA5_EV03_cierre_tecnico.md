# GA7_220501096_AA5_EV03 - Cierre técnico

## Proyecto

MLBT Project - María La Bonita Taquería

## Evidencia

GA7-220501096-AA5-EV03 - Diseño y Desarrollo de servicios web - proyecto

## Objetivo de la evidencia

Disenar y desarrollar servicios web para el proyecto formativo MLBT, teniendo en cuenta las funcionalidades principales del sistema y aplicando versionamiento con Git y GitHub.

## Módulo desarrollado

back-end/api-node

## Tecnologia aplicada

- Node.js.
- Express.
- Prisma ORM.
- MySQL / MariaDB mediante XAMPP.
- bcrypt.
- JSON Web Token.
- Zod.
- pnpm.
- Git y GitHub.

## Funcionalidades implementadas

- Servicio base de disponibilidad de API.
- Endpoint de health check.
- Autenticación con usuario y contraseña.
- Generación de token JWT.
- Perfil protegido mediante Bearer Token.
- Gestión de usuarios.
- Gestión de productos de inventario.
- Gestión de ventas.
- Validación de entradas con Zod.
- Protección de rutas por autenticación.
- Control inicial de permisos por rol.
- Persistencia mediante Prisma y MySQL/MariaDB.

## Endpoints principales

| Método | Endpoint | Propósito |
|---|---|---|
| GET | / | Ruta raiz de la API. |
| GET | /api/health | Estado del servicio. |
| POST | /api/auth/login | Inicio de sesion. |
| GET | /api/auth/profile | Perfil autenticado. |
| GET | /api/users | Listar usuarios. |
| POST | /api/users | Crear usuario. |
| PUT | /api/users/:id | Actualizar usuario. |
| DELETE | /api/users/:id | Inactivar usuario. |
| GET | /api/inventory | Listar inventario. |
| POST | /api/inventory | Crear producto de inventario. |
| PUT | /api/inventory/:id | Actualizar producto de inventario. |
| DELETE | /api/inventory/:id | Inactivar producto de inventario. |
| GET | /api/sales | Listar ventas. |
| POST | /api/sales | Crear venta. |
| PUT | /api/sales/:id | Actualizar venta. |
| DELETE | /api/sales/:id | Eliminar venta. |

## Base de datos

| Elemento | Valor |
|---|---|
| Motor | MySQL / MariaDB |
| Entorno | XAMPP |
| Base de datos | mlbt_api_ga7_aa5_ev03 |
| ORM | Prisma ORM |

## Modelos implementados

- Usuario.
- ProductoInventario.
- Venta.

## Roles considerados

- ADMIN_APP.
- ADMIN_TIENDA.
- MESERO.
- COCINA.
- BODEGA.
- CAJERO.
- LECTURA.

## Validación realizada

Se validaron desde terminal los siguientes escenarios:

- API disponible.
- Health check activo.
- Login correcto con token JWT.
- Perfil consultado con token.
- Listado de usuarios autenticado.
- Listado de inventario autenticado.
- Listado de ventas autenticado.
- Login incorrecto rechazado con estado 401.
- Perfil sin token rechazado con estado 401.

## Seguridad aplicada

- Hash de contraseñas con bcrypt.
- Token JWT para autenticación.
- Rutas protegidas con middleware.
- Control de roles por middleware.
- Variables locales protegidas mediante .env ignorado por Git.
- Archivo .env.example incluido como plantilla segura.

## Comando de ejecución local

Desde la carpeta back-end/api-node:

node .\src\server.js

## Comando de validación rápida

node .\src\server.js --check

## Resultado

La evidencia EV03 queda desarrollada con una API funcional para el proyecto MLBT, documentada, validada y versionada en GitHub.

La evidencia EV04 debe continuar con pruebas formales en Postman, coleccion de endpoints, pantallazos y documentación de resultados.
