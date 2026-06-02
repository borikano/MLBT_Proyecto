# Guía técnica del proyecto MLBT

Repositorio: `MLBT_Proyecto`

Proyecto web MLBT - María La Bonita Taquería.

Esta guía funciona como panel principal de revisión para ubicar rápidamente el código fuente, las evidencias, las pruebas, la API, la documentación técnica y el estado general del proyecto.

---

## Lectura rápida para revisión

| Elemento | Ubicación | Estado |
|---|---|---|
| README principal | [`README.md`](../README.md) | Disponible |
| Frontend base | [`pages`](../pages), [`js`](../js), [`assets`](../assets) | Disponible |
| Módulo Java Web | [`java-web`](../java-web) | Disponible |
| Módulo Spring Web | [`spring-web`](../spring-web) | Disponible |
| API MLBT | [`api-mlbt`](../api-mlbt) | Disponible |
| Documentación API | [`api-mlbt/docs`](../api-mlbt/docs) | Disponible |
| Colección Postman | [`api-mlbt/postman`](../api-mlbt/postman) | Disponible |
| Evidencias generales | [`docs/evidencias`](../docs/evidencias) | Disponible |
| Licencia y uso académico | [`LICENSE.md`](../LICENSE.md) | Disponible |

---

## Evidencias principales

| Evidencia | Módulo principal | Ruta de revisión | Estado |
|---|---|---|---|
| GA7-220501096-AA3-EV01 | Spring Web / Java Web | [`docs/evidencias/GA7_220501096_AA3_EV01`](../docs/evidencias/GA7_220501096_AA3_EV01) | Disponible |
| GA7-220501096-AA5-EV03 | API MLBT | [`api-mlbt/docs`](../api-mlbt/docs) y [`docs/evidencias/GA7_220501096_AA5_EV03`](../docs/evidencias/GA7_220501096_AA5_EV03) | Disponible |
| GA7-220501096-AA5-EV04 | API MLBT / Postman | [`api-mlbt/postman`](../api-mlbt/postman) y [`docs/evidencias/GA7_220501096_AA5_EV04`](../docs/evidencias/GA7_220501096_AA5_EV04) | Disponible |

---

## Qué debe revisar el evaluador

| Criterio | Ruta sugerida | Estado |
|---|---|---|
| Código frontend base | [`pages`](../pages), [`js`](../js), [`assets`](../assets) | Disponible |
| Módulo Java Web | [`java-web`](../java-web) | Disponible |
| Módulo Spring Boot MVC | [`spring-web`](../spring-web) | Disponible |
| API Node.js / Express | [`api-mlbt/src`](../api-mlbt/src) | Disponible |
| Modelo Prisma | [`api-mlbt/prisma/schema.prisma`](../api-mlbt/prisma/schema.prisma) | Disponible |
| Endpoints EV03 | [`api-mlbt/docs/ENDPOINTS_EV03.md`](../api-mlbt/docs/ENDPOINTS_EV03.md) | Documentado |
| Validación EV03 | [`api-mlbt/docs/VALIDACION_ENDPOINTS_EV03.md`](../api-mlbt/docs/VALIDACION_ENDPOINTS_EV03.md) | Documentado |
| Pruebas Postman EV04 | [`api-mlbt/docs/POSTMAN_EV04.md`](../api-mlbt/docs/POSTMAN_EV04.md) | Documentado |
| Colección Postman EV04 | [`api-mlbt/postman`](../api-mlbt/postman) | Disponible |
| Capturas EV04 | [`docs/evidencias/GA7_220501096_AA5_EV04`](../docs/evidencias/GA7_220501096_AA5_EV04) | Disponible |

---

## Módulos del proyecto

