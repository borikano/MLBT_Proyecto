# API MLBT - Guía Postman EV04

## Proyecto

MLBT Project - María La Bonita Taquería

## Evidencia

GA7-220501096-AA5-EV04 - API del Proyecto

## URL base

http://localhost:3001

## Flujo recomendado de pruebas

1. Ejecutar la API localmente.
2. Probar la ruta raíz.
3. Probar health check.
4. Ejecutar login correcto.
5. Copiar el token JWT recibido.
6. Configurar el token como Bearer Token en Postman.
7. Probar perfil autenticado.
8. Probar usuarios, inventario y ventas.
9. Probar casos de error: login incorrecto y perfil sin token.
10. Guardar capturas y exportar la colección.

## Endpoints base

| Método | Endpoint | Autenticación |
|---|---|---|
| GET | / | No |
| GET | /api/health | No |
| POST | /api/auth/login | No |
| GET | /api/auth/profile | Sí |
| GET | /api/users | Sí |
| GET | /api/inventory | Sí |
| GET | /api/sales | Sí |

## Encabezado de autenticación

Authorization: Bearer TOKEN_JWT

## Colección Postman

La colección se guardará en:

02_BACK_END/01_API_NODE/postman/GA7_220501096_AA5_EV04_MLBT_API.postman_collection.json
