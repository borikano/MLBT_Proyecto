# Interfaz React - MLBT

Módulo administrativo de María La Bonita Taquería.

Esta aplicación corresponde al frontend administrativo del proyecto MLBT. Autenticación, usuarios, inventario y ventas consumen la API Node mediante el transporte HTTP versionado, JWT, RBAC y control de sesión; los contextos legacy de datos locales ya no forman parte del runtime funcional.

Documentación relacionada:

- [README principal](../../README.md)
- [Guía técnica AP07](../../00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md)

## Despliegue público

| Servicio | URL |
|---|---|
| Frontend React | https://mlbt-proyecto.vercel.app |
| Login React | https://mlbt-proyecto.vercel.app/login |
| API consumida | https://mlbt-proyecto.onrender.com |

La variable `VITE_API_URL` permite definir la URL de la API en despliegue.

## Tecnologías (versiones en package.json)

| Tecnología | Versión declarada |
|---|---|
| React / react-dom | ^19.2.8 |
| Vite | ^8.1.5 |
| Vitest | 4.1.10 |
| react-router-dom | 7.18.1 |
| @tanstack/react-table | 8.21.3 |
| Tailwind CSS | 4.3.3 |
| Radix UI | 1.6.7 |
| Node.js | 24.x |
| pnpm | 11.0.8 |

## Instalación y ejecución

```powershell
Set-Location ".\01_FRONT_END\01_REACT_AP07"
pnpm install
pnpm dev
```

Dirección local: http://localhost:5173

## Validación

```powershell
pnpm test:run
pnpm lint
pnpm build
```

## Autenticación

Las credenciales de validación se gestionan fuera del repositorio. Para entornos locales, consulte la configuración de la API Node y las variables de entorno correspondientes.

## Rutas funcionales

- `/login`
- `/dashboard`
- `/usuarios` → `/usuarios/resumen`, `/usuarios/crear`, `/usuarios/listado`
- `/inventario` → `/inventario/resumen`, `/inventario/registrar`, `/inventario/movimientos`, `/inventario/tablas`
- `/ventas` → `/ventas/pedido`, `/ventas/historial`, `/ventas/analisis`

## Carga diferida (H-001 cerrado)

Las rutas administrativas se cargan con `React.lazy` y `Suspense` desde `src/routes/AppRouter.jsx`. El chunk de entrada del build queda por debajo del umbral de 500 kB de Vite.

| Métrica verificada | Valor |
|---|---|
| Chunk entry minificado | 246.35 kB |
| Gzip entry | 79.02 kB |
| Warning Vite >500 kB | No presente |

## Módulos implementados

### Panel principal

Calendario de análisis, métricas de ventas, productos vendidos, insumos activos, usuarios activos, alertas de inventario, ventas por fecha, movimientos recientes y accesos rápidos.

### Usuarios

Creación, edición, baja, reactivación y consulta de usuarios administrativos.

### Inventario

Registro de insumos, control de existencias, estados y movimientos de entrada, salida y ajuste.

### Ventas

Registro de ventas, validación de existencias, pedido actual, historial confirmado y análisis.

## Archivos principales

- `src/routes/AppRouter.jsx` — enrutamiento y lazy loading
- `src/pages/Login.jsx` — inicio de sesión
- `src/pages/Dashboard.jsx` — panel principal
- `src/features/*` y `src/pages/*` — módulos de dominio
- `src/components/layout/` — layout administrativo
- `src/components/shared/DataTable.jsx` — tabla compartida
- `src/lib/api.js` — cliente HTTP base y manejo consistente de errores de API
- `src/lib/auth.js` — autenticación JWT y gobierno de sesión

## Estado del módulo

| Criterio | Estado |
|---|---|
| Pruebas automatizadas | 74/74 con Vitest y Testing Library |
| Lint | ESLint aprobado |
| Build de producción | Vite aprobado; H-001 cerrado |
| Integración pública | Autenticación, usuarios, inventario y ventas conectados a API Node con JWT/RBAC |

## Pruebas automatizadas

Baseline PROD-001: **74/74 pruebas en 17 archivos**, ESLint PASS y build de producción PASS.

| Archivo | Alcance |
|---|---|
| `src/__tests__/mlbt-basicas.test.js` | Reglas básicas y health check público |
| `src/__tests__/Login.test.jsx` | Formulario de login y accesibilidad |
| `src/__tests__/ProtectedRoute.test.jsx` | Rutas protegidas |
| `src/__tests__/DataTable.test.jsx` | Tabla compartida |

Historial detallado: [GA9 pruebas](../../03_DOCS/evidencias/GA9_220501096_AA1_AA3_PRUEBAS_MLBT/README.md).
