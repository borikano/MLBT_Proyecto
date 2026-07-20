# 00 - Estado inicial del refactor de páginas React

Proyecto: MLBT - María La Bonita Taquería

Objetivo: auditar el estado actual del Frontend React antes de separar Usuarios, Inventario y Ventas en páginas internas independientes.

Fecha de auditoría: 2026-07-19 17:36:50


## Contexto Git

Ruta local: E:\Dev\01_Repositorios\MLBT_Proyecto
Rama actual: feature/refactor-rutas-paginas-react

Remotos:
- origin	https://github.com/borikano/MLBT_Proyecto.git (fetch)
- origin	https://github.com/borikano/MLBT_Proyecto.git (push)

Últimos commits:
- a12135b docs: sincronizar indices README del proyecto MLBT
- 9263dd2 docs: cerrar documentacion general MLBT GA8
- 311794f docs: actualizar EV02 con despliegue publico GA8
- 90f2c82 fix: ajustar presentacion del login publico MLBT
- 6e79c73 fix: actualizar titulo del frontend MLBT
- 51c0370 fix: configurar rutas SPA en Vercel para React Router
- 225f29c Merge pull request #10 from borikano/feature/GA8_AA1_EV02_DESPLIEGUE_PUBLICO
- 3693957 chore: preparar API Node para despliegue publico GA8

Estado Git:
- Working tree clean antes de generar este informe.

## Estructura principal del Frontend React

- OK: 01_FRONT_END\01_REACT_AP07\package.json
- OK: 01_FRONT_END\01_REACT_AP07\src\App.jsx
- OK: 01_FRONT_END\01_REACT_AP07\src\main.jsx
- OK: 01_FRONT_END\01_REACT_AP07\src\routes\ProtectedRoute.jsx
- OK: 01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx
- OK: 01_FRONT_END\01_REACT_AP07\src\components\layout\AdminLayout.jsx
- OK: 01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx
- OK: 01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx
- OK: 01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx
- OK: 01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx
- OK: 01_FRONT_END\01_REACT_AP07\src\context\MlbtDataContext.jsx
- OK: 01_FRONT_END\01_REACT_AP07\src\lib\api.js
- OK: 01_FRONT_END\01_REACT_AP07\src\lib\auth.js

## Conteo de líneas en archivos principales

| Archivo | Líneas | Observación |
|---|---:|---|
| 01_FRONT_END\01_REACT_AP07\src\App.jsx | 14 | Tamaño aceptable. |
| 01_FRONT_END\01_REACT_AP07\src\main.jsx | 11 | Tamaño aceptable. |
| 01_FRONT_END\01_REACT_AP07\src\routes\ProtectedRoute.jsx | 13 | Tamaño aceptable. |
| 01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx | 207 | Tamaño aceptable. |
| 01_FRONT_END\01_REACT_AP07\src\components\layout\AdminLayout.jsx | 35 | Tamaño aceptable. |
| 01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx | 517 | Conviene dividir. |
| 01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx | 687 | Conviene dividir. |
| 01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx | 1119 | Requiere división prioritaria. |
| 01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx | 1355 | Requiere división prioritaria. |
| 01_FRONT_END\01_REACT_AP07\src\context\MlbtDataContext.jsx | 45 | Tamaño aceptable. |

## Rutas, navegación y hashes detectados


Patrón: /dashboard
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 10: to: "/dashboard",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 32: const redirectTo = location.state?.from?.pathname || "/dashboard"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 4: import Dashboard from "@/pages/Dashboard"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 19: <Route path="/dashboard" element={<Dashboard />} />

Patrón: /usuarios
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 14: to: "/usuarios",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 18: to: "/usuarios#resumen-usuarios",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 22: to: "/usuarios#formulario-usuarios",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 26: to: "/usuarios#tabla-usuarios",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 17: import * as usuariosData from "@/data/mocks/usuarios.mock"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 82: ruta: "/usuarios",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 454: <Link to="/usuarios">Ver usuarios</Link>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 8: } from "@/data/mocks/usuarios.mock"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 7: import Usuarios from "@/pages/Usuarios"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 20: <Route path="/usuarios" element={<Usuarios />} />

Patrón: /inventario
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 32: to: "/inventario",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 36: to: "/inventario#resumen-inventario",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 40: to: "/inventario#formulario-inventario",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 44: to: "/inventario#movimiento-inventario",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 48: to: "/inventario#tablas-inventario",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\context\MlbtDataContext.jsx línea 6: } from "@/data/mocks/inventario.mock"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 90: ruta: "/inventario",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 294: <Link to="/inventario">Revisar inventario</Link>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 404: <Link to="/inventario">Ver inventario</Link>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 11: } from "@/data/mocks/inventario.mock"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 5: import Inventario from "@/pages/Inventario"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 21: <Route path="/inventario" element={<Inventario />} />

