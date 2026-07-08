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
| Interfaz React AP07 | [front-end/react-ap07](front-end/react-ap07) |
| README de la interfaz React | [front-end/react-ap07/README.md](front-end/react-ap07/README.md) |
| Guía React AP07 | [00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md](00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md) |
| API MLBT | [back-end/api-node](back-end/api-node) |
| Evidencias | [docs/evidencias](docs/evidencias) |

## Línea de tiempo de evidencias

| Orden | Fecha Git | Evidencia | Entrega | Ruta |
|---|---|---|---|---|
| 01 | 2026-05-24 | GA7-220501096-AA3-EV01 | Aplicación web Java / Spring | [docs/evidencias/GA7_220501096_AA3_EV01](docs/evidencias/GA7_220501096_AA3_EV01) |
| 02 | 2026-05-29 | GA7-220501096-AA5-EV03 | Servicios REST MLBT | [back-end/api-node/docs](back-end/api-node/docs) y [docs/evidencias/GA7_220501096_AA5_EV03](docs/evidencias/GA7_220501096_AA5_EV03) |
| 03 | 2026-05-29 | GA7-220501096-AA5-EV04 | Pruebas de API con Postman | [back-end/api-node/postman](back-end/api-node/postman) y [docs/evidencias/GA7_220501096_AA5_EV04](docs/evidencias/GA7_220501096_AA5_EV04) |
| 04 | 2026-06-18 | GA7-220501096-AA4-EV03 | Interfaz React del proyecto formativo | [front-end/react-ap07](front-end/react-ap07) y [08_FRONTEND_REACT_AP07.md](00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md) |

## Estructura principal

| Ruta | Propósito |
|---|---|
| [front-end/react-ap07](front-end/react-ap07) | Interfaz React de la evidencia AP07. |
| [back-end/api-node](back-end/api-node) | API REST del proyecto MLBT. |
| [back-end/spring-web](back-end/spring-web) | Módulo web Spring. |
| [back-end/java-web](back-end/java-web) | Módulo web Java. |
| [pages](front-end/interfaz-base/pages), [css](front-end/interfaz-base/css), [js](front-end/interfaz-base/js), [assets](front-end/interfaz-base/assets) | Interfaz base del proyecto. |
| [docs](docs) | Evidencias y documentación técnica. |
| [00_GUIA_TECNICA_PROYECTO](00_GUIA_TECNICA_PROYECTO) | Panel técnico de revisión. |

## Interfaz React AP07

| Elemento | Detalle |
|---|---|
| Ruta del módulo | [front-end/react-ap07](front-end/react-ap07) |
| Guía técnica | [08_FRONTEND_REACT_AP07.md](00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md) |
| README del módulo | [front-end/react-ap07/README.md](front-end/react-ap07/README.md) |
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

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\front-end\react-ap07"
    pnpm install
    pnpm dev
    pnpm lint
    pnpm build
