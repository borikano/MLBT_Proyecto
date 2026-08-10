<!-- DOC-03-INICIO -->

## Navegación rápida

| Sección | Descripción |
|---|---|
| [Guía técnica](00_GUIA_TECNICA_PROYECTO/README.md) | Resumen técnico, estructura, ejecución, validaciones y trazabilidad. |
| [Frontend React](01_FRONT_END/01_REACT_AP07/README.md) | Interfaz web del proyecto MLBT. |
| [API Node](02_BACK_END/01_API_NODE/README.md) | Backend principal, endpoints y soporte de integración. |
| [Documentación](03_DOCS/README.md) | Documentación pública del proyecto. |
| [Historial técnico](03_DOCS/evidencias/README.md) | Registros históricos y trazabilidad de validaciones anteriores. |

## Estado documental

- Los registros históricos se conservan sin alterar su trazabilidad original.
- Los artefactos externos y archivos binarios de entrega no forman parte del código versionado.
- La documentación pública resume la trazabilidad técnica del proyecto MLBT.

<!-- DOC-03-FIN -->

<!-- LICENCIA_USO_INICIO -->

## Licencia

MLBT se distribuye bajo la [MIT License](LICENSE.md).

El texto completo de la licencia está disponible en:

- [LICENSE.md](LICENSE.md)

Los datos usados en pruebas son ficticios y deben mantenerse anonimizados.

<!-- LICENCIA_USO_FIN -->

# MLBT - María La Bonita Taquería

