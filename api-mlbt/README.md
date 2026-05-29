# API MLBT - GA7_220501096_AA5_EV03

## Proyecto

MLBT Project - Maria La Bonita Taqueria

## Evidencia

GA7-220501096-AA5-EV03 - Diseno y Desarrollo de servicios web - proyecto

## Proposito

Este modulo contiene la API del proyecto MLBT. Su objetivo es exponer servicios web para las funcionalidades principales del sistema, manteniendo separacion con el frontend base, el modulo Java Web y el modulo Spring Web.

## Alcance inicial

La API del proyecto se prepara para cubrir servicios asociados a:

- Salud del servicio.
- Autenticacion.
- Usuarios.
- Inventario.
- Ventas.
- Documentacion de endpoints.

## Stack tecnico previsto

- Node.js.
- Express.
- Prisma ORM.
- MySQL / MariaDB mediante XAMPP.
- bcrypt.
- JSON Web Token.
- Zod.
- pnpm.
- Postman.
- Git y GitHub.

## Estructura inicial

| Carpeta | Proposito |
|---|---|
| src/config | Configuracion de entorno, base de datos y variables. |
| src/controllers | Controladores HTTP. |
| src/middlewares | Middlewares de autenticacion, errores y validaciones. |
| src/routes | Definicion de rutas de la API. |
| src/schemas | Esquemas de validacion. |
| src/services | Logica de aplicacion. |
| src/utils | Utilidades compartidas. |
| prisma | Modelo de base de datos y migraciones. |
| docs | Documentacion de servicios. |
| postman | Colecciones Postman. |

## Estado

Estructura inicial creada. La implementacion de servicios se realizara de forma incremental.
