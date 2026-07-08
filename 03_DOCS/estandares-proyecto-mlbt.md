# Estándares del proyecto MLBT

Este documento complementa el README principal y define los criterios de organización, documentación, desarrollo y continuidad del proyecto MLBT.

## Regla de mantenimiento

Cuando se haga un cambio relevante en el proyecto, se deben revisar:

1. README.md
2. 03_DOCS/README.md
3. 03_DOCS/estandares-proyecto-mlbt.md
4. El README del módulo afectado

## Organización general

| Bloque | Propósito |
|---|---|
| 00_GUIA_TECNICA_PROYECTO | Panel técnico de revisión. |
| 01_FRONT_END | Interfaces y recursos de cliente. |
| 02_BACK_END | Servicios, API y módulos Java. |
| 03_DOCS | Documentación, evidencias y trazabilidad. |

## Separación por responsabilidad

- HTML, JSP y Thymeleaf deben concentrarse en vistas y estructura.
- CSS debe concentrarse en presentación visual.
- JavaScript debe concentrarse en comportamiento frontend, eventos y consumo de servicios.
- React debe organizarse por páginas, componentes, contexto, rutas y datos.
- Node.js debe organizarse por rutas, controladores, servicios, middlewares, esquemas y configuración.
- Java debe organizarse por controladores, modelos, repositorios, servicios y configuración.
- La documentación técnica debe permanecer en 03_DOCS o en la carpeta docs del módulo que corresponda.

## Estándares Front End React

- Mantener 01_FRONT_END/01_REACT_AP07 como módulo independiente.
- Conservar páginas en src/pages.
- Conservar componentes reutilizables en src/components.
- Conservar rutas en src/routes.
- Conservar estado compartido en src/context.
- Validar cambios con pnpm lint y pnpm build.
- No versionar node_modules ni dist.

## Estándares de interfaz base

- Mantener la interfaz base en 01_FRONT_END/02_INTERFAZ_BASE.
- Separar pages, css, js y assets.
- No usar eventos inline en HTML.
- Preferir addEventListener para comportamiento interactivo.
- Mantener formularios y navegación reutilizable centralizados cuando aplique.
- Si una lógica se repite, convertirla en helper, servicio o componente.

## Estándares API Node

- Mantener la API en 02_BACK_END/01_API_NODE.
- Separar rutas, controladores, servicios, middlewares, esquemas y configuración.
- Proteger variables locales mediante .env ignorado por Git.
- Mantener .env.example como plantilla segura.
- Documentar endpoints, base de datos, datos iniciales y validaciones en docs.
- Validar la API con pruebas de terminal y Postman cuando corresponda.

## Estándares Spring Web

- Mantener el módulo en 02_BACK_END/02_SPRING_WEB.
- Separar controller, model, repository, service y config.
- Mantener templates Thymeleaf en src/main/resources/templates.
- Mantener CSS e imágenes en src/main/resources/static.
- Documentar ejecución, compilación y base de datos en el README del módulo.

## Estándares Java Web

- Mantener el módulo en 02_BACK_END/03_JAVA_WEB.
- Separar Servlets, modelos, repositorio temporal y servicios.
- Mantener JSP en WEB-INF/jsp.
- Mantener index.jsp como punto de entrada, sin lógica sensible.
- Documentar formularios GET y POST cuando aplique.

## Estándares de documentación

- Todo bloque principal debe tener README cuando mejore la navegación.
- Las evidencias deben conservarse por código de entrega.
- Los documentos históricos pueden conservar contexto, pero deben indicar el estado consolidado actual cuando el proyecto evolucione.
- Las rutas escritas como texto plano deben mantenerse coherentes con la estructura vigente.
- Las rutas Markdown deben validarse antes de cada commit documental.
- No mezclar evidencias diferentes en una misma carpeta.

## Estándares de Git

- Arawkano representa la rama estable del proyecto.
- principal representa integración y trabajo controlado.
- Todo cambio debe quedar probado, documentado y respaldado antes de llegar a la rama estable.
- No usar push --force sobre ramas estables.
- Los commits deben explicar nombre, asunto y motivo cuando el cambio sea relevante.

## Seguridad y datos de prueba

- No publicar credenciales reales.
- Usar datos ficticios para evidencias.
- Usar example.com cuando se requieran correos de ejemplo.
- No versionar .env, node_modules, dist, target ni artefactos temporales.
- Documentar únicamente credenciales de prueba controladas.

## Criterio de continuidad

La evolución del proyecto debe realizarse de forma incremental, manteniendo separación por tecnología, trazabilidad documental, validación funcional y claridad para revisión académica.
