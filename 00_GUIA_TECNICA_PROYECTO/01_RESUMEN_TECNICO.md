# Resumen técnico

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Organizar y documentar el proyecto MLBT como repositorio público verificable, incluyendo interfaz React, API Node, módulos Java complementarios, pruebas automatizadas, CI, Dependabot y trazabilidad Git.

## Estado actual (rama Arawkano)

| Control | Resultado |
|---|---|
| Runtime productivo principal | 137/137 (Frontend 74 + API 63) |
| H-001 (bundle Vite) | Cerrado históricamente; baseline actual 246.35 kB (gzip 79.02 kB) |
| H-002 (Java Web) | Estandarizado — `test.cmd` / `package.cmd` |
| CH-001 (Dependabot) | Configurado — majors Prisma bloqueados |
| CI | Workflow configurado con Node 24 y pnpm 11.0.8; validación automática en push y pull request |

## Baseline de release

- Release estable e inmutable: `v1.1.0`.
- Commit base: `2d4e4acf4a2cafb6df09911abdbc94f3a3d591a5`.
- PROD-001 aplica hardening posterior sin mover ni recrear el tag estable.

## Módulos principales

| Módulo | Ruta | Propósito |
|---|---|---|
| Interfaz React | [../01_FRONT_END/01_REACT_AP07](../01_FRONT_END/01_REACT_AP07) | Frontend administrativo principal. |
| API MLBT | [../02_BACK_END/01_API_NODE](../02_BACK_END/01_API_NODE) | API REST con Node.js, Express, Prisma y MySQL. |
| Spring Web | [../02_BACK_END/02_SPRING_WEB](../02_BACK_END/02_SPRING_WEB) | Módulo Spring Boot complementario. |
| Java Web | [../02_BACK_END/03_JAVA_WEB](../02_BACK_END/03_JAVA_WEB) | Módulo JSP/Servlets complementario. |
| Documentación histórica | [../03_DOCS](../03_DOCS) | Archivo de validaciones anteriores. |
| Interfaz base | [../01_FRONT_END/02_INTERFAZ_BASE](../01_FRONT_END/02_INTERFAZ_BASE) | Referencia histórica HTML/CSS/JS. |

## Arquitectura operativa

Frontend React (Vercel) → API Node (Render) → MySQL (Aiven).

Los módulos Java no forman parte del despliegue principal del producto administrativo actual.
