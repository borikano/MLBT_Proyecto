# Código fuente relevante

## API MLBT

| Ruta | Propósito |
|---|---|
| `api-mlbt/src/app.js` | Configuración principal de la aplicación Express. |
| `api-mlbt/src/server.js` | Punto de arranque local de la API. |
| `api-mlbt/src/config/prisma.js` | Cliente Prisma y conexión a base de datos. |
| `api-mlbt/src/controllers` | Controladores de autenticación, usuarios, inventario y ventas. |
| `api-mlbt/src/routes` | Rutas HTTP de la API. |
| `api-mlbt/src/services` | Servicios de negocio. |
| `api-mlbt/src/middlewares` | Middlewares de autenticación, validación y errores. |
| `api-mlbt/src/schemas` | Esquemas de validación. |
| `api-mlbt/prisma/schema.prisma` | Modelo de datos Prisma. |
| `api-mlbt/prisma/seed.js` | Datos iniciales de prueba. |

## Módulos web

| Ruta | Propósito |
|---|---|
| `spring-web` | Módulo web Spring. |
| `java-web` | Módulo web Java. |
| `pages`, `css`, `js`, `assets` | Recursos frontend base. |

## Frontend React

| Ruta | Propósito |
|---|---|
| `frontend-react/src/pages/Login.jsx` | Inicio de sesión mock. |
| `frontend-react/src/pages/Dashboard.jsx` | Panel principal con calendario de análisis. |
| `frontend-react/src/pages/Usuarios.jsx` | Gestión local de usuarios. |
| `frontend-react/src/pages/Inventario.jsx` | Gestión local de inventario. |
| `frontend-react/src/pages/Ventas.jsx` | Registro y análisis de ventas. |
| `frontend-react/src/components/layout` | Layout administrativo y sidebar. |
| `frontend-react/src/components/shared/DataTable.jsx` | Tabla reutilizable. |
| `frontend-react/src/context/MlbtDataContext.jsx` | Estado compartido mock. |
| `frontend-react/src/data/mocks` | Datos mock de usuarios, inventario y ventas. |
