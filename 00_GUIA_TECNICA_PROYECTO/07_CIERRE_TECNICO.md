# Estado técnico del proyecto

Consolidación del estado actual de MLBT para revisión técnica, mantenimiento y preparación de release.

## Resumen

| Control | Estado |
|---|---|
| Runtime productivo principal | 137/137 (Frontend 74 + API 63) |
| Frontend lint/build | PASS |
| Bundle entry | 246.35 kB (gzip 79.02 kB) |
| Java Web WAR | Generado vía `package.cmd` |
| CI | Node 24 / pnpm 11.0.8; ejecución obligatoria por candidato |
| Dependabot | Activo |

## Validación por módulo

| Módulo | Pruebas | Notas |
|---|---|---|
| Frontend React | 74/74 | Lazy loading por rutas; lint/build PASS; sin warning >500 kB |
| API Node | 63/63 | `pnpm check` PASS; configuración productiva validada |
| Spring Web | 3/3 | Maven Wrapper |
| Java Web | 3/3 | `test.cmd` / `package.cmd` |

## Frontend React

- Ruta: `01_FRONT_END/01_REACT_AP07`
- Documentación: [08_FRONTEND_REACT_AP07.md](08_FRONTEND_REACT_AP07.md)
- Rutas: login, dashboard, usuarios, inventario, ventas

## Java Web

Procedimiento canónico:

```powershell
.\02_BACK_END\03_JAVA_WEB\test.cmd
.\02_BACK_END\03_JAVA_WEB\package.cmd
```

## CI y dependencias

[![CI](https://github.com/borikano/MLBT_Proyecto/actions/workflows/ci.yml/badge.svg?branch=Arawkano)](https://github.com/borikano/MLBT_Proyecto/actions/workflows/ci.yml)

- Workflow `CI`: frontend y API con Node 24 / pnpm 11.0.8; módulos Maven complementarios
- Dependabot semanal; majors de Prisma bloqueados (CH-001)

## Producción

| Servicio | Plataforma | Requisito |
|---|---|---|
| Frontend | Vercel | `VITE_API_URL` |
| API | Render | `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_ORIGIN` |
| Base de datos | Aiven MySQL 8.4 | Variable de entorno segura |

Las credenciales de validación se gestionan fuera del repositorio.

## Controles productivos cerrados

- Usuario runtime MySQL mlbt_runtime validado con mínimo privilegio sobre defaultdb, sin GRANT OPTION.
- Transporte TLS/SSL entre Render y Aiven confirmado sin publicar credenciales.
- Backup lógico pre-migración generado y verificado con manifiesto SHA-256.
- Migración productiva ejecutada, auditada y reconciliada mediante Prisma; migrate status y migrate diff quedaron limpios.
- Smoke funcional productivo PASS para login, dashboard, usuarios, inventario y ventas.
- Allowlist de Aiven restringida exclusivamente a los rangos de salida de Render; acceso administrativo temporal retirado.

Estos controles quedaron cerrados en PROD-001 Fase 5. El release estable v1.1.0 permanece inmutable; el candidato v1.1.1 requiere auditoría final, commit controlado, CI, push y smoke post-deploy.

## Backlog no bloqueante

| Item | Prioridad |
|---|---|
| Migración Prisma 7 | Media |
| Protección de rama GitHub | Baja |
| Paridad CI Maven con wrapper local | Baja |

## Conclusión

El release v1.1.0 permanece como baseline estable e inmutable. PROD-001 cerró los controles productivos de plataforma, base de datos y smoke funcional. El candidato v1.1.1 queda sujeto al gate final de commit, CI, push, despliegue asociado y smoke post-deploy.
