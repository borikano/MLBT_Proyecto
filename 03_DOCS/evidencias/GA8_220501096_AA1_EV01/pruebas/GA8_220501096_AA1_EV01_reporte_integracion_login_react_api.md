# GA8-220501096-AA1-EV01 - Reporte de integración Login React + API

## Proyecto

MLBT - María La Bonita Taquería.

## Evidencia

GA8-220501096-AA1-EV01 - Desarrollar software a partir de la integración de sus módulos componentes.

## Objetivo de la validación

Comprobar la integración funcional entre el Frontend React y la API Node mediante el inicio de sesión real contra el endpoint POST /api/auth/login.

## Módulos integrados

| Módulo | Ruta | Tecnología | Estado |
|---|---|---|---|
| Frontend React | 01_FRONT_END/01_REACT_AP07 | React, Vite, Tailwind CSS, shadcn/ui | Integrado para login |
| API Node | 02_BACK_END/01_API_NODE | Node.js, Express, Prisma, JWT, bcrypt, Zod | Integrado |
| Base de datos | MySQL/MariaDB local | XAMPP + Prisma | Integrada con API |

## URLs locales utilizadas

| Servicio | URL |
|---|---|
| API Node | http://localhost:3001 |
| Health API | http://localhost:3001/api/health |
| Frontend React | http://localhost:5173 |
| Login React | http://localhost:5173/login |

## Credenciales de prueba

| Campo | Valor |
|---|---|
| Usuario | adminapp |
| Contraseña | AdminApp123* |
| Rol | ADMIN_APP |

## Flujo validado

1. Se inicia MySQL desde XAMPP.
2. Se ejecuta la API Node en http://localhost:3001.
3. Se ejecuta React con Vite en http://localhost:5173.
4. El usuario ingresa credenciales en /login.
5. React envía la solicitud al endpoint POST /api/auth/login.
6. La API valida usuario y contraseña con Prisma y bcrypt.
7. La API devuelve token JWT y datos del usuario.
8. React guarda la sesión en sessionStorage.
9. La ruta protegida permite el acceso al dashboard.

## Resultado de prueba

| Prueba | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|
| Login con credenciales reales | Acceso permitido | Redirección a /dashboard | Aprobado |
| Token JWT | Token recibido desde API | Sesión guardada en frontend | Aprobado |
| Ruta protegida | Acceso solo autenticado | Dashboard accesible después del login | Aprobado |
| Logout | Limpieza de sesión | Retorno a /login | Aprobado |

## Alcance actual

La integración real se implementa en el módulo de autenticación. Los módulos de usuarios, inventario y ventas se mantienen con datos locales de apoyo para la visualización del panel administrativo.

## Resultado general

La evidencia demuestra integración funcional entre Frontend React, API Node y base de datos MySQL mediante autenticación real con JWT.
