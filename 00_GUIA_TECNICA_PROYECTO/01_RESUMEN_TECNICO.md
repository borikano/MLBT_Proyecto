# Resumen técnico

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Organizar y documentar el proyecto MLBT como repositorio público verificable, incluyendo interfaz React, API Node, módulos Java complementarios, pruebas automatizadas, CI, Dependabot y trazabilidad Git.

## Estado actual (rama Arawkano)

| Control | Resultado |
|---|---|
| Pruebas automatizadas | 44/44 |
| H-001 (bundle Vite) | Cerrado — entry 256.26 kB |
| H-002 (Java Web) | Estandarizado — `test.cmd` / `package.cmd` |
| CH-001 (Dependabot) | Configurado — majors Prisma bloqueados |
| CI | Workflow activo; última ejecución aprobada para HEAD `41bca42` |

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