| Módulo | Tecnología principal | Propósito | Estado |
|---|---|---|---|
| Frontend base | HTML, CSS, JavaScript | Interfaz base del proyecto MLBT | Disponible |
| Java Web | JSP / Servlets | Validación de formularios y métodos HTTP | Disponible |
| Spring Web | Spring Boot MVC | Módulo web con persistencia y vistas | Disponible |
| API MLBT | Node.js, Express, Prisma, MySQL | Servicios REST para la evidencia AA5 | Disponible |
| Postman | Colección de pruebas | Validación de endpoints EV04 | Disponible |

---

## Ejecución rápida por módulo

| Módulo | Comando o acción | Ruta |
|---|---|---|
| API MLBT | `pnpm install` y `pnpm run dev` | [`api-mlbt`](../api-mlbt) |
| Spring Web | Ejecutar según README del módulo | [`spring-web`](../spring-web) |
| Java Web | Ejecutar según README del módulo | [`java-web`](../java-web) |
| Frontend base | Abrir páginas desde entorno local | [`pages`](../pages) |

Nota: los comandos completos y detalles técnicos se conservan en los documentos internos de esta guía y en los README de cada módulo.

---

## Documentos internos de esta guía

| Documento | Propósito |
|---|---|
| [`01_RESUMEN_TECNICO.md`](./01_RESUMEN_TECNICO.md) | Resume objetivo, módulos y tecnologías |
| [`02_ESTRUCTURA_DEL_PROYECTO.md`](./02_ESTRUCTURA_DEL_PROYECTO.md) | Explica la organización general del repositorio |
| [`03_COMANDOS_DE_EJECUCION.md`](./03_COMANDOS_DE_EJECUCION.md) | Indica comandos de ejecución y validación local |
| [`04_CODIGO_FUENTE_RELEVANTE.md`](./04_CODIGO_FUENTE_RELEVANTE.md) | Señala rutas principales del código fuente |
| [`05_EVIDENCIAS_Y_PRUEBAS.md`](./05_EVIDENCIAS_Y_PRUEBAS.md) | Enlaza evidencias, capturas, Postman y resultados |
| [`06_TRAZABILIDAD_GIT.md`](./06_TRAZABILIDAD_GIT.md) | Resume ramas, commits y trazabilidad |
| [`07_CIERRE_TECNICO.md`](./07_CIERRE_TECNICO.md) | Presenta el estado técnico consolidado |

---

## Documentos clave por evidencia

| Evidencia | Documento recomendado |
|---|---|
| AA3 EV01 | [`GA7_220501096_AA3_EV01_indice_entrega.md`](../docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_indice_entrega.md) |
| AA5 EV03 | [`GA7_220501096_AA5_EV03_indice_entrega.md`](../docs/evidencias/GA7_220501096_AA5_EV03/GA7_220501096_AA5_EV03_indice_entrega.md) |
| AA5 EV04 | [`GA7_220501096_AA5_EV04_indice_entrega.md`](../docs/evidencias/GA7_220501096_AA5_EV04/GA7_220501096_AA5_EV04_indice_entrega.md) |
| API EV03 | [`ENDPOINTS_EV03.md`](../api-mlbt/docs/ENDPOINTS_EV03.md) |
| API EV04 | [`POSTMAN_EV04.md`](../api-mlbt/docs/POSTMAN_EV04.md) |

---

## Seguridad y datos de prueba

| Criterio | Estado |
|---|---|
| `.env` no versionado | Cumplido |
| `node_modules` no versionado | Cumplido |
| Datos reales no requeridos | Cumplido |
| Evidencias de prueba documentadas | Cumplido |
| Uso académico indicado | Cumplido |

---

## Estado final de revisión

| Criterio | Estado |
|---|---|
| Código fuente visible | Completado |
| API documentada | Completado |
| Evidencias EV03 visibles | Completado |
| Evidencias EV04 visibles | Completado |
| Colección Postman visible | Completado |
| Guía técnica visual | Completado |
| Licencia documentada | Completado |
| Repositorio listo para revisión | Completado |
