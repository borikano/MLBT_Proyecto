<!-- LICENCIA_USO_ACADEMICO_INICIO -->

## Licencia y uso académico

Este repositorio se publica con fines académicos, de revisión técnica y de portafolio.

La licencia y condiciones de uso están documentadas en:

- [LICENSE.md](LICENSE.md)

Los datos usados en pruebas son ficticios y deben mantenerse anonimizados.

<!-- LICENCIA_USO_ACADEMICO_FIN -->

# MLBT - María La Bonita Taquería

Proyecto formativo web para la gestión administrativa de María La Bonita Taquería.

## Acceso rápido

| Recurso | Enlace |
|---|---|
| Guía técnica del proyecto | [00_GUIA_TECNICA_PROYECTO/README.md](00_GUIA_TECNICA_PROYECTO/README.md) |
| Interfaz React AP07 | [01_FRONT_END/01_REACT_AP07](01_FRONT_END/01_REACT_AP07) |
| README de la interfaz React | [01_FRONT_END/01_REACT_AP07/README.md](01_FRONT_END/01_REACT_AP07/README.md) |
| Guía React AP07 | [00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md](00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md) |
| API MLBT | [02_BACK_END/01_API_NODE](02_BACK_END/01_API_NODE) |
| Evidencias | [03_DOCS/evidencias](03_DOCS/evidencias) |

## Línea de tiempo de evidencias

| Orden | Fecha Git | Evidencia | Entrega | Ruta |
|---|---|---|---|---|
| 01 | 2026-05-24 | GA7-220501096-AA3-EV01 | Aplicación web Java / Spring | [03_DOCS/evidencias/GA7_220501096_AA3_EV01](03_DOCS/evidencias/GA7_220501096_AA3_EV01) |
| 02 | 2026-05-29 | GA7-220501096-AA5-EV03 | Servicios REST MLBT | [02_BACK_END/01_API_NODE/docs](02_BACK_END/01_API_NODE/docs) y [03_DOCS/evidencias/GA7_220501096_AA5_EV03](03_DOCS/evidencias/GA7_220501096_AA5_EV03) |
| 03 | 2026-05-29 | GA7-220501096-AA5-EV04 | Pruebas de API con Postman | [02_BACK_END/01_API_NODE/postman](02_BACK_END/01_API_NODE/postman) y [03_DOCS/evidencias/GA7_220501096_AA5_EV04](03_DOCS/evidencias/GA7_220501096_AA5_EV04) |
| 04 | 2026-06-18 | GA7-220501096-AA4-EV03 | Interfaz React del proyecto formativo | [01_FRONT_END/01_REACT_AP07](01_FRONT_END/01_REACT_AP07) y [08_FRONTEND_REACT_AP07.md](00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md) |

## Estructura principal

| Ruta | Propósito |
|---|---|
| [01_FRONT_END/01_REACT_AP07](01_FRONT_END/01_REACT_AP07) | Interfaz React de la evidencia AP07. |
| [02_BACK_END/01_API_NODE](02_BACK_END/01_API_NODE) | API REST del proyecto MLBT. |
| [02_BACK_END/02_SPRING_WEB](02_BACK_END/02_SPRING_WEB) | Módulo web Spring. |
| [02_BACK_END/03_JAVA_WEB](02_BACK_END/03_JAVA_WEB) | Módulo web Java. |
| [pages](01_FRONT_END/02_INTERFAZ_BASE/pages), [css](01_FRONT_END/02_INTERFAZ_BASE/css), [js](01_FRONT_END/02_INTERFAZ_BASE/js), [assets](01_FRONT_END/02_INTERFAZ_BASE/assets) | Interfaz base del proyecto. |
| [03_DOCS](03_DOCS) | Evidencias y documentación técnica. |
| [00_GUIA_TECNICA_PROYECTO](00_GUIA_TECNICA_PROYECTO) | Panel técnico de revisión. |

## Interfaz React AP07

| Elemento | Detalle |
|---|---|
| Ruta del módulo | [01_FRONT_END/01_REACT_AP07](01_FRONT_END/01_REACT_AP07) |
| Guía técnica | [08_FRONTEND_REACT_AP07.md](00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md) |
| README del módulo | [01_FRONT_END/01_REACT_AP07/README.md](01_FRONT_END/01_REACT_AP07/README.md) |
| Dirección local | http://localhost:5173 |
| Rama de trabajo | Arawkano |

Rutas funcionales:

- /login
- /dashboard
- /usuarios
- /inventario
- /ventas

Credenciales de prueba:

- Usuario: admin
- Contraseña: admin

Comandos principales:

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\01_FRONT_END\01_REACT_AP07"
    pnpm install
    pnpm dev
    pnpm lint
    pnpm build
