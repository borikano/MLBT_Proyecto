# GA8-220501096-AA1-EV01 - Integración de módulos componentes

## Evidencia

Desarrollar software a partir de la integración de sus módulos componentes.

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Evidenciar la integración funcional entre los módulos principales del sistema: Frontend React, API Node/Express y base de datos MySQL/MariaDB.

## Módulos integrados

| Módulo | Ruta | Tecnología | Estado |
|---|---|---|---|
| Frontend React | ../../../01_FRONT_END/01_REACT_AP07 | React, Vite, Tailwind CSS, shadcn/ui | Validado e integrado para login |
| API Node | ../../../02_BACK_END/01_API_NODE | Node.js, Express, Prisma, JWT, bcrypt, Zod | Validado e integrado |
| Base de datos | MySQL/MariaDB local | XAMPP + Prisma | Validada con seed y consultas |
| Spring Web | ../../../02_BACK_END/02_SPRING_WEB | Java, Spring Boot, Thymeleaf | Módulo complementario del proyecto |
| Java Web | ../../../02_BACK_END/03_JAVA_WEB | Java Web, JSP, Servlets | Módulo complementario del proyecto |

## Validaciones realizadas

| Documento | Descripción |
|---|---|
| [Validación API Node](pruebas/GA8_220501096_AA1_EV01_reporte_validacion_api_node.md) | Pruebas de API, JWT, rutas protegidas, usuarios, inventario y ventas. |
| [Validación Frontend React](pruebas/GA8_220501096_AA1_EV01_reporte_validacion_frontend_react.md) | Validación de lint, build y ejecución local del frontend. |
| [Integración Login React + API](pruebas/GA8_220501096_AA1_EV01_reporte_integracion_login_react_api.md) | Validación del flujo React Login hacia API Node con JWT. |

## Flujo integrado validado

1. MySQL se ejecuta desde XAMPP.
2. La API Node se ejecuta en http://localhost:3001.
3. React se ejecuta en http://localhost:5173.
4. El login de React envía credenciales reales a POST /api/auth/login.
5. La API valida credenciales con Prisma y bcrypt.
6. La API devuelve token JWT y datos del usuario.
7. React guarda la sesión en sessionStorage.
8. Las rutas protegidas permiten ingresar al dashboard.
9. El cierre de sesión limpia la sesión y retorna al login.

## Credenciales de prueba

| Campo | Valor |
|---|---|
| Usuario | adminapp |
| Contraseña | [REDACTED - TEST DATA] |
| Rol | ADMIN_APP |

## Resultado

La evidencia GA8-220501096-AA1-EV01 queda soportada con integración funcional local entre Frontend React, API Node/Express y base de datos MySQL/MariaDB.
