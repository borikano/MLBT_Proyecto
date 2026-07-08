# GA7_220501096_AA5_EV04 - Resultados de pruebas Postman

## Proyecto

MLBT Project - María La Bonita Taquería

## Evidencia

GA7-220501096-AA5-EV04 - API del Proyecto

## API evaluada

02_BACK_END/01_API_NODE

## URL base local

http://localhost:3001

## Herramienta de prueba

Postman.

## Colección utilizada

02_BACK_END/01_API_NODE/postman/GA7_220501096_AA5_EV04_MLBT_API.postman_collection.json

## Resumen de pruebas ejecutadas

| Nro. | Método | Endpoint | Escenario | Resultado esperado | Estado | Captura |
|---|---|---|---|---|---|---|
| 01 | GET | / | Ruta raíz de la API | 200 OK | Aprobado | 01-ruta-raiz.png |
| 02 | GET | /api/health | Estado del servicio | 200 OK | Aprobado | 02-health.png |
| 03 | POST | /api/auth/login | Inicio de sesión correcto | 200 OK con token JWT | Aprobado | 03-login-correcto.png |
| 04 | GET | /api/auth/profile | Perfil autenticado con token | 200 OK | Aprobado | 04-perfil-con-token.png |
| 05 | GET | /api/users | Consulta de usuarios autenticada | 200 OK | Aprobado | 05-listar-usuarios.png |
| 06 | GET | /api/inventory | Consulta de inventario autenticada | 200 OK | Aprobado | 06-listar-inventario.png |
| 07 | GET | /api/sales | Consulta de ventas autenticada | 200 OK | Aprobado | 07-listar-ventas.png |
| 08 | POST | /api/auth/login | Inicio de sesión incorrecto | 401 Unauthorized | Aprobado | 08-login-incorrecto.png |
| 09 | GET | /api/auth/profile | Perfil sin token | 401 Unauthorized | Aprobado | 09-perfil-sin-token.png |

## Evidencias gráficas

Las capturas se encuentran en:

03_DOCS/evidencias/GA7_220501096_AA5_EV04/capturas/postman

## Validaciones de seguridad

- El inicio de sesión correcto genera token JWT.
- Los endpoints protegidos requieren token Bearer.
- El perfil con token responde correctamente.
- El perfil sin token es rechazado.
- Las credenciales incorrectas son rechazadas.
- Los recursos de usuarios, inventario y ventas se consultan únicamente con autenticación.

## Resultado general

Las pruebas ejecutadas en Postman validan correctamente la API del proyecto MLBT para la evidencia EV04.

La API responde correctamente en sus endpoints principales y aplica protección mediante autenticación JWT.
