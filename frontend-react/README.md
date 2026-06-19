# Frontend React - MLBT

Frontend administrativo del proyecto formativo María La Bonita Taquería.

Este módulo implementa una aplicación web tipo SPA construida con ReactJS, Vite, Tailwind CSS y shadcn/ui. La aplicación permite validar el flujo administrativo de MLBT mediante datos mock antes de conectar con los servicios backend.

## Evidencia relacionada

- GA7-220501096-AA4-EV02: Verificación de procedimientos para la definición de componentes Front-End.
- GA7-220501096-AA4-EV03: Componente front-end del proyecto formativo y proyectos de clase.

## Stack técnico

- ReactJS
- Vite
- JavaScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- TanStack Table
- react-router-dom
- pnpm

## Instalación

Desde PowerShell:

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\frontend-react"
    pnpm install

## Ejecución local

    pnpm dev

URL local:

    http://localhost:5173

## Validación

    pnpm lint
    pnpm build

## Credenciales mock

    Usuario: admin
    Contraseña: admin

## Rutas funcionales

- /login
- /dashboard
- /usuarios
- /inventario
- /ventas

## Módulos implementados

### Dashboard

Panel administrativo con calendario de análisis, métricas de ventas, productos vendidos, insumos activos, usuarios activos, alertas de inventario, ventas por fecha seleccionada, movimientos recientes, usuarios recientes y accesos rápidos.

### Usuarios

Gestión local de usuarios administrativos con creación, edición, retiro lógico, reactivación, roles y tabla de datos.

Roles contemplados:

- Administrador del sistema
- Administrador de tienda
- Mesero
- Cocinero

### Inventario

Gestión local de insumos, stock, estados, alertas visuales, movimientos de entrada, salida y ajuste.

### Ventas

Registro local de ventas con validación de stock, selección de cliente, tipo de venta, segmento de pago, método de pago, pedido actual, historial confirmado y análisis de ventas.

## Navegación interna

El sidebar incluye navegación jerárquica hacia secciones internas:

- Usuarios
  - Resumen de usuarios
  - Crear / editar usuario
  - Data Table de usuarios
- Inventario
  - Resumen de inventario
  - Registrar ítem
  - Registrar movimiento
  - Tablas de inventario
- Ventas
  - Análisis de ventas
  - Historial confirmado
  - Pedido actual

## Archivos principales

- src/pages/Login.jsx
- src/pages/Dashboard.jsx
- src/pages/Usuarios.jsx
- src/pages/Inventario.jsx
- src/pages/Ventas.jsx
- src/components/layout/AdminLayout.jsx
- src/components/layout/AppSidebar.jsx
- src/components/shared/DataTable.jsx
- src/context/MlbtDataContext.jsx
- src/lib/auth.js
- src/data/mocks/usuarios.mock.js
- src/data/mocks/inventario.mock.js
- src/data/mocks/ventas.mock.js

## Estado de entrega

El frontend queda validado con lint y build, usando datos mock y estructura preparada para integración posterior con backend.
