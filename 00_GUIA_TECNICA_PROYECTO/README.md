# Guía técnica del proyecto MLBT

Repositorio: [MLBT_Proyecto](../README.md)

Proyecto web MLBT - María La Bonita Taquería.

Esta guía funciona como panel principal para revisar código fuente, evidencias, pruebas, API, interfaz React, documentación técnica y estado general del proyecto.

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
| Evidencias generales | [../03_DOCS/evidencias](../03_DOCS/evidencias) | Disponible |
| Licencia | [../LICENSE.md](../LICENSE.md) | Disponible |

---

## Línea de tiempo de evidencias

| Orden | Fecha Git | Evidencia | Módulo o entrega | Ruta de revisión |
|---|---|---|---|---|
| 01 | 2026-05-24 | GA7-220501096-AA3-EV01 | Spring Web / Java Web | [../03_DOCS/evidencias/GA7_220501096_AA3_EV01](../03_DOCS/evidencias/GA7_220501096_AA3_EV01) |
| 02 | 2026-05-29 | GA7-220501096-AA5-EV03 | API MLBT | [../02_BACK_END/01_API_NODE/docs](../02_BACK_END/01_API_NODE/docs) y [../03_DOCS/evidencias/GA7_220501096_AA5_EV03](../03_DOCS/evidencias/GA7_220501096_AA5_EV03) |
| 03 | 2026-05-29 | GA7-220501096-AA5-EV04 | API MLBT / Postman | [../02_BACK_END/01_API_NODE/postman](../02_BACK_END/01_API_NODE/postman) y [../03_DOCS/evidencias/GA7_220501096_AA5_EV04](../03_DOCS/evidencias/GA7_220501096_AA5_EV04) |
| 04 | 2026-06-18 | GA7-220501096-AA4-EV03 | Interfaz React | [../01_FRONT_END/01_REACT_AP07](../01_FRONT_END/01_REACT_AP07) y [08_FRONTEND_REACT_AP07.md](08_FRONTEND_REACT_AP07.md) |
| 05 | 2026-07-08 | GA8-220501096-AA1-EV01 | Integración de módulos | [../03_DOCS/evidencias/GA8_220501096_AA1_EV01](../03_DOCS/evidencias/GA8_220501096_AA1_EV01/README.md) |
| 06 | 2026-07-08 | GA8-220501096-AA1-EV02 | Módulos integrados con despliegue público | [../03_DOCS/evidencias/GA8_220501096_AA1_EV02](../03_DOCS/evidencias/GA8_220501096_AA1_EV02/README.md) |

---

## URLs públicas GA8

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
| Evidencias enlazadas | Completado |
| Licencia documentada | Completado |
| Repositorio listo para revisión | Completado |
| Despliegue público GA8 EV02 | Completado |
