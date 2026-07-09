# GA8-220501096-AA1-EV02 - Reporte de pruebas de módulos integrados

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Registrar las pruebas realizadas sobre los módulos integrados del sistema MLBT.

## Ambiente utilizado

| Elemento | Valor |
|---|---|
| Base de datos | MySQL/MariaDB mediante XAMPP |
| API | http://localhost:3001 |
| Frontend | http://localhost:5173 |
| Rama | feature/GA8_220501096_AA1_EV01_EV02_INTEGRACION_DESPLIEGUE |

## Pruebas API

| Prueba | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|
| GET / | Respuesta general API | 200 OK | Aprobado |
| GET /api/health | Servicio running | 200 OK | Aprobado |
| POST /api/auth/login correcto | Token JWT | 200 OK | Aprobado |
| GET /api/auth/profile con token | Perfil autenticado | 200 OK | Aprobado |
| GET /api/users con token | Lista de usuarios | 200 OK | Aprobado |
| GET /api/inventory con token | Lista de inventario | 200 OK | Aprobado |
| GET /api/sales con token | Lista de ventas | 200 OK | Aprobado |
| POST /api/auth/login incorrecto | Rechazo de credenciales | 401 esperado | Aprobado |
| GET /api/auth/profile sin token | Rechazo de acceso | 401 esperado | Aprobado |

## Pruebas Frontend

| Prueba | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|
| pnpm lint | Sin errores de lint | Sin errores reportados | Aprobado |
| pnpm build | Build de producción | Build generado correctamente | Aprobado |
| pnpm dev | React disponible | http://localhost:5173 activo | Aprobado |
| Login visual | Formulario disponible | /login visible | Aprobado |

## Pruebas de integración

| Prueba | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|
| Login real React + API | Redirección a dashboard | /dashboard accesible | Aprobado |
| Token JWT | Sesión guardada | sessionStorage con sesión | Aprobado |
| Ruta protegida | Acceso solo autenticado | ProtectedRoute validado | Aprobado |
| Logout | Retorno a /login | Retorno visual confirmado | Aprobado |

## Resultado general

Los módulos integrados fueron probados localmente. El flujo de autenticación real entre React, API Node y MySQL/MariaDB quedó aprobado.
