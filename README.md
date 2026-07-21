<!-- LICENCIA_USO_ACADEMICO_INICIO -->

## Licencia y uso académico

Este repositorio se publica con fines académicos, de revisión técnica y de portafolio.

La licencia y condiciones de uso están documentadas en:

- [LICENSE.md](LICENSE.md)

Los datos usados en pruebas son ficticios y deben mantenerse anonimizados.

<!-- LICENCIA_USO_ACADEMICO_FIN -->

# MLBT - María La Bonita Taquería

Proyecto formativo web para la gestión administrativa de María La Bonita Taquería.

## URLs públicas de la entrega GA8

| Servicio | URL | Estado |
|---|---|---|
| Frontend React | https://mlbt-proyecto.vercel.app | Publicado en Vercel. |
| Login React | https://mlbt-proyecto.vercel.app/login | Validado con autenticación real. |
| Dashboard React | https://mlbt-proyecto.vercel.app/dashboard | Accesible después del login. |
| API Node | https://mlbt-proyecto.onrender.com | Publicada en Render. |
| Health API | https://mlbt-proyecto.onrender.com/api/health | Validado en producción. |
| Base de datos | Aiven MySQL 8.4 | Conectada desde Render mediante variable de entorno segura. |

No se publica la contraseña, la cadena completa de conexión ni variables de entorno sensibles por seguridad.

## Acceso rápido

| Recurso | Enlace |
|---|---|
| Guía técnica del proyecto | [00_GUIA_TECNICA_PROYECTO/README.md](00_GUIA_TECNICA_PROYECTO/README.md) |
| Documentación general | [03_DOCS/README.md](03_DOCS/README.md) |
| Evidencias | [03_DOCS/evidencias/README.md](03_DOCS/evidencias/README.md) |
| Interfaz React AP07 | [01_FRONT_END/01_REACT_AP07](01_FRONT_END/01_REACT_AP07) |
| README de la interfaz React | [01_FRONT_END/01_REACT_AP07/README.md](01_FRONT_END/01_REACT_AP07/README.md) |
| API MLBT | [02_BACK_END/01_API_NODE](02_BACK_END/01_API_NODE) |
| Documentación API | [02_BACK_END/01_API_NODE/docs](02_BACK_END/01_API_NODE/docs) |

## Línea de tiempo de evidencias

| Orden | Fecha Git | Evidencia | Entrega | Ruta |
|---|---|---|---|---|
| 01 | 2026-05-24 | GA7-220501096-AA3-EV01 | Aplicación web Java / Spring | [03_DOCS/evidencias/GA7_220501096_AA3_EV01](03_DOCS/evidencias/GA7_220501096_AA3_EV01/README.md) |
| 02 | 2026-05-29 | GA7-220501096-AA5-EV03 | Servicios REST MLBT | [02_BACK_END/01_API_NODE/docs](02_BACK_END/01_API_NODE/docs) y [03_DOCS/evidencias/GA7_220501096_AA5_EV03](03_DOCS/evidencias/GA7_220501096_AA5_EV03/README.md) |
| 03 | 2026-05-29 | GA7-220501096-AA5-EV04 | Pruebas de API con Postman | [02_BACK_END/01_API_NODE/postman](02_BACK_END/01_API_NODE/postman) y [03_DOCS/evidencias/GA7_220501096_AA5_EV04](03_DOCS/evidencias/GA7_220501096_AA5_EV04/README.md) |
| 04 | 2026-06-18 | GA7-220501096-AA4-EV03 | Interfaz React del proyecto formativo | [01_FRONT_END/01_REACT_AP07](01_FRONT_END/01_REACT_AP07) y [00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md](00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md) |
| 05 | 2026-07-08 | GA8-220501096-AA1-EV01 | Integración funcional de módulos | [03_DOCS/evidencias/GA8_220501096_AA1_EV01](03_DOCS/evidencias/GA8_220501096_AA1_EV01/README.md) |
| 06 | 2026-07-08 | GA8-220501096-AA1-EV02 | Módulos integrados con despliegue público | [03_DOCS/evidencias/GA8_220501096_AA1_EV02](03_DOCS/evidencias/GA8_220501096_AA1_EV02/README.md) |


## Estructura principal

