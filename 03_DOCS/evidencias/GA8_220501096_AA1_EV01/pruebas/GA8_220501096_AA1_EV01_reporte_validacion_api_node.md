# GA8-220501096-AA1-EV01 - Reporte de validación API Node

## Proyecto

MLBT - María La Bonita Taquería.

## Evidencia

GA8-220501096-AA1-EV01 - Desarrollar software a partir de la integración de sus módulos componentes.

## Módulo validado

02_BACK_END/01_API_NODE

## Ambiente local utilizado

| Elemento | Valor |
|---|---|
| Sistema de base de datos | MySQL / MariaDB mediante XAMPP |
| Puerto base de datos | 3306 |
| API local | http://localhost:3001 |
| Framework backend | Node.js + Express |
| ORM | Prisma |
| Autenticación | JWT Bearer Token |
| Validación de datos | Zod |
| Hash de contraseñas | bcrypt |

## Preparación ejecutada

Se ejecutaron comandos de instalación, generación de Prisma, migración, carga de datos iniciales, validación y ejecución local de la API.

`powershell
Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\02_BACK_END\01_API_NODE"
pnpm install
pnpm prisma:generate
pnpm prisma:migrate
pnpm seed
pnpm check
pnpm dev
`",
  ",


| Prueba | Método | URL | Estado esperado | Estado obtenido | Resultado |
|---|---|---|---|---|---|
| Ruta raíz API | GET | http://localhost:3001/ | 200 | 200 | Aprobado |
| Health check | GET | http://localhost:3001/api/health | 200 | 200 | Aprobado |

## Resultado de autenticación

| Prueba | Método | Endpoint | Entrada | Estado esperado | Estado obtenido | Resultado |
|---|---|---|---|---|---|---|
| Login correcto | POST | /api/auth/login | username=adminapp, password=[REDACTED - TEST DATA] | 200 | 200 | Aprobado |
| Perfil con token | GET | /api/auth/profile | Authorization Bearer TOKEN_JWT | 200 | 200 | Aprobado |
| Login incorrecto | POST | /api/auth/login | password incorrecta | 401 | 401 | Aprobado |
| Perfil sin token | GET | /api/auth/profile | Sin Authorization | 401 | 401 | Aprobado |

## Resultado de módulos protegidos

| Módulo | Método | Endpoint | Autenticación | Estado esperado | Estado obtenido | Resultado |
|---|---|---|---|---|---|---|
| Usuarios | GET | /api/users | Bearer Token | 200 | 200 | Aprobado |
| Inventario | GET | /api/inventory | Bearer Token | 200 | 200 | Aprobado |
| Ventas | GET | /api/sales | Bearer Token | 200 | 200 | Aprobado |

## Datos validados

La API respondió con usuarios iniciales, productos de inventario y ventas cargadas desde la base de datos local. El login correcto generó un token JWT y las rutas protegidas respondieron únicamente cuando se envió el encabezado Authorization.

## Nota de seguridad

El token JWT real generado durante la prueba no se documenta en este archivo por seguridad. Para la evidencia se registra únicamente que el token fue obtenido y usado correctamente.

## Resultado general

La API Node del proyecto MLBT queda validada localmente como módulo backend funcional, conectado a MySQL mediante Prisma, con autenticación JWT, protección de rutas y consulta de módulos principales.

## Estado para integración

Este resultado habilita el siguiente paso de la evidencia: conectar el login del Frontend React con el endpoint real POST /api/auth/login y consumir el perfil autenticado mediante GET /api/auth/profile.
