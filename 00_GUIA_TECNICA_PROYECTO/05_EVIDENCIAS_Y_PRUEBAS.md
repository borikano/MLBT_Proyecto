# Validación y pruebas

Documentación de validación técnica, pruebas automatizadas y comandos reproducibles del proyecto MLBT.

## Resultados actuales

| Módulo | Pruebas | Controles adicionales |
|---|---|---|
| Frontend React | 74/74 | ESLint, build de producción |
| API Node | 63/63 | `pnpm check`, Prisma validate |
| Spring Web | 3/3 (registro histórico) | Maven Wrapper |
| Java Web | 3/3 (registro histórico) | `test.cmd`, `package.cmd` |
| **Runtime productivo principal** | **137/137** | Frontend + API; CI GitHub Actions + validación local de cierre |

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

## Validación consolidada INT-005 (registro histórico)

> Los conteos de esta subsección pertenecen al cierre INT-005 y se preservan por trazabilidad. El baseline vigente de PROD-001 está en **Resultados actuales**.

El cierre de sesiones, revocación y auditoría sensible fue validado mediante pruebas específicas y regresión completa.

| Control | Resultado |
|---|---|
| Frontend React | 30/30 pruebas, lint PASS, build PASS |
| API Node | 63/63 pruebas, check PASS, Prisma validate PASS |
| Seguridad de sesión | 5/5 pruebas específicas |
| Auditoría sensible | 4/4 pruebas específicas |
| Auditoría adversarial final | 23 PASS, 0 WARN, 0 FAIL |

Documento canónico: [INT-005 - cierre de sesiones, auditoría y gobierno](../03_DOCS/int-005-cierre-sesiones-auditoria-gobierno.md).

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
| Frontend React | Rutas protegidas, RBAC y reglas de negocio | Vitest 74/74, lint y build | Fortalecido |
| API Node | Token, roles, sesiones, auditoría y configuración | 63/63 tests + check + Prisma validate | Fortalecido |
| Interfaz base | Prototipo histórico con datos embebidos | Documentado como referencia | Controlado |
| Spring Web | Cobertura funcional insuficiente | Pruebas de servicio 3/3 | Fortalecido |
| Java Web | Procedimiento local inconsistente | Scripts + JUnit 3/3 | Fortalecido |
| Documentación | Comandos desactualizados | README y guías alineados | Fortalecido |

## Seguridad en validación

- `.env` no se versiona
- Credenciales de validación fuera del repositorio
- Datos de prueba anonimizados en documentación pública

## Historial de mejoras técnicas

| Mejora | Detalle |
|---|---|
| Bundle frontend | Lazy loading; baseline actual 246.35 kB (gzip 79.02 kB); sin warning >500 kB |
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

Referencias históricas de mejora: `9d5c9f4` (bundle H-001), `41bca42` (Java Web scripts).
