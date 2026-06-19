<!-- LICENCIA_USO_ACADEMICO_INICIO -->

## Licencia y uso académico

Este repositorio se publica con fines académicos, de revisión técnica y de portafolio.

La licencia y condiciones de uso están documentadas en:

- LICENSE.md

Los datos usados en pruebas son ficticios y deben mantenerse anonimizados.

<!-- LICENCIA_USO_ACADEMICO_FIN -->

# MLBT - María La Bonita Taquería

Proyecto formativo web para la gestión administrativa de María La Bonita Taquería.

## Guía técnica

La ruta principal de revisión es:

- 00_GUIA_TECNICA_PROYECTO/README.md

## Evidencias relacionadas

| Evidencia | Entrega | Ruta principal |
|---|---|---|
| GA7-220501096-AA3-EV01 | Aplicación web Java / Spring | docs/evidencias/GA7_220501096_AA3_EV01 |
| GA7-220501096-AA4-EV02 | Documento de definición de componentes Front-End | Documento anexo de la evidencia |
| GA7-220501096-AA4-EV03 | Interfaz React del proyecto formativo | frontend-react y 00_GUIA_TECNICA_PROYECTO/08_FRONTEND_REACT_AP07.md |
| GA7-220501096-AA5-EV03 | API del proyecto | api-mlbt/docs |
| GA7-220501096-AA5-EV04 | Pruebas de API con Postman | api-mlbt/postman y docs/evidencias/GA7_220501096_AA5_EV04 |

## Estructura principal

| Ruta | Propósito |
|---|---|
| frontend-react | Interfaz React de la evidencia AP07. |
| api-mlbt | API REST del proyecto MLBT. |
| spring-web | Módulo web Spring. |
| java-web | Módulo web Java. |
| pages, css, js, assets | Interfaz base del proyecto. |
| docs | Evidencias y documentación técnica. |
| 00_GUIA_TECNICA_PROYECTO | Panel técnico de revisión. |

## Interfaz React AP07

Ruta:

    frontend-react

Rutas funcionales:

- /login
- /dashboard
- /usuarios
- /inventario
- /ventas

Credenciales de prueba:

- Usuario: admin
- Contraseña: admin

Tecnologías aplicadas:

- ReactJS
- Vite
- JavaScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- TanStack Table
- react-router-dom
- pnpm

Ejecución local:

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\frontend-react"
    pnpm install
    pnpm dev

Validación local:

    Set-Location "E:\Dev\01_Repositorios\MLBT_Proyecto\frontend-react"
    pnpm lint
    pnpm build

Dirección local:

    http://localhost:5173

## Rama de trabajo

- Arawkano
