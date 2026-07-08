# GA7_220501096_AA5_EV04 - Plan de pruebas Postman

## Proyecto

MLBT Project - María La Bonita Taquería

## Evidencia

GA7-220501096-AA5-EV04 - API del Proyecto

## API evaluada

02_BACK_END/01_API_NODE

## URL base local

http://localhost:3001

## Requisitos previos

- Tener MySQL activo desde XAMPP.
- Tener instalada la API del proyecto.
- Ejecutar la API localmente.
- Tener Postman disponible.
- Tener datos iniciales cargados mediante seed.

## Comando para ejecutar la API

Desde la carpeta 02_BACK_END/01_API_NODE:

node .\src\server.js

## Usuario principal de prueba

| Campo | Valor |
|---|---|
| Usuario | adminapp |
| Contraseña | AdminApp123* |
| Rol | ADMIN_APP |

## Pruebas planeadas

| Nro. | Método | Endpoint | Objetivo | Resultado esperado |
|---|---|---|---|---|
| 01 | GET | / | Validar ruta raíz de la API. | 200 OK |
| 02 | GET | /api/health | Validar estado del servicio. | 200 OK |
| 03 | POST | /api/auth/login | Validar login correcto. | 200 OK con token JWT |
| 04 | GET | /api/auth/profile | Validar perfil con token. | 200 OK |
| 05 | GET | /api/users | Consultar usuarios autenticados. | 200 OK |
| 06 | GET | /api/inventory | Consultar inventario autenticado. | 200 OK |
| 07 | GET | /api/sales | Consultar ventas autenticadas. | 200 OK |
| 08 | POST | /api/auth/login | Validar rechazo de login incorrecto. | 401 Unauthorized |
| 09 | GET | /api/auth/profile | Validar rechazo sin token. | 401 Unauthorized |

## Capturas requeridas

- 01-ruta-raiz.png
- 02-health.png
- 03-login-correcto.png
- 04-perfil-con-token.png
- 05-listar-usuarios.png
- 06-listar-inventario.png
- 07-listar-ventas.png
- 08-login-incorrecto.png
- 09-perfil-sin-token.png

## Resultado esperado de la evidencia

La colección Postman debe demostrar que la API del proyecto MLBT responde correctamente en sus endpoints principales y protege los recursos mediante autenticación JWT.
