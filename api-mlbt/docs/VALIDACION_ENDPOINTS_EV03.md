# API MLBT - Validacion funcional de endpoints EV03

## Proyecto

MLBT Project - Maria La Bonita Taqueria

## Evidencia

GA7-220501096-AA5-EV03 - Diseno y Desarrollo de servicios web - proyecto

## Objetivo

Validar desde terminal el funcionamiento de los servicios web reales implementados para el proyecto MLBT.

## Entorno de prueba

| Elemento | Valor |
|---|---|
| API | api-mlbt |
| URL base | http://localhost:3001 |
| Base de datos | mlbt_api_ga7_aa5_ev03 |
| Motor | MySQL / MariaDB mediante XAMPP |
| ORM | Prisma ORM |
| Autenticacion | JWT Bearer Token |

## Endpoints probados

| Metodo | Endpoint | Resultado esperado | Resultado obtenido |
|---|---|---|---|
| GET | / | API disponible | OK |
| GET | /api/health | Servicio activo | OK |
| POST | /api/auth/login | Login correcto con token JWT | OK |
| GET | /api/auth/profile | Perfil autenticado con token | OK |
| GET | /api/users | Lista de usuarios autenticada | OK |
| GET | /api/inventory | Lista de inventario autenticada | OK |
| GET | /api/sales | Lista de ventas autenticada | OK |
| POST | /api/auth/login | Rechazo de credenciales incorrectas | OK - 401 |
| GET | /api/auth/profile | Rechazo de acceso sin token | OK - 401 |

## Validaciones de seguridad

- El login correcto genera token JWT.
- El perfil requiere encabezado Authorization con Bearer Token.
- El login incorrecto es rechazado con estado 401.
- El perfil sin token es rechazado con estado 401.
- Los endpoints de usuarios, inventario y ventas requieren autenticacion.
- Las contrasenas se almacenan con hash bcrypt.
- Las entradas se validan mediante Zod.

## Roles considerados

- ADMIN_APP
- ADMIN_TIENDA
- MESERO
- COCINA
- BODEGA
- CAJERO
- LECTURA

## Comando de ejecucion local

Desde la carpeta api-mlbt:

node .\src\server.js

## Comando de validacion rapida

node .\src\server.js --check

## Resultado

La API del proyecto MLBT queda validada funcionalmente desde terminal para los servicios de autenticacion, usuarios, inventario y ventas.

Esta validacion corresponde a la evidencia EV03. La evidencia EV04 complementara esta implementacion mediante pruebas documentadas en Postman.
