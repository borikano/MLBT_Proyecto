# API MLBT - Endpoints EV03

## Proyecto

MLBT Project - María La Bonita Taquería

## Evidencia

GA7-220501096-AA5-EV03 - Diseño y Desarrollo de servicios web - proyecto

## URL base local

http://localhost:3001

## Endpoints base

| Método | Endpoint | Descripción | Autenticación |
|---|---|---|---|
| GET | / | Ruta raiz de la API. | No |
| GET | /api/health | Estado del servicio. | No |

## Endpoints de autenticación

| Método | Endpoint | Descripción | Autenticación |
|---|---|---|---|
| POST | /api/auth/login | Inicio de sesion y generación de token JWT. | No |
| GET | /api/auth/profile | Consulta de perfil autenticado. | Si |

## Endpoints de usuarios

| Método | Endpoint | Descripción | Autenticación |
|---|---|---|---|
| GET | /api/users | Lista usuarios. | Si |
| GET | /api/users/:id | Consulta usuario por id. | Si |
| POST | /api/users | Crea usuario. | Si |
| PUT | /api/users/:id | Actualiza usuario. | Si |
| DELETE | /api/users/:id | Inactiva usuario. | Si |

## Endpoints de inventario

| Método | Endpoint | Descripción | Autenticación |
|---|---|---|---|
| GET | /api/inventory | Lista productos de inventario. | Si |
| GET | /api/inventory/:id | Consulta producto por id. | Si |
| POST | /api/inventory | Crea producto. | Si |
| PUT | /api/inventory/:id | Actualiza producto. | Si |
| DELETE | /api/inventory/:id | Inactiva producto. | Si |

## Endpoints de ventas

| Método | Endpoint | Descripción | Autenticación |
|---|---|---|---|
| GET | /api/sales | Lista ventas. | Si |
| GET | /api/sales/:id | Consulta venta por id. | Si |
| POST | /api/sales | Crea venta. | Si |
| PUT | /api/sales/:id | Actualiza venta. | Si |
| DELETE | /api/sales/:id | Elimina venta. | Si |

## Seguridad

Los endpoints protegidos usan encabezado Authorization con token Bearer.

Formato:

Authorization: Bearer TOKEN_JWT

## Estado

Documento base actualizado para implementar servicios reales de la API del proyecto MLBT.
