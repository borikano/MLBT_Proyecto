# Seguridad, pruebas y calidad del proyecto MLBT

Este documento define los criterios de calidad, seguridad, pruebas y accesibilidad que deben guiar la evolución del proyecto MLBT. Su propósito es mantener una base técnica coherente, auditable y preparada para revisión técnica, mantenimiento y endurecimiento progresivo.

## Alcance

| Bloque | Alcance de revisión |
|---|---|
| Front End React | Pruebas unitarias, pruebas de componentes, accesibilidad, rutas protegidas y uso consistente de shadcn/ui. |
| Front End base | Revisión de credenciales controladas, almacenamiento local, formularios y documentación de alcance y uso controlado. |
| API Node | Validación de entrada, autenticación, autorización, CORS, variables de entorno, errores y pruebas automatizadas. |
| Spring Web | Configuración por ambiente, pruebas reales, validación y separación de responsabilidades. |
| Java Web | Credenciales controladas, formularios, sesiones, servicios y documentación de alcance. |
| Documentación | Trazabilidad entre requisitos, riesgos, pruebas, validación y comandos reproducibles. |

## Referencias normativas y buenas prácticas

| Referencia | Aplicación en MLBT |
|---|---|
| ISO/IEC 25010 | Calidad del producto: seguridad, mantenibilidad, usabilidad, confiabilidad y compatibilidad. |
| ISO/IEC/IEEE 29119 | Planificación, diseño, ejecución, evidencias y reporte de pruebas. |
| ISO/IEC 27001 e ISO/IEC 27002 | Gestión de secretos, control de accesos, configuración segura y trazabilidad. |
| OWASP Top 10 | Prevención de fallos comunes en autenticación, autorización, validación y configuración. |
| OWASP ASVS básico | Controles verificables para autenticación, sesiones, validación y manejo de errores. |
| WCAG 2.2 AA | Accesibilidad en formularios, mensajes de error, foco visible, contraste y navegación por teclado. |
| Twelve-Factor App | Configuración por entorno, dependencias declaradas, logs, procesos y despliegue reproducible. |
| shadcn/ui | Composición de componentes accesibles, reutilizables y consistentes con el sistema visual. |

## Criterios de calidad ISO/IEC 25010

| Característica | Criterio aplicable |
|---|---|
| Seguridad | Las rutas protegidas deben exigir autenticación y roles cuando corresponda. Los secretos no se versionan. |
| Confiabilidad | Las pruebas unitarias no deben depender de red externa ni servicios públicos. |
| Mantenibilidad | La lógica se separa por responsabilidad: rutas, controladores, servicios, esquemas, componentes y documentación. |
| Usabilidad | Los formularios deben comunicar errores de forma clara y accesible. |
| Compatibilidad | La configuración local y de despliegue debe estar documentada mediante variables de entorno. |
| Portabilidad | Los comandos de instalación, prueba y construcción deben ser reproducibles. |

## Criterios de seguridad OWASP

| Control | Criterio de aceptación |
|---|---|
| Autenticación | Un usuario sin token o con token inválido debe recibir respuesta 401. |
| Autorización | Un usuario autenticado sin rol suficiente debe recibir respuesta 403. |
| Validación | Toda entrada HTTP debe validarse antes de llegar al servicio de negocio. |
| Gestión de secretos | `.env` y credenciales reales no deben versionarse. `.env.example` solo debe contener plantillas seguras. |
| CORS | En producción debe existir un origen explícito permitido. El origen abierto solo se acepta en desarrollo. |
| Errores | Los errores de producción no deben exponer trazas internas ni detalles sensibles. |
| Sesión | El uso de `sessionStorage` con JWT debe documentarse como decisión técnica y riesgo frente a XSS. |

## Controles consolidados INT-005

INT-005 formaliza los controles de sesiones, revocación y auditoría sensible de la API Node.

| Control | Implementación validada |
|---|---|
| Sesiones versionadas | El JWT incorpora `sessionVersion` y el middleware contrasta la versión del token con el usuario vigente. |
| Revocación | Cambios efectivos de rol o estado incrementan `sessionVersion` y revocan tokens históricos. |
| Usuario vigente | La autorización usa el usuario actual recuperado desde base de datos y exige estado `ACTIVO`. |
| 401 / 403 | Sesión inválida o revocada responde 401; rol insuficiente responde 403. |
| Auditoría de autenticación | Login exitoso/fallido y sesiones rechazadas generan eventos best-effort. |
| Auditoría de autorización | Los accesos 403 generan `permission_denied` sin alterar la semántica HTTP. |
| Auditoría sensible | Cambios de usuario, ajustes de inventario, cancelaciones y cambios de precio/receta generan eventos controlados. |
| Atomicidad | Las operaciones sensibles que lo requieren registran auditoría con el mismo cliente transaccional de Prisma. |
| Metadata segura | Se aplica whitelist; no se persisten contraseñas, hashes, JWT, Authorization, cookies ni cuerpos completos. |
| Trazabilidad | `requestId` permite correlacionar eventos y solicitudes cuando está disponible. |

La evidencia de cierre se consolida en [INT-005 - cierre de sesiones, auditoría y gobierno](int-005-cierre-sesiones-auditoria-gobierno.md).

