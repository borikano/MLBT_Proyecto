# INT-005 - Cierre de sesiones, auditoría y gobierno de seguridad

## Estado

**CERRADO**

INT-005 consolida el gobierno de sesiones, la revocación controlada y la auditoría de operaciones sensibles del proyecto MLBT.

## Alcance

- JWT y `sessionVersion`.
- validación del usuario vigente desde base de datos.
- revocación de sesiones por cambios efectivos de rol o estado.
- RBAC y semántica 401/403.
- auditoría de login, sesiones rechazadas y accesos denegados.
- auditoría sensible de usuarios, inventario, ventas y catálogo.
- motivos operativos para acciones sensibles.
- metadata mediante whitelist.
- atomicidad entre operación de negocio y evento de auditoría cuando corresponde.

## Fases

| Fase | Alcance | Estado |
|---|---|---|
| Fase 0 | Auditoría inicial de sesiones y gobierno | Cerrada |
| Fase 1 | Diseño técnico | Cerrada |
| Fase 2A | Infraestructura de auditoría y sesión | Cerrada |
| Fase 2B | JWT, `sessionVersion` y revocación | Cerrada |
| Fase 2C | Auditoría sensible, motivos y 403 | Cerrada |
| Fase 3 | Validación integrada | Cerrada |

## Evidencia de validación

La auditoría adversarial final pre-cierre terminó sin hallazgos:

```text
PASS: 23
WARN: 0
FAIL: 0
```

Resultados funcionales consolidados:

| Componente | Resultado |
|---|---|
| Frontend React | 30/30 pruebas; ESLint PASS; build PASS |
| API Node | 63/63 pruebas; check PASS; Prisma validate PASS |
| Seguridad de sesión INT-005 | 5/5 pruebas específicas |
| Auditoría sensible INT-005 | 4/4 pruebas específicas |
| Git | `git diff --check` PASS; workspace preservado |

## Contrato de sesión

1. El login firma un JWT cuyo payload incluye `sessionVersion`.
2. `authRequired` verifica el JWT.
3. Se consulta el usuario vigente en base de datos.
4. El usuario debe permanecer `ACTIVO`.
5. `payload.sessionVersion` debe coincidir con `usuario.sessionVersion`.
6. Un token histórico o revocado se rechaza con 401.

Los cambios efectivos de rol o estado incrementan la versión de sesión. Cambios no sensibles no revocan sesiones.

## Auditoría sensible

Se validaron eventos para:

- login exitoso y fallido;
- sesión rechazada;
- permiso denegado;
- cambios sensibles de usuario;
- retiro de usuario;
- ajuste manual de inventario;
- cancelación de venta;
- cambios efectivos de precio;
- cambios efectivos de receta.

La metadata utiliza whitelist y excluye secretos como contraseñas, hashes, JWT, tokens, encabezados Authorization, cookies y cuerpos HTTP completos.

## Evidencia operativa externa

Los informes timestamped de ejecución se conservan fuera del repositorio en la estructura de auditorías del entorno de desarrollo. La evidencia final usada para este cierre es:

```text
auditoria-final-adversarial-pre-cierre-int005-v2-20260814-201250.md
```

## Exclusiones deliberadas

Este cierre no ejecuta migraciones Prisma, `prisma db push`, cambios sobre datos reales, `git commit` ni `git push`.

La integración completa React <-> API de negocio pertenece a INT-006.

## Dictamen

**INT-005 queda CERRADO técnica y documentalmente.**

No se detectaron errores ni regresiones dentro del alcance validado en el estado local evaluado.

## Continuidad

El siguiente bloque de trabajo es la migración consolidada controlada, seguida por validación post-migración y posteriormente INT-006.