| Ruta | Propósito |
|---|---|
| [00_GUIA_TECNICA_PROYECTO](00_GUIA_TECNICA_PROYECTO) | Panel técnico de revisión del proyecto. |
| [01_FRONT_END/01_REACT_AP07](01_FRONT_END/01_REACT_AP07) | Interfaz React de la evidencia AP07. |
| [01_FRONT_END/02_INTERFAZ_BASE](01_FRONT_END/02_INTERFAZ_BASE) | Interfaz base HTML, CSS y JavaScript del proyecto. |
| [02_BACK_END/01_API_NODE](02_BACK_END/01_API_NODE) | API REST del proyecto MLBT. |
| [02_BACK_END/02_SPRING_WEB](02_BACK_END/02_SPRING_WEB) | Módulo web Spring Boot. |
| [02_BACK_END/03_JAVA_WEB](02_BACK_END/03_JAVA_WEB) | Módulo Java Web con JSP y Servlets. |
| [03_DOCS](03_DOCS) | Documentación técnica, estándares, trazabilidad y evidencias. |

## Frontend React público

| Elemento | Detalle |
|---|---|
| Módulo | [01_FRONT_END/01_REACT_AP07](01_FRONT_END/01_REACT_AP07) |
| README del módulo | [01_FRONT_END/01_REACT_AP07/README.md](01_FRONT_END/01_REACT_AP07/README.md) |
| Frontend público | https://mlbt-proyecto.vercel.app |
| Login público | https://mlbt-proyecto.vercel.app/login |
| API pública consumida | https://mlbt-proyecto.onrender.com |
| Rama estable | Arawkano |

Rutas funcionales principales:

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

Credenciales de prueba:

- Usuario: adminapp
- Contraseña: AdminApp123*

Comandos principales de validación local:

    Set-Location ".\01_FRONT_END\01_REACT_AP07"
    pnpm install
    pnpm dev
    pnpm lint
    pnpm build

<!-- GA8_EVIDENCIAS_INICIO -->

## Evidencias GA8 - Integración y módulos integrados

| Evidencia | Descripción | Ruta |
|---|---|---|
| GA8-220501096-AA1-EV01 | Integración funcional entre Frontend React, API Node y base de datos MySQL/MariaDB. | [03_DOCS/evidencias/GA8_220501096_AA1_EV01](03_DOCS/evidencias/GA8_220501096_AA1_EV01/README.md) |
| GA8-220501096-AA1-EV02 | Módulos integrados, entradas/salidas, pruebas y URLs públicas de ejecución. | [03_DOCS/evidencias/GA8_220501096_AA1_EV02](03_DOCS/evidencias/GA8_220501096_AA1_EV02/README.md) |

<!-- GA8_EVIDENCIAS_FIN -->

<!-- GA9_PRUEBAS_INICIO -->
## GA9 - Pruebas de software

| Evidencia técnica | Descripción | Ruta |
| --- | --- | --- |
| GA9-220501096-AA1-EV01 | Se incorporaron pruebas básicas automatizadas en el frontend React mediante Vitest. | [Frontend React](01_FRONT_END/01_REACT_AP07/README.md) |

Validaciones técnicas registradas:

- Cálculo del total de un pedido.
- Disponibilidad del endpoint público /api/health.

Comandos principales desde la raíz del repositorio:

    Set-Location .\01_FRONT_END\01_REACT_AP07
    pnpm test:run
<!-- GA9_PRUEBAS_FIN -->

<!-- GA9_PRUEBAS_MLBT_INICIO -->
## Pruebas de software GA9

El proyecto MLBT cuenta con documentacion publica del ciclo GA9 de pruebas de software. Los entregables formales PDF, video y Excel se conservan fuera del repositorio; en GitHub se documentan comandos reproducibles, resultados consolidados y trazabilidad tecnica.

| Evidencia | Estado | Soporte publico |
|---|---|---|
| GA9-220501096-AA1-EV01 | Completada | Pruebas Vitest y README frontend. |
| GA9-220501096-AA1-EV02 | Completada | Plan de pruebas resumido en documentacion GA9. |
| GA9-220501096-AA2-EV01 | Completada | Casos y ambiente relacionados en trazabilidad GA9. |
| GA9-220501096-AA3-EV01 | Completada | Ejecucion documentada con 10 casos aprobados. |
| GA9-220501096-AA3-EV02 | Completada | Reporte consolidado del plan de pruebas ejecutadas. |

Documentacion GA9: [03_DOCS/evidencias/GA9_220501096_AA1_AA3_PRUEBAS_MLBT](03_DOCS/evidencias/GA9_220501096_AA1_AA3_PRUEBAS_MLBT/README.md).

Comando principal de pruebas:

    cd 01_FRONT_END/01_REACT_AP07
    pnpm test:run

Endpoint publico validado:

    https://mlbt-proyecto.onrender.com/api/health
<!-- GA9_PRUEBAS_MLBT_FIN -->
