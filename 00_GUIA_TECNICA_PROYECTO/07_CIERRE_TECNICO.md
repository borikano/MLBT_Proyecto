# Estado técnico del proyecto

Consolidación del estado actual de MLBT para revisión técnica, mantenimiento y preparación de release.

## Resumen

| Control | Estado |
|---|---|
| Pruebas automatizadas | 44/44 |
| Frontend lint/build | PASS |
| Bundle entry | 256.26 kB (gzip 80.77 kB) |
| Java Web WAR | Generado vía `package.cmd` |
| CI (HEAD `41bca42`) | Aprobado |
| Dependabot | Activo |

## Validación por módulo

| Módulo | Pruebas | Notas |
|---|---|---|
| Frontend React | 15/15 | Lazy loading por rutas; sin warning >500 kB |
| API Node | 23/23 | Check de configuración OK |
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

- Workflow `CI`: frontend, API Node, Maven
- Dependabot semanal; majors de Prisma bloqueados (CH-001)

## Producción

| Servicio | Plataforma | Requisito |
|---|---|---|
| Frontend | Vercel | `VITE_API_URL` |
| API | Render | `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_ORIGIN` |
| Base de datos | Aiven MySQL 8.4 | Variable de entorno segura |

Las credenciales de validación se gestionan fuera del repositorio.

## Pendientes no bloqueantes

| Item | Prioridad |
|---|---|
| Migración Prisma 7 | Media |
| Protección de rama GitHub | Baja |
| Paridad CI Maven con wrapper local | Baja |

## Conclusión

Proyecto técnicamente consolidado y listo para verificación final y preparación de release `v1.0.0` posterior a la validación completa.
