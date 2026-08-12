# Evidencias y pruebas

## Evidencias disponibles

| Orden | Evidencia | Ruta principal | Tipo de evidencia |
|---|---|---|---|
| 01 | GA7-220501096-AA3-EV01 | [../03_DOCS/evidencias/GA7_220501096_AA3_EV01](../03_DOCS/evidencias/GA7_220501096_AA3_EV01) | Documentación técnica y validaciones web. |
| 02 | GA7-220501096-AA5-EV03 | [../03_DOCS/evidencias/GA7_220501096_AA5_EV03](../03_DOCS/evidencias/GA7_220501096_AA5_EV03) y [../02_BACK_END/01_API_NODE/docs](../02_BACK_END/01_API_NODE/docs) | API, Prisma, base de datos y rutas HTTP. |
| 03 | GA7-220501096-AA5-EV04 | [../03_DOCS/evidencias/GA7_220501096_AA5_EV04](../03_DOCS/evidencias/GA7_220501096_AA5_EV04) y [../02_BACK_END/01_API_NODE/postman](../02_BACK_END/01_API_NODE/postman) | Postman, capturas y resultados. |
| 04 | GA7-220501096-AA4-EV03 | [../01_FRONT_END/01_REACT_AP07](../01_FRONT_END/01_REACT_AP07) y [08_FRONTEND_REACT_AP07.md](08_FRONTEND_REACT_AP07.md) | Componente de interfaz React del proyecto MLBT. |

## Documentos de interfaz React AP07

- [../01_FRONT_END/01_REACT_AP07/README.md](../01_FRONT_END/01_REACT_AP07/README.md)
- [08_FRONTEND_REACT_AP07.md](08_FRONTEND_REACT_AP07.md)

## Seguridad de evidencias

- .env no se versiona.
- node_modules no se versiona.
- Las evidencias usan datos de prueba.
- La interfaz React usa datos de prueba para validación local.
- Las credenciales documentadas son datos controlados de prueba, no secretos reales.
- Los módulos históricos o de referencia deben indicar su alcance cuando incluyan credenciales embebidas.

## Criterios actuales de calidad y pruebas

La evolución técnica del proyecto se apoya en los criterios documentados en [Seguridad, pruebas y calidad](../03_DOCS/seguridad-pruebas-calidad.md).

| Referencia | Uso en el proyecto |
|---|---|
| ISO/IEC 25010 | Evaluar calidad, seguridad, mantenibilidad, usabilidad y confiabilidad. |
| ISO/IEC/IEEE 29119 | Diseñar, ejecutar y documentar pruebas con trazabilidad. |
| OWASP Top 10 / ASVS básico | Revisar autenticación, autorización, validación, errores y configuración. |
| WCAG 2.2 AA | Revisar accesibilidad en formularios, foco, contraste y mensajes de error. |

## Matriz de trazabilidad QA

| Módulo | Riesgo principal | Prueba o evidencia esperada | Estado |
|---|---|---|---|
| Front End React | Fallos en reglas de ventas o rutas protegidas | Pruebas Vitest y Testing Library | Fortalecido |
| API Node | Token inválido, rol insuficiente o configuración insegura | Pruebas unitarias, pruebas HTTP y check de entorno | Fortalecido |
| Front End base | Credenciales controladas en código histórico | Documentación de alcance y uso controlado | Fortalecido |
| Spring Web | Pruebas triviales sin validación funcional | Pruebas reales de servicios | Fortalecido |
| Java Web | Credenciales embebidas en módulo histórico de referencia | Pruebas JUnit y documentación de alcance | Fortalecido |
| Documentación | Comandos o evidencias desactualizadas | Actualización de README, guías y matriz QA | Fortalecido |

## Comandos reproducibles vigentes

| Módulo | Comando |
|---|---|
| Front End React | pnpm test:run, pnpm lint, pnpm build |
| API Node | pnpm test, pnpm check |
| Spring Web | .\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\02_SPRING_WEB\pom.xml test |
| Java Web | .\02_BACK_END\03_JAVA_WEB\test.cmd |

<!-- HISTORIAL_PRUEBAS_INICIO -->
## Historial de pruebas de software

| Evidencia | Estado | Soporte público | Entregable externo |
|---|---|---|---|
| GA9-220501096-AA1-EV01 | Completada | Pruebas Vitest en frontend React | PDF |
| GA9-220501096-AA1-EV02 | Completada | Plan documentado y trazabilidad pública | PDF |
| GA9-220501096-AA2-EV01 | Completada | Casos y ambiente resumidos | Excel |
| GA9-220501096-AA3-EV01 | Completada | Ejecución con 10 casos aprobados | PDF + video |
| GA9-220501096-AA3-EV02 | Completada | Reporte consolidado de resultados | PDF + Excel actualizado |

Índice público GA9: [../03_DOCS/evidencias/GA9_220501096_AA1_AA3_PRUEBAS_MLBT](../03_DOCS/evidencias/GA9_220501096_AA1_AA3_PRUEBAS_MLBT/README.md).
<!-- HISTORIAL_PRUEBAS_FIN -->
