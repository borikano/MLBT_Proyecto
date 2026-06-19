# Interfaz React - MLBT

Módulo administrativo del proyecto formativo María La Bonita Taquería.

Esta aplicación permite validar el flujo administrativo de MLBT mediante datos de prueba antes de conectar con los servicios del servidor.

## Evidencia relacionada

- GA7-220501096-AA4-EV03: Componente front-end del proyecto formativo y proyectos de clase.

## Tecnologías utilizadas

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

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\frontend-react"
    pnpm install

## Ejecución local

    pnpm dev

Dirección local:

    http://localhost:5173

## Validación

    pnpm lint
    pnpm build

## Credenciales de prueba

    Usuario: admin
    Contraseña: admin

## Rutas funcionales

- /login
- /dashboard
- /usuarios
- /inventario
- /ventas

## Módulos implementados

### Panel principal

Incluye calendario de análisis, métricas de ventas, productos vendidos, insumos activos, usuarios activos, alertas de inventario, ventas por fecha seleccionada, movimientos recientes, usuarios recientes y accesos rápidos.

### Usuarios

Permite crear, editar, retirar, reactivar y consultar usuarios administrativos.

Roles contemplados:

- Administrador del sistema
- Administrador de tienda
- Mesero
- Cocinero

### Inventario

Permite registrar insumos, controlar existencias, gestionar estados y documentar movimientos de entrada, salida y ajuste.

### Ventas

Permite registrar ventas, validar existencias, seleccionar cliente, tipo de venta, segmento de pago, método de pago, pedido actual, historial confirmado y análisis de ventas.

## Navegación interna

- Usuarios
  - Resumen de usuarios
  - Crear / editar usuario
  - Tabla de usuarios
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
- src/data

## Estado de entrega

La interfaz React queda validada con revisión de código y compilación de producción.

