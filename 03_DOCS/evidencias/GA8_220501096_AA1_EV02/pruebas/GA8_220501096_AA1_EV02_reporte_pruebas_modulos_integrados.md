# GA8-220501096-AA1-EV02 - Reporte de pruebas de módulos integrados

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Registrar las pruebas realizadas sobre los módulos integrados y publicados del sistema MLBT.

## Ambiente público utilizado

| Elemento | Valor |
|---|---|
| Frontend | https://mlbt-proyecto.vercel.app |
| API | https://mlbt-proyecto.onrender.com |
| Health API | https://mlbt-proyecto.onrender.com/api/health |
| Base de datos | Aiven MySQL 8.4 |
| Rama estable | Arawkano |

## Pruebas API pública

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

## Pruebas Frontend público

| Prueba | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|
| Acceso a frontend | Carga aplicación | https://mlbt-proyecto.vercel.app disponible | Aprobado |
| Acceso a /login | Carga formulario | Formulario visible | Aprobado |
| Login real | Redirección a dashboard | Dashboard accesible | Aprobado |
| Navegación interna | Acceso a módulos | Dashboard, usuarios, inventario y ventas accesibles | Aprobado |
| Logout | Retorno a login | Sesión cerrada correctamente | Aprobado |

## Flujo público validado

Vercel React -> Render API Node -> Aiven MySQL -> JWT -> Dashboard protegido.

## Resultado general

Los módulos integrados fueron probados en ambiente público. El flujo de autenticación real entre React, API Node y Aiven MySQL quedó aprobado.