[![CI](https://github.com/borikano/MLBT_Proyecto/actions/workflows/ci.yml/badge.svg?branch=Arawkano)](https://github.com/borikano/MLBT_Proyecto/actions/workflows/ci.yml)
![Estado](https://img.shields.io/badge/estado-cierre%20t%C3%A9cnico%20validado-brightgreen)
![Seguridad](https://img.shields.io/badge/seguridad-OWASP%20b%C3%A1sico-blue)
![Calidad](https://img.shields.io/badge/calidad-ISO%2025010-informational)
![Dependabot](https://img.shields.io/badge/dependabot-controlado-success)

Aplicación web para la gestión administrativa de María La Bonita Taquería.

## Cierre técnico validado

| Área | Estado | Validación |
|---|---|---|
| Frontend React | Validado | Pruebas Vitest, Testing Library, lint y build de producción. |
| API Node | Validada | Pruebas unitarias, pruebas HTTP, check de configuración y endpoint público. |
| Spring Web | Validado | Pruebas Maven sobre servicio con comportamiento real. |
| Java Web | Validado | Pruebas JUnit del servicio de autenticación del módulo Java Web. |
| CI GitHub Actions | Activo | Workflow `CI` aprobado para React, API Node y módulos Maven. |
| Dependabot | Controlado | Actualizaciones automáticas activas con bloqueo de upgrades mayores incompatibles de Prisma. |
| Seguridad documental | Consolidada | `SECURITY.md`, criterios OWASP/ISO/WCAG y manejo de secretos documentados. |
| Producción | Operativa | Health público y login controlado validados contra API publicada. |

El repositorio queda preparado para revisión técnica, portafolio profesional y mantenimiento controlado. Los secretos reales no se versionan; la conexión productiva se administra mediante variables de entorno en Render y Aiven.

La validación pública de cierre confirmó respuesta satisfactoria de `https://mlbt-proyecto.onrender.com/api/health` y autenticación del usuario controlado `adminapp`. Esto indica que la API publicada puede operar con la base de datos productiva configurada en Aiven mientras las variables de Render y la instancia de base de datos permanezcan activas.

> [!IMPORTANT]
> Prisma se mantiene en la línea `6.x` porque el salto a Prisma 7 cambia la configuración del datasource y requiere una migración técnica separada. No debe aceptarse como actualización automática sin ajustar `prisma.config.ts`, validar `schema.prisma` y probar la conexión real de base de datos.

> [!NOTE]
> Vite puede advertir que el bundle principal supera 500 KB después de minificación. La compilación es satisfactoria y la advertencia se clasifica como mejora futura de optimización mediante división de código.

## URLs públicas

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
| Historial técnico | [03_DOCS/evidencias/README.md](03_DOCS/evidencias/README.md) |
| Interfaz React AP07 | [01_FRONT_END/01_REACT_AP07](01_FRONT_END/01_REACT_AP07) |
| README de la interfaz React | [01_FRONT_END/01_REACT_AP07/README.md](01_FRONT_END/01_REACT_AP07/README.md) |
| API MLBT | [02_BACK_END/01_API_NODE](02_BACK_END/01_API_NODE) |
| Documentación API | [02_BACK_END/01_API_NODE/docs](02_BACK_END/01_API_NODE/docs) |

## Historial de evolución

| Orden | Fecha Git | Hito técnico | Componente | Ruta |
|---|---|---|---|---|
| 01 | 2026-05-24 | Implementación web Java | Spring Web / Java Web | [Historial técnico](03_DOCS/evidencias/GA7_220501096_AA3_EV01/README.md) |
| 02 | 2026-05-29 | Implementación de servicios REST | API Node | [Documentación API](02_BACK_END/01_API_NODE/docs) |
| 03 | 2026-05-29 | Validación de servicios HTTP | API Node / Postman | [Colección Postman](02_BACK_END/01_API_NODE/postman) |
| 04 | 2026-06-18 | Implementación de interfaz administrativa | Frontend React | [Frontend React](01_FRONT_END/01_REACT_AP07) |
| 05 | 2026-07-08 | Integración funcional | React / API / base de datos | [Historial técnico](03_DOCS/evidencias/GA8_220501096_AA1_EV01/README.md) |
| 06 | 2026-07-08 | Despliegue público integrado | Frontend / Backend | [Historial técnico](03_DOCS/evidencias/GA8_220501096_AA1_EV02/README.md) |


## Estructura principal

| Ruta | Propósito |
|---|---|
| [00_GUIA_TECNICA_PROYECTO](00_GUIA_TECNICA_PROYECTO) | Panel técnico de revisión del proyecto. |
| [01_FRONT_END/01_REACT_AP07](01_FRONT_END/01_REACT_AP07) | Interfaz administrativa React del proyecto. |
| [01_FRONT_END/02_INTERFAZ_BASE](01_FRONT_END/02_INTERFAZ_BASE) | Interfaz base HTML, CSS y JavaScript del proyecto. |
| [02_BACK_END/01_API_NODE](02_BACK_END/01_API_NODE) | API REST del proyecto MLBT. |
| [02_BACK_END/02_SPRING_WEB](02_BACK_END/02_SPRING_WEB) | Módulo web Spring Boot. |
| [02_BACK_END/03_JAVA_WEB](02_BACK_END/03_JAVA_WEB) | Módulo Java Web con JSP y Servlets. |
| [03_DOCS](03_DOCS) | Documentación técnica, estándares, validaciones y trazabilidad. |

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
- /usuarios -> /usuarios/resumen
- /inventario -> /inventario/resumen
- /ventas -> /ventas/pedido
- /usuarios/resumen
- /usuarios/crear
- /usuarios/listado
- /inventario/resumen
- /inventario/registrar
- /inventario/movimientos
- /inventario/tablas
- /ventas/pedido
- /ventas/historial
- /ventas/analisis

Credenciales de prueba:

- Usuario: adminapp
- Contraseña: AdminApp123*

Comandos principales de validación local:

    Set-Location ".\01_FRONT_END\01_REACT_AP07"
    pnpm install
    pnpm test:run
    pnpm lint
    pnpm build

## Validación automatizada

| Módulo | Comando | Alcance |
|---|---|---|
| Frontend React | pnpm test:run, pnpm lint, pnpm build | Reglas de interfaz, rutas protegidas, componentes y compilación. |
| API Node | pnpm test, pnpm check | Configuración segura, esquemas, middlewares y pruebas HTTP. |
| Spring Web | .\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\02_SPRING_WEB\pom.xml test | Pruebas de servicio con comportamiento real. |
| Java Web | .\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\03_JAVA_WEB\pom.xml test | Pruebas JUnit del servicio de autenticación del módulo Java Web. |

Comandos de desarrollo del frontend:

    Set-Location ".\01_FRONT_END\01_REACT_AP07"
    pnpm dev

## Integración y despliegue

La integración entre el Frontend React, la API Node y la base de datos ha sido validada tanto localmente como mediante los servicios publicados.

El historial detallado de integración y despliegue permanece disponible en [03_DOCS/evidencias](03_DOCS/evidencias/README.md).

## Pruebas de software

MLBT incorpora pruebas automatizadas y validaciones reproducibles sobre el Frontend React, la API Node y los módulos Java.

Los comandos principales se documentan en la sección de validación automatizada y el historial detallado permanece disponible en [03_DOCS/evidencias](03_DOCS/evidencias/README.md).