## Criterios de pruebas ISO/IEC/IEEE 29119

| Tipo de prueba | Criterio |
|---|---|
| Unitarias | Validan lógica pura, esquemas, middlewares y servicios sin red externa. |
| Componentes React | Validan comportamiento visible, accesibilidad y estados de interacción. |
| Integración ligera | Validan contratos HTTP internos sin depender de servicios públicos. |
| Seguridad | Cubren token ausente, token inválido, usuario inactivo, rol insuficiente y payload inválido. |
| Regresión | Cada corrección relevante debe quedar cubierta por una prueba cuando sea viable. |
| Evidencia | Los comandos ejecutados y resultados deben documentarse en la guía técnica o README del módulo. |

## Criterios de accesibilidad WCAG 2.2 AA

| Elemento | Criterio |
|---|---|
| Formularios | Cada campo debe tener etiqueta asociada y mensajes de error comprensibles. |
| Errores | Los errores visibles deben poder anunciarse mediante patrones accesibles como `aria-live`. |
| Foco | Los controles interactivos deben conservar foco visible y navegación por teclado. |
| Tablas | Las tablas deben tener encabezados claros y estado vacío comprensible. |
| Contraste | Los estados visuales deben mantener contraste suficiente en texto, botones y alertas. |

## Reglas para React y shadcn/ui

- Los componentes base de `src/components/ui` deben respetarse como fuente del sistema visual.
- Las personalizaciones deben hacerse por composición, propiedades y clases controladas, no duplicando componentes sin necesidad.
- Las pruebas deben consultar la interfaz por rol, etiqueta o texto visible antes que por clases CSS.
- Los formularios deben preferir componentes accesibles y mensajes de error consistentes.
- Las credenciales de prueba no deben mostrarse como contraseña sugerida en campos públicos.

## Reglas para credenciales controladas

- Las credenciales de prueba pueden documentarse cuando sean necesarias para evidencias.
- Deben identificarse como datos ficticios o controlados.
- No deben confundirse con secretos reales de producción.
- No deben quedar como valor por defecto inseguro en entornos productivos.
- Si aparecen en módulos históricos, el README debe aclarar que pertenecen a datos ficticios de prueba o a una demo controlada.

## Matriz inicial de riesgos

| Riesgo | Impacto | Mitigación prevista |
|---|---|---|
| `JWT_SECRET` por defecto en producción | Alto | Exigir variable obligatoria cuando `NODE_ENV=production`. |
| CORS abierto en producción | Alto | Requerir `FRONTEND_ORIGIN` explícito en producción. |
| Pruebas dependientes de red externa | Medio | Reemplazar por pruebas unitarias o integración local. |
| Credenciales visibles en UI | Medio | Mantenerlas solo en documentación controlada o datos de evidencia. |
| Pruebas triviales sin valor real | Medio | Sustituir por pruebas de reglas, controladores o servicios. |
| Documentación desactualizada | Medio | Actualizar README y guías técnicas al cerrar cada fase. |
| Falta de CI | Medio | Agregar GitHub Actions con lint, test, build y check. |

## Criterio de cierre por fase

Cada fase debe cerrarse con:

1. Cambios pequeños y revisables.
2. Pruebas o validación apropiada para el tipo de cambio.
3. Documentación actualizada cuando cambie el comportamiento o los comandos.
4. Revisión de `git status` y `git diff` antes del commit.
5. Commit local con asunto claro, solo cuando la fase esté finalizada.

## Cierre técnico consolidado

| Componente | Estado de cierre | Observación |
|---|---|---|
| Front End React | Aprobado | Pruebas, lint y build validados. |
| API Node | Aprobado | Pruebas, configuración segura y endpoints públicos validados. |
| Spring Web | Aprobado | Pruebas Maven ejecutadas correctamente. |
| Java Web | Aprobado | Pruebas JUnit ejecutadas correctamente. |
| CI/CD | Aprobado | GitHub Actions activo y obligatorio como referencia de calidad. |
| Dependabot | Controlado | Actualizaciones activas con bloqueo de upgrades mayores de Prisma. |
| Documentación | Aprobada | README, guía técnica, seguridad, pruebas y matriz QA actualizados. |

### Riesgos residuales aceptados

| Riesgo | Nivel | Tratamiento |
|---|---|---|
| Migración a Prisma 7 | Medio | Se documenta como tarea futura por cambio mayor incompatible con el datasource actual. |
| Bundle principal de Vite mayor a 500 KB | — | **Cerrado (H-001)** — lazy loading por rutas; entry 256.26 kB verificado. |
| Dependencia de servicios externos públicos | Bajo | La verificación productiva depende de Render, Vercel y Aiven; las credenciales reales permanecen fuera del repositorio. |

### Decisión sobre Prisma

Prisma se mantiene en `6.19.3` porque la aplicación y el esquema actual son compatibles con esa línea. El salto a Prisma 7 requiere cambios explícitos en la configuración, validación de migraciones y prueba de conexión real. Por esta razón, Dependabot no debe fusionar upgrades mayores de `prisma` ni `@prisma/client` hasta que exista una fase técnica dedicada.
