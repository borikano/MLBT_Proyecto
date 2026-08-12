# Validación y pruebas

Documentación de validación técnica, pruebas automatizadas y comandos reproducibles del proyecto MLBT.

## Resultados actuales

| Módulo | Pruebas | Controles adicionales |
|---|---|---|
| Frontend React | 15/15 | ESLint, build de producción |
| API Node | 23/23 | `pnpm check` |
| Spring Web | 3/3 | Maven Wrapper |
| Java Web | 3/3 | `test.cmd`, `package.cmd` |
| **Total** | **44/44** | CI GitHub Actions |

## Comandos reproducibles

| Módulo | Comando |
|---|---|
| Frontend React | `pnpm test:run`, `pnpm lint`, `pnpm build` |
| API Node | `pnpm test`, `pnpm check` |
| Spring Web | `.\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\02_SPRING_WEB\pom.xml test` |
| Java Web | `.\02_BACK_END\03_JAVA_WEB\test.cmd`, `.\02_BACK_END\03_JAVA_WEB\package.cmd` |

## Documentación por módulo

- [Frontend React](../01_FRONT_END/01_REACT_AP07/README.md)
- [Guía frontend AP07](08_FRONTEND_REACT_AP07.md)
- [API Node](../02_BACK_END/01_API_NODE/README.md)
- [Seguridad y calidad](../03_DOCS/seguridad-pruebas-calidad.md)

## Criterios de calidad (referencia)

| Referencia | Uso |
|---|---|
| ISO/IEC 25010 | Modelo de referencia para calidad y mantenibilidad |
| ISO/IEC/IEEE 29119 | Diseño y trazabilidad de pruebas |
| OWASP Top 10 / ASVS básico | Controles de seguridad aplicados |
| WCAG 2.2 AA | Accesibilidad en formularios y navegación |

## Matriz QA

| Módulo | Riesgo principal | Validación | Estado |
|---|---|---|---|
| Frontend React | Rutas protegidas y reglas de negocio | Vitest 15/15, build | Fortalecido |
| API Node | Token, roles, configuración | 23/23 tests + check | Fortalecido |
| Interfaz base | Prototipo histórico con datos embebidos | Documentado como referencia | Controlado |
| Spring Web | Cobertura funcional insuficiente | Pruebas de servicio 3/3 | Fortalecido |
| Java Web | Procedimiento local inconsistente | Scripts + JUnit 3/3 | Fortalecido |
| Documentación | Comandos desactualizados | README y guías alineados | Fortalecido |

## Seguridad en validación

- `.env` no se versiona
- Credenciales de validación fuera del repositorio
- Datos de prueba anonimizados en documentación pública

## Mejoras técnicas recientes

| Mejora | Detalle |
|---|---|
| Bundle frontend | Lazy loading; entry 256.26 kB; sin warning >500 kB |
| Java Web | `test.cmd` / `package.cmd`; Maven global no requerido localmente |

---

## Archivo histórico de validaciones

Los registros históricos conservan sus identificadores oficiales sin alteración. Consulte [03_DOCS/evidencias](../03_DOCS/evidencias/README.md).

| Referencia histórica | Ruta |
|---|---|
| Validaciones web Java | [GA7_220501096_AA3_EV01](../03_DOCS/evidencias/GA7_220501096_AA3_EV01) |
| API y base de datos | [GA7_220501096_AA5_EV03](../03_DOCS/evidencias/GA7_220501096_AA5_EV03) |
| Pruebas Postman | [GA7_220501096_AA5_EV04](../03_DOCS/evidencias/GA7_220501096_AA5_EV04) |
| Integración React/API | [GA8_220501096_AA1_EV01](../03_DOCS/evidencias/GA8_220501096_AA1_EV01) |
| Despliegue integrado | [GA8_220501096_AA1_EV02](../03_DOCS/evidencias/GA8_220501096_AA1_EV02) |
| Ciclo de pruebas documentado | [GA9 pruebas MLBT](../03_DOCS/evidencias/GA9_220501096_AA1_AA3_PRUEBAS_MLBT) |

Commits recientes de mejora: `9d5c9f4` (bundle), `41bca42` (Java Web scripts).
