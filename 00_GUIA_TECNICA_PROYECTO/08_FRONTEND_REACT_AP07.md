# Frontend React AP07 - MLBT

## Evidencia

GA7-220501096-AA4-EV03 - Componente front-end del proyecto formativo y proyectos de clase.

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Documentar la implementación del componente frontend React desarrollado para el proyecto formativo MLBT, dejando trazabilidad técnica para revisión, ejecución local y entrega de evidencia.

## Alcance implementado

- Login mock.
- Dashboard administrativo.
- Calendario de análisis en dashboard.
- Gestión de usuarios.
- Gestión de inventario.
- Gestión de ventas.
- Validación de stock.
- Registro de movimientos.
- Pedido actual.
- Historial de ventas.
- Navegación lateral fija.
- Enlaces internos por sección.
- Roles administrativos.
- Datos mock compartidos.

## Ruta del módulo

    frontend-react/

## Rutas funcionales

- /login
- /dashboard
- /usuarios
- /inventario
- /ventas

## Credenciales de prueba

    Usuario: admin
    Contraseña: admin

## Stack aplicado

- ReactJS.
- Vite.
- JavaScript.
- Tailwind CSS.
- shadcn/ui.
- Radix UI.
- TanStack Table.
- react-router-dom.
- pnpm.

## Estructura relevante

    frontend-react/src/pages/Login.jsx
    frontend-react/src/pages/Dashboard.jsx
    frontend-react/src/pages/Usuarios.jsx
    frontend-react/src/pages/Inventario.jsx
    frontend-react/src/pages/Ventas.jsx
    frontend-react/src/components/layout/AdminLayout.jsx
    frontend-react/src/components/layout/AppSidebar.jsx
    frontend-react/src/components/shared/DataTable.jsx
    frontend-react/src/context/MlbtDataContext.jsx
    frontend-react/src/lib/auth.js
    frontend-react/src/data/mocks/

## Ejecución local

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\frontend-react"
    pnpm install
    pnpm dev

URL local:

    http://localhost:5173

## Validación técnica

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\frontend-react"
    pnpm lint
    pnpm build

## Relación con EV02

La evidencia GA7-220501096-AA4-EV02 corresponde al documento de verificación de procedimientos y definición de componentes Front-End. El código React versionado en este repositorio corresponde a la implementación práctica para la evidencia GA7-220501096-AA4-EV03.

## Resultado

El componente frontend queda funcional con datos mock, navegación SPA, componentes reutilizables, formularios controlados, tablas de datos, validaciones visuales y estructura lista para integración posterior con backend.
