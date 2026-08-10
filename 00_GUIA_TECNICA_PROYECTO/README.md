# Guía técnica del proyecto MLBT

<!-- DOC-03-INICIO -->

## Índice de la guía técnica

| Documento | Propósito |
|---|---|
| [01_RESUMEN_TECNICO](01_RESUMEN_TECNICO.md) | Síntesis técnica del proyecto. |
| [02_ESTRUCTURA_DEL_PROYECTO](02_ESTRUCTURA_DEL_PROYECTO.md) | Organización general del repositorio. |
| [03_COMANDOS_DE_EJECUCION](03_COMANDOS_DE_EJECUCION.md) | Comandos principales de ejecución y validación. |
| [04_CODIGO_FUENTE_RELEVANTE](04_CODIGO_FUENTE_RELEVANTE.md) | Archivos y módulos relevantes. |
| [05_EVIDENCIAS_Y_PRUEBAS](05_EVIDENCIAS_Y_PRUEBAS.md) | Relación con validaciones y pruebas. |
| [06_TRAZABILIDAD_GIT](06_TRAZABILIDAD_GIT.md) | Trazabilidad de ramas, commits y flujo Git. |
| [07_CIERRE_TECNICO](07_CIERRE_TECNICO.md) | Estado técnico de cierre. |
| [08_FRONTEND_REACT_AP07](08_FRONTEND_REACT_AP07.md) | Descripción del frontend React. |

## Regla documental

- Esta carpeta funciona como guía técnica pública.
- No contiene credenciales privadas ni archivos pesados.
- Los registros históricos mantienen sus identificadores originales para preservar trazabilidad.

<!-- DOC-03-FIN -->


Repositorio: [MLBT_Proyecto](../README.md)

Proyecto web MLBT - María La Bonita Taquería.

Esta guía funciona como panel principal para revisar código fuente, validaciones, pruebas, API, interfaz React, documentación técnica y estado general del proyecto.

---

## Acceso rápido

| Recurso | Enlace | Estado |
|---|---|---|
| README principal | [../README.md](../README.md) | Disponible |
| Interfaz React AP07 | [../01_FRONT_END/01_REACT_AP07](../01_FRONT_END/01_REACT_AP07) | Disponible |
| README interfaz React | [../01_FRONT_END/01_REACT_AP07/README.md](../01_FRONT_END/01_REACT_AP07/README.md) | Disponible |
| Guía React AP07 | [08_FRONTEND_REACT_AP07.md](08_FRONTEND_REACT_AP07.md) | Disponible |
| API MLBT | [../02_BACK_END/01_API_NODE](../02_BACK_END/01_API_NODE) | Disponible |
| Documentación API | [../02_BACK_END/01_API_NODE/docs](../02_BACK_END/01_API_NODE/docs) | Disponible |
| Colección Postman | [../02_BACK_END/01_API_NODE/postman](../02_BACK_END/01_API_NODE/postman) | Disponible |
| Historial técnico | [../03_DOCS/evidencias](../03_DOCS/evidencias) | Disponible |
| Licencia MIT | [../LICENSE.md](../LICENSE.md) | Disponible |

---

## Historial de evolución

| Orden | Fecha Git | Hito técnico | Componente | Ruta de revisión |
|---|---|---|---|---|
| 01 | 2026-05-24 | Implementación web Java | Spring Web / Java Web | [Historial técnico](../03_DOCS/evidencias/GA7_220501096_AA3_EV01) |
| 02 | 2026-05-29 | Implementación de servicios REST | API MLBT | [Documentación API](../02_BACK_END/01_API_NODE/docs) |
| 03 | 2026-05-29 | Validación de servicios HTTP | API MLBT / Postman | [Colección Postman](../02_BACK_END/01_API_NODE/postman) |
| 04 | 2026-06-18 | Interfaz administrativa | Frontend React | [Frontend React](../01_FRONT_END/01_REACT_AP07) |
| 05 | 2026-07-08 | Integración funcional | React / API / base de datos | [Historial técnico](../03_DOCS/evidencias/GA8_220501096_AA1_EV01/README.md) |
| 06 | 2026-07-08 | Despliegue público integrado | Frontend / Backend | [Historial técnico](../03_DOCS/evidencias/GA8_220501096_AA1_EV02/README.md) |

---

## URLs públicas

| Servicio | URL |
|---|---|
| Frontend React | https://mlbt-proyecto.vercel.app |
| Login React | https://mlbt-proyecto.vercel.app/login |
| API Node | https://mlbt-proyecto.onrender.com |
| Health API | https://mlbt-proyecto.onrender.com/api/health |

## Ruta sugerida de lectura

| Orden | Documento | Propósito |
|---|---|---|
| 01 | [01_RESUMEN_TECNICO.md](01_RESUMEN_TECNICO.md) | Resume objetivo, módulos y tecnologías. |
| 02 | [02_ESTRUCTURA_DEL_PROYECTO.md](02_ESTRUCTURA_DEL_PROYECTO.md) | Explica la organización general del repositorio. |
| 03 | [03_COMANDOS_DE_EJECUCION.md](03_COMANDOS_DE_EJECUCION.md) | Indica comandos de ejecución y validación local. |
| 04 | [04_CODIGO_FUENTE_RELEVANTE.md](04_CODIGO_FUENTE_RELEVANTE.md) | Señala rutas principales del código fuente. |
| 05 | [05_EVIDENCIAS_Y_PRUEBAS.md](05_EVIDENCIAS_Y_PRUEBAS.md) | Enlaza evidencias, capturas, Postman y resultados. |
| 06 | [06_TRAZABILIDAD_GIT.md](06_TRAZABILIDAD_GIT.md) | Resume ramas, commits y trazabilidad. |
| 07 | [07_CIERRE_TECNICO.md](07_CIERRE_TECNICO.md) | Presenta el estado técnico consolidado. |
| 08 | [08_FRONTEND_REACT_AP07.md](08_FRONTEND_REACT_AP07.md) | Documenta la interfaz React AP07. |

---

## Ejecución rápida

| Módulo | Comandos | Ruta |
|---|---|---|
| Interfaz React | pnpm install, pnpm dev, pnpm lint, pnpm build | [../01_FRONT_END/01_REACT_AP07](../01_FRONT_END/01_REACT_AP07) |
| API MLBT | pnpm install, pnpm run dev | [../02_BACK_END/01_API_NODE](../02_BACK_END/01_API_NODE) |
| Spring Web | Ejecutar según README del módulo | [../02_BACK_END/02_SPRING_WEB](../02_BACK_END/02_SPRING_WEB) |
| Java Web | Ejecutar según README del módulo | [../02_BACK_END/03_JAVA_WEB](../02_BACK_END/03_JAVA_WEB) |
| Interfaz base | Abrir páginas desde entorno local | [../01_FRONT_END/02_INTERFAZ_BASE/pages](../01_FRONT_END/02_INTERFAZ_BASE/pages) |

---

## Estado final de revisión

| Criterio | Estado |
|---|---|
| Código fuente visible | Completado |
| Interfaz React AP07 visible | Completado |
| README del módulo React actualizado | Completado |
| Guía técnica AP07 enlazada | Completado |
| Historial técnico enlazado | Completado |
| Licencia MIT documentada | Completado |
| Repositorio listo para revisión | Completado |
| Despliegue público integrado | Completado |

## Pruebas de software

La guía técnica incorpora resultados consolidados, comandos reproducibles y enlaces internos para la validación de los distintos módulos.

El historial detallado se conserva en [documentación de pruebas](../03_DOCS/evidencias/GA9_220501096_AA1_AA3_PRUEBAS_MLBT/README.md).

