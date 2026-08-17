# Interfaz React AP07 - MLBT

## Referencia histórica

El identificador histórico asociado al módulo es GA7-220501096-AA4-EV03.

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Documentar la implementación del componente de interfaz React de MLBT, manteniendo trazabilidad técnica para revisión, ejecución local, mantenimiento y validación.

## Alcance implementado

- Inicio de sesión integrado con API Node (JWT).
- Panel principal administrativo.
- Gestión de usuarios, inventario y ventas.
- Navegación lateral fija y rutas anidadas.
- Autenticación, usuarios, inventario y ventas integrados con API Node; los contextos legacy de datos locales fueron retirados del runtime funcional.

## Ruta del módulo

    01_FRONT_END/01_REACT_AP07

## Rutas funcionales

- `/login`
- `/dashboard`
- `/usuarios` → resumen, crear, listado
- `/inventario` → resumen, registrar, movimientos, tablas
- `/ventas` → pedido, historial, análisis

## Autenticación

Las credenciales de validación se gestionan fuera del repositorio. Para entornos locales, consulte la configuración de la API Node.

## Tecnologías (package.json)

| Tecnología | Versión |
|---|---|
| React / react-dom | ^19.2.8 |
| Vite | ^8.1.5 |
| Vitest | 4.1.10 |
| react-router-dom | 7.18.1 |
| @tanstack/react-table | 8.21.3 |
| Tailwind CSS | 4.3.3 |
| Node.js | 24.x |
| pnpm | 11.0.8 |

## Carga diferida — H-001 cerrado

Las rutas administrativas usan `React.lazy` + `Suspense` en `src/routes/AppRouter.jsx`.

| Métrica | Valor verificado |
|---|---|
| Chunk entry | 246.35 kB minificado |
| Gzip entry | 79.02 kB |
| Warning >500 kB | Eliminado |

## Ejecución y validación

Baseline PROD-001: **74/74 pruebas Frontend PASS**, ESLint PASS y build de producción PASS.

```powershell
Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07"
pnpm install
pnpm test:run
pnpm lint
pnpm build
```

## Referencias

- [README del módulo](../01_REACT_AP07/README.md)
- [README principal](../README.md)
