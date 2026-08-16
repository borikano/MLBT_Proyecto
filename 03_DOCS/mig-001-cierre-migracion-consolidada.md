# MIG-001 - Cierre de migracion consolidada

Fecha de cierre: 2026-08-15 19:58:32 -05:00

Estado: CERRADA

## Objetivo

Consolidar en una migracion Prisma reproducible la evolucion acumulada del modelo de datos de MLBT correspondiente a INT-001, INT-002, INT-003, INT-004 e INT-005, preservando la informacion historica existente y dejando la base real alineada con schema.prisma.

## Migracion canonica

Nombre: 20260815193754_consolidacion_int001_int005

SHA-256 definitivo: 2776FCAAE0662CB5CCD3428D85B26EBB3DAF0D1C8EFF1BABC074C51E5A7C805A

La migracion definitiva incorpora ALTER TABLE sobre usuarios, productos_inventario y ventas; crea movimientos_inventario, productos_venta, recetas_producto_venta, venta_detalles y audit_events; incorpora indices y foreign keys; y conserva compatibilidad con los registros historicos de MLBT v1.0.

## Estado de la base de datos

| Validacion | Resultado |
|---|---|
| Usuarios historicos | 4 preservados |
| Productos de inventario historicos | 4 preservados |
| Ventas historicas | 2 preservadas |
| Prisma migrate status | Limpio |
| Prisma validate | Correcto |
| Prisma diff | Sin DDL residual |
| Migraciones FAILED activas | 0 |
| Foreign keys finales | 9 |

## Incidente P3018 y recuperacion

Durante la primera aplicacion real, Prisma alcanzo la sentencia final de redefinicion del indice de ventas y MariaDB respondio con error 1091 al intentar eliminar ventas_usuarioId_fkey como indice fisico.

El diagnostico posterior demostro que el esquema objetivo ya habia sido alcanzado, la foreign key permanecia intacta y Prisma diff era vacio. No se restauro la base ni se repitio la migracion a ciegas.

La sentencia fue corregida de forma tolerante mediante DROP INDEX IF EXISTS. La version corregida fue probada tanto sobre un clon del backup real v1.0 como sobre una base completamente vacia. Ambos escenarios terminaron con migrate status limpio y Prisma diff vacio.

Checksum del intento original: CA362E11FF9CAE0F6268F0BF4670395774E54C6C6E00AB6F34D2F5B14D3DC842

Checksum definitivo corregido: 2776FCAAE0662CB5CCD3428D85B26EBB3DAF0D1C8EFF1BABC074C51E5A7C805A

El intento fallido permanece en _prisma_migrations exclusivamente como evidencia historica resuelta. No existe ningun FAILED activo. La version corregida esta registrada como aplicada.

## Backup

Backup definitivo pre-migracion: E:\Dev\04_Auditorias\01_Backups\MLBT\mig-001-fase3b-pre-migracion-20260815-193910\mlbt-pre-migracion.sql

SHA-256 backup: 5ED08C9F26B6CFF4F3EF02049C59025ACE281F603921B722AE1A3C5DD0524057

El backup fue restaurado satisfactoriamente en una base temporal antes de la aplicacion real.

## Regresion post-migracion

| Componente | Resultado |
|---|---|
| Backend API | 63 de 63 tests |
| API check | PASS |
| Session security | 5 de 5 |
| Sensitive audit | 4 de 4 |
| Frontend React | 30 de 30 tests |
| ESLint | PASS |
| Vite build | PASS |
| Prisma Client sobre BD real | PASS |

Los tres eventos generados durante la regresion en audit_events correspondieron a auth/session_rejected con resultado DENIED. Se verifico ausencia de password, passwordHash, token, JWT, Authorization, cookies, secretos y DATABASE_URL en metadata.

## Evidencias operacionales

- E:\Dev\04_Auditorias\03_Informes\Resul_MLBT\mig-001-fase2b-ensayo-clon-20260815-193520.md
- E:\Dev\04_Auditorias\03_Informes\Resul_MLBT\mig-001-fase3a-formalizacion-migracion-20260815-193754.md
- E:\Dev\04_Auditorias\03_Informes\Resul_MLBT\mig-001-fase3b-backup-definitivo-20260815-193910.md
- E:\Dev\04_Auditorias\03_Informes\Resul_MLBT\mig-001-fase3c1-diagnostico-post-fallo-20260815-194304.md
- E:\Dev\04_Auditorias\03_Informes\Resul_MLBT\mig-001-fase3c2-correccion-ensayo-20260815-194753.md
- E:\Dev\04_Auditorias\03_Informes\Resul_MLBT\mig-001-fase3c3-resolve-historial-20260815-194941.md
- E:\Dev\04_Auditorias\03_Informes\Resul_MLBT\mig-001-fase4-validacion-integral-post-migracion-20260815-195221.md
- E:\Dev\04_Auditorias\03_Informes\Resul_MLBT\mig-001-fase4-1-diagnostico-hallazgos-20260815-195449.md

## Dictamen

MIG-001 queda formalmente CERRADA.

La base real esta alineada con el schema actual, el historial Prisma esta reconciliado, la migracion es reproducible desde cero y desde MLBT v1.0, los datos historicos fueron preservados y la regresion backend/frontend fue satisfactoria dentro del alcance validado.

La integracion funcional autenticada React hacia API se valida separadamente en INT-006.