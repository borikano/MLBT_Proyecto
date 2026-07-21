# Interfaz React - MLBT

Módulo administrativo del proyecto formativo María La Bonita Taquería.

Esta aplicación corresponde al frontend administrativo del proyecto MLBT. El login está integrado con la API Node pública mediante JWT y el resto de módulos conserva datos locales de apoyo para navegación, análisis y presentación funcional.

## Evidencia relacionada

- GA7-220501096-AA4-EV03: Componente front-end del proyecto formativo y proyectos de clase.

## Despliegue público

| Servicio | URL |
|---|---|
| Frontend React | https://mlbt-proyecto.vercel.app |
| Login React | https://mlbt-proyecto.vercel.app/login |
| API consumida | https://mlbt-proyecto.onrender.com |

La variable VITE_API_URL permite definir la URL de la API en despliegue.

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

    Set-Location ".\01_FRONT_END\01_REACT_AP07"
    pnpm install

## Ejecución local

    pnpm dev

Dirección local:

    http://localhost:5173

## Validación

    pnpm lint
    pnpm build

## Credenciales de prueba

    Usuario: adminapp
    Contraseña: AdminApp123*

## Rutas funcionales

- /login
- /dashboard
- /login
- /dashboard
- /usuarios -> /usuarios/resumen
  - /usuarios/resumen
  - /usuarios/crear
  - /usuarios/listado
- /inventario -> /inventario/resumen
  - /inventario/resumen
  - /inventario/registrar
  - /inventario/movimientos
  - /inventario/tablas
- /ventas -> /ventas/pedido
  - /ventas/pedido
  - /ventas/historial
  - /ventas/analisis

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
- src/features/usuarios/ y src/pages/usuarios/
- src/features/inventario/ y src/pages/inventario/
- src/features/ventas/ y src/pages/ventas/
- src/routes/AppRouter.jsx
- src/components/layout/AppSidebar.jsx
- src/components/layout/AdminLayout.jsx
- src/components/layout/AppSidebar.jsx
- src/components/shared/DataTable.jsx
- src/context/MlbtDataContext.jsx
- src/lib/auth.js
- src/data

## Estado de entrega

La interfaz React queda validada con revisión de código, compilación de producción y despliegue público en Vercel.

<!-- GA9_PRUEBAS_FRONTEND_INICIO -->
## Pruebas automatizadas y evidencias GA9

Para el ciclo GA9 se incorporaron y documentaron pruebas de software sobre el proyecto MLBT. El repositorio conserva el soporte publico y reproducible; los entregables PDF, video y Excel permanecen fuera del versionamiento.

### Archivo de pruebas

    src/__tests__/mlbt-basicas.test.js

### Comandos

    pnpm test
    pnpm test:run

### Alcance validado

| Caso | Validacion | Resultado |
|---|---|---|
| CP-008 | Calculo total de pedido mediante Vitest | Aprobado |
| CP-009 | Endpoint publico /api/health mediante Invoke-WebRequest | Aprobado |

### Evidencias GA9 asociadas

| Evidencia | Estado |
|---|---|
| GA9-220501096-AA1-EV01 | Taller y pruebas basicas completadas. |
| GA9-220501096-AA1-EV02 | Plan de pruebas completado. |
| GA9-220501096-AA2-EV01 | Casos y ambiente de pruebas completados. |
| GA9-220501096-AA3-EV01 | Ejecucion documentada con PDF y video. |
| GA9-220501096-AA3-EV02 | Reporte final de pruebas ejecutadas. |

Documentacion consolidada: [GA9 pruebas MLBT](../../03_DOCS/evidencias/GA9_220501096_AA1_AA3_PRUEBAS_MLBT/README.md).
<!-- GA9_PRUEBAS_FRONTEND_FIN -->