Patrón: /ventas
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 54: to: "/ventas",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 58: to: "/ventas#analisis-ventas",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 62: to: "/ventas#historial-ventas",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 66: to: "/ventas#pedido-actual",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\context\MlbtDataContext.jsx línea 7: import { ventasMock } from "@/data/mocks/ventas.mock"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 98: ruta: "/ventas",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 355: <Link to="/ventas">Ver ventas</Link>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 9: } from "@/data/mocks/ventas.mock"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 8: import Ventas from "@/pages/Ventas"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 22: <Route path="/ventas" element={<Ventas />} />

Patrón: #
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AdminLayout.jsx línea 7: <div className="flex h-screen overflow-hidden bg-[#fff7ed]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AdminLayout.jsx línea 11: <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-[#ead8c8] bg-white/95 px-6 backdrop-blur">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AdminLayout.jsx línea 12: <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ead8c8] text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AdminLayout.jsx línea 17: <p className="truncate text-sm font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AdminLayout.jsx línea 28: className="min-w-0 flex-1 overflow-y-auto bg-[#fff7ed] p-4 md:p-6"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 18: to: "/usuarios#resumen-usuarios",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 22: to: "/usuarios#formulario-usuarios",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 26: to: "/usuarios#tabla-usuarios",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 36: to: "/inventario#resumen-inventario",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 40: to: "/inventario#formulario-inventario",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 44: to: "/inventario#movimiento-inventario",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 48: to: "/inventario#tablas-inventario",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 58: to: "/ventas#analisis-ventas",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 62: to: "/ventas#historial-ventas",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 66: to: "/ventas#pedido-actual",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 80: ? "border-[#c44f2a] bg-[#fff7ed] text-[#7c2d12] shadow-sm"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 81: : "border-[#ead8c8] bg-white text-slate-900 hover:border-[#d6a37f] hover:bg-[#fff7ed] hover:text-[#7c2d12]",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 86: const [targetPath, targetHash = ""] = itemTo.split("#")
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 88: pathname === targetPath && (!targetHash || hash === `#${targetHash}`)
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 93: ? "border-[#d6a37f] bg-white font-semibold text-[#7c2d12] shadow-sm"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 94: : "border-[#f1d4bd] bg-[#fffaf5] text-muted-foreground hover:border-[#d6a37f] hover:bg-white hover:text-[#7c2d12]",
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 108: const [targetPath, targetHash] = target.split("#")
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 115: navigate(`${targetPath}#${targetHash}`)
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 137: <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-[#ead8c8] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 138: <div className="shrink-0 border-b border-[#ead8c8] px-5 py-5">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 143: className="h-12 w-12 rounded-full border border-[#d6a37f] object-cover shadow-sm"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 147: <p className="truncate text-sm font-bold text-[#7c2d12]">MLBT</p>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 171: <div className="ml-3 space-y-2 rounded-xl border border-[#f1d4bd] bg-[#fffaf5] p-2">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 196: <div className="shrink-0 border-t border-[#ead8c8] p-4">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 200: className="w-full bg-[#7c2d12] hover:bg-[#9a3412]"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\shared\DataTable.jsx línea 28: <TableRow key={headerGroup.id} className="bg-[#fff7ed]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 177: <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 181: <h1 className="mt-2 text-3xl font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 193: <Card className="border-[#f1d4bd] bg-white md:col-span-2 xl:col-span-4">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 195: <CardTitle className="text-lg text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 219: className="h-10 w-full rounded-md border border-[#ead8c8] bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#c44f2a] focus:ring-2 focus:ring-[#f1d4bd]"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 226: <strong className="text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 235: className="border-[#d6a37f] text-[#7c2d12] hover:bg-[#fff7ed]"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 245: <Card key={metrica.titulo} className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 248: <CardTitle className="text-3xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 342: <Card className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 346: <CardTitle className="text-xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 365: className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 369: <p className="truncate text-sm font-semibold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 377: <p className="text-sm font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 391: <Card className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 395: <CardTitle className="text-xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 414: className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 418: <p className="truncate text-sm font-semibold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 427: <p className="text-sm font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 441: <Card className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 445: <CardTitle className="text-xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 464: className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 466: <p className="truncate text-sm font-semibold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 488: className="overflow-hidden border-[#f1d4bd] bg-white transition hover:-translate-y-1 hover:shadow-md"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 490: <div className="flex h-44 items-center justify-center bg-gradient-to-br from-[#fff7ed] via-[#fff3e3] to-[#f8dcc2] p-6">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 491: <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#f1d4bd] bg-white p-3 shadow-sm">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 501: <CardTitle className="text-xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 508: <Button asChild className="w-full bg-[#7c2d12] hover:bg-[#9a3412]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 618: <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 622: <h1 id="resumen-inventario" className="scroll-mt-6 mt-1 text-2xl font-bold text-[#7c2d12]">Inventario</h1>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 626: <Card className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 629: <CardTitle className="text-2xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 635: <Card className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 638: <CardTitle className="text-2xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 734: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 736: <CardTitle className="text-lg text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 867: className="bg-[#7c2d12] hover:bg-[#9a3412]"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 876: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 878: <CardTitle id="movimiento-inventario" className="scroll-mt-6 text-lg text-[#7c2d12]">Registrar movimiento</CardTitle>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 966: className="bg-[#7c2d12] hover:bg-[#9a3412]"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 975: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 979: <CardTitle id="tablas-inventario" className="scroll-mt-6 text-lg text-[#7c2d12]">Data Table de inventario</CardTitle>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 993: ? "bg-[#7c2d12] hover:bg-[#9a3412]"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 1058: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Inventario.jsx línea 1060: <CardTitle className="text-lg text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 71: <main className="min-h-screen overflow-hidden bg-[#fff7ed]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 73: <aside className="hidden items-center justify-center bg-[#1c120d] px-10 py-8 lg:flex">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 84: <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f1a43c]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 101: <Card className="w-full max-w-md border-[#f1d4bd] shadow-xl">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 106: className="mx-auto h-28 w-28 rounded-full border border-[#f1d4bd] object-contain shadow-sm"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 110: <CardTitle className="text-2xl font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 158: className="w-full bg-[#7c2d12] hover:bg-[#9a3412]"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 421: <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 425: <h1 id="resumen-usuarios" className="scroll-mt-6 mt-1 text-2xl font-bold text-[#7c2d12]">Usuarios</h1>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 429: <Card className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 432: <CardTitle className="text-2xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 438: <Card className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 441: <CardTitle className="text-2xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 447: <Card className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 450: <CardTitle className="text-2xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 457: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 459: <CardTitle className="text-lg text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 625: className="bg-[#7c2d12] hover:bg-[#9a3412]"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 634: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Usuarios.jsx línea 637: <CardTitle className="text-lg text-[#7c2d12]">Data Table de usuarios</CardTitle>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 822: <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 826: <h1 className="mt-1 text-2xl font-bold text-[#7c2d12]">Ventas</h1>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 830: <div className="rounded-xl border border-[#f1d4bd] bg-[#fff7ed] p-4">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 831: <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 834: <h2 className="mt-1 text-xl font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 845: <Card className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 848: <CardTitle className="text-2xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 854: <Card className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 857: <CardTitle className="text-2xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 863: <Card className="border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 866: <CardTitle className="text-2xl text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 873: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 875: <CardTitle className="text-lg text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 941: <div className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 945: <p className="text-xl font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 950: <div className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 954: <p className="text-xl font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 959: <div className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 961: <p className="text-xl font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 976: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 978: <CardTitle className="text-lg text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 991: className="flex items-center justify-between gap-3 rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 994: <p className="truncate text-sm font-semibold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1004: <p className="text-lg font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1018: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1020: <CardTitle className="text-lg text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1033: className="flex items-center justify-between gap-3 rounded-lg border border-[#f1d4bd] bg-[#fff7ed] p-3"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1036: <p className="truncate text-sm font-semibold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1048: <p className="text-lg font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1065: <div className="rounded-xl border border-[#f1d4bd] bg-white p-4">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1066: <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c44f2a]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1069: <h2 className="mt-1 text-xl font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1079: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1081: <CardTitle className="text-lg text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1116: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1118: <CardTitle className="text-lg text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1203: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1205: <CardTitle className="text-lg text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1254: className="bg-[#7c2d12] hover:bg-[#9a3412]"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1290: <Card className="min-w-0 border-[#f1d4bd] bg-white">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1294: <CardTitle className="text-lg text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1303: <div className="rounded-lg border border-[#f1d4bd] bg-[#fff7ed] px-4 py-3 text-right">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1305: <p className="text-2xl font-bold text-[#7c2d12]">
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Ventas.jsx línea 1333: className="bg-[#7c2d12] hover:bg-[#9a3412]"

Patrón: hash
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 85: function getChildLinkClass(pathname, hash, itemTo) {
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 86: const [targetPath, targetHash = ""] = itemTo.split("#")
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 88: pathname === targetPath && (!targetHash || hash === `#${targetHash}`)
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 108: const [targetPath, targetHash] = target.split("#")
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 110: if (!targetHash) {
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 115: navigate(`${targetPath}#${targetHash}`)
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 118: const section = document.getElementById(targetHash)
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 181: location.hash,

Patrón: location
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 1: import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 99: const location = useLocation()
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 162: const active = isRouteActive(location.pathname, item.to)
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 180: location.pathname,
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 181: location.hash,
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 2: import { useLocation, useNavigate } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 22: const location = useLocation()
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 32: const redirectTo = location.state?.from?.pathname || "/dashboard"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\ProtectedRoute.jsx línea 1: import { Navigate, Outlet, useLocation } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\ProtectedRoute.jsx línea 6: const location = useLocation()
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\ProtectedRoute.jsx línea 9: return <Navigate to="/login" replace state={{ from: location }} />

Patrón: navigate
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 1: import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 100: const navigate = useNavigate()
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 104: navigate("/login", { replace: true })
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 115: navigate(`${targetPath}#${targetHash}`)
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 2: import { useLocation, useNavigate } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 21: const navigate = useNavigate()
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 36: navigate(redirectTo, { replace: true })
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 38: }, [navigate, redirectTo])
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 63: navigate(redirectTo, { replace: true })
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 1: import { Navigate, Route, Routes } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 14: <Route path="/" element={<Navigate to="/login" replace />} />
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 26: <Route path="*" element={<Navigate to="/login" replace />} />
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\ProtectedRoute.jsx línea 1: import { Navigate, Outlet, useLocation } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\ProtectedRoute.jsx línea 9: return <Navigate to="/login" replace state={{ from: location }} />

Patrón: NavLink
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 1: import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 166: <NavLink to={item.to} className={getMainLinkClass}>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 168: </NavLink>

Patrón: Route
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\App.jsx línea 1: import { BrowserRouter } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\App.jsx línea 4: import AppRouter from "@/routes/AppRouter"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\App.jsx línea 8: <BrowserRouter>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\App.jsx línea 10: <AppRouter />
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\App.jsx línea 12: </BrowserRouter>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AdminLayout.jsx línea 1: import { Outlet } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 1: import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 72: function isRouteActive(pathname, route) {
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 73: return pathname === route || pathname.startsWith(`${route}/`)
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\components\layout\AppSidebar.jsx línea 162: const active = isRouteActive(location.pathname, item.to)
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Dashboard.jsx línea 2: import { Link } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\pages\Login.jsx línea 2: import { useLocation, useNavigate } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 1: import { Navigate, Route, Routes } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 9: import ProtectedRoute from "@/routes/ProtectedRoute"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 11: export default function AppRouter() {
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 13: <Routes>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 14: <Route path="/" element={<Navigate to="/login" replace />} />
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 15: <Route path="/login" element={<Login />} />
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 17: <Route element={<ProtectedRoute />}>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 18: <Route element={<AdminLayout />}>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 19: <Route path="/dashboard" element={<Dashboard />} />
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 20: <Route path="/usuarios" element={<Usuarios />} />
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 21: <Route path="/inventario" element={<Inventario />} />
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 22: <Route path="/ventas" element={<Ventas />} />
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 23: </Route>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 24: </Route>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 26: <Route path="*" element={<Navigate to="/login" replace />} />
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 27: </Routes>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\ProtectedRoute.jsx línea 1: import { Navigate, Outlet, useLocation } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\ProtectedRoute.jsx línea 5: export default function ProtectedRoute() {

Patrón: Routes
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\App.jsx línea 4: import AppRouter from "@/routes/AppRouter"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 1: import { Navigate, Route, Routes } from "react-router-dom"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 9: import ProtectedRoute from "@/routes/ProtectedRoute"
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 13: <Routes>
- E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07\src\routes\AppRouter.jsx línea 27: </Routes>

## Estructura propuesta de refactor

Se recomienda separar las secciones internas en rutas reales:

- /usuarios/resumen
- /usuarios/crear
- /usuarios/listado
- /inventario/resumen
- /inventario/registrar
- /inventario/movimientos
- /inventario/tablas
- /ventas/analisis
- /ventas/historial
- /ventas/pedido

El dashboard puede conservarse como /dashboard.

## Criterios técnicos del refactor

- Mantener diseño visual actual.
- Mantener autenticación y ProtectedRoute.
- Mantener la navegación lateral.
- Evitar archivos de página superiores a 700 líneas.
- Extraer componentes reutilizables a carpetas feature.
- Validar cada cambio con pnpm lint y pnpm build.
- No afectar Render, Aiven ni la API pública.
- No hacer push a Arawkano hasta finalizar y validar.

## Estado inicial de URLs públicas

- Frontend Vercel: https://mlbt-proyecto.vercel.app
- API Render: https://mlbt-proyecto.onrender.com
- Health API: https://mlbt-proyecto.onrender.com/api/health

## Próximo paso

Iniciar refactor por módulo, comenzando por Usuarios, porque es el bloque más simple para validar el patrón de separación por páginas.
