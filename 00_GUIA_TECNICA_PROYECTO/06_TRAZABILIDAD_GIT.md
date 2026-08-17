# Historial y trazabilidad Git

## Rama principal

`Arawkano`

## Baseline vigente

- Release estable: `v1.1.0`.
- Commit base estable: `2d4e4acf4a2cafb6df09911abdbc94f3a3d591a5`.
- Hardening PROD-001: Node 24.x, pnpm 11.0.8 y CI alineado.
- Bundle Frontend validado en PROD-001: 246.35 kB minificado; 79.02 kB gzip.
- Los HEAD de candidatos no se fijan como estado permanente en esta guía; la trazabilidad autoritativa permanece en Git y GitHub Actions.

## Commits históricos relevantes del producto

| Área | Referencia | Descripción |
|---|---|---|
| Frontend | `9d5c9f4` | Lazy loading por rutas; optimización de bundle |
| Java Web | `41bca42` | Scripts `test.cmd` / `package.cmd` |
| Dependabot | `ec8cb04` | Agrupación de actualizaciones rutinarias |
| Documentación | `541d281`, `7603ecd` | Alineación documental y cierre técnico |

## Historial de mejoras técnicas

| Mejora | Commit | Resultado |
|---|---|---|
| Optimización bundle frontend | `9d5c9f4` | Entry 256.26 kB; warning >500 kB resuelto |
| Reproducibilidad Java Web | `41bca42` | Procedimiento local estandarizado |

## Control de cambios

- Commits descriptivos por área (`fix`, `chore`, `docs`)
- CI obligatorio en push y pull request
- Dependabot con bloqueo de majors incompatibles de Prisma

---

## Archivo histórico de trazabilidad

Los registros siguientes conservan identificadores originales para referencia histórica.

| Referencia histórica | Soporte | Resultado |
|---|---|---|
| GA9 — pruebas documentadas | [GA9 pruebas MLBT](../03_DOCS/evidencias/GA9_220501096_AA1_AA3_PRUEBAS_MLBT) | Ciclo de pruebas completado |
| GA7 AA3 EV01 | Merge PR #4 | Módulos web Java |
| GA7 AA5 EV03 | Merge PR #5 | API con Prisma |
| GA7 AA5 EV04 | Merge PR #6 | Validación Postman |

Cada registro histórico mantiene trazabilidad mediante commits y ramas de trabajo documentadas en su carpeta correspondiente.
