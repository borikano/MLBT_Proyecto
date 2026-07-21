# GA9-220501096 - Pruebas de software MLBT

Esta carpeta consolida la documentacion publica del repositorio asociada al ciclo GA9 de pruebas de software del proyecto MLBT - Maria La Bonita Taqueria.

Los entregables formales PDF, video y Excel se conservan fuera del repositorio. En GitHub se documenta un resumen tecnico, los comandos reproducibles, la trazabilidad publica y los enlaces internos de soporte.

## Evidencias GA9

| Evidencia | Nombre | Estado | Soporte publico en repositorio | Entregable externo |
|---|---|---|---|---|
| GA9-220501096-AA1-EV01 | Taller sobre codificacion de modulos del software | Completada | Pruebas Vitest y documentacion frontend | PDF |
| GA9-220501096-AA1-EV02 | Plan de pruebas de software | Completada | Resumen tecnico de estrategia y alcance | PDF |
| GA9-220501096-AA2-EV01 | Casos y ambiente de pruebas | Completada | Matriz publica de trazabilidad | Excel |
| GA9-220501096-AA3-EV01 | Documentacion de pruebas ejecutadas | Completada | Resumen de ejecucion, evidencias y video referenciado | PDF + video |
| GA9-220501096-AA3-EV02 | Reporte de plan de pruebas ejecutadas | Completada | Consolidado de resultados y trazabilidad | PDF + Excel actualizado |

## Documentos

| Documento | Proposito |
|---|---|
| [Resumen GA9](GA9_220501096_AA1_AA3_resumen_pruebas_software.md) | Explica alcance, ambiente, herramientas y relacion con las evidencias. |
| [Resultados ejecutados](GA9_220501096_AA1_AA3_resultados_pruebas_ejecutadas.md) | Consolida los diez casos ejecutados y su resultado final. |
| [Trazabilidad de evidencias](GA9_220501096_AA1_AA3_trazabilidad_evidencias.md) | Relaciona EV01 a EV05 con soporte tecnico y artefactos externos. |

## Comandos principales

    cd 01_FRONT_END/01_REACT_AP07
    pnpm test:run

    Invoke-WebRequest -Uri https://mlbt-proyecto.onrender.com/api/health -UseBasicParsing -TimeoutSec 30

## Resultado general

- Casos ejecutados: 10.
- Casos aprobados: 10.
- Casos pendientes: 0.
- Casos rechazados: 0.
- Evidencia automatizada: Vitest.
- Evidencia de API: endpoint publico /api/health.
- Evidencia documental: PDF EV04, video EV04, Excel actualizado y reporte EV05 fuera del repositorio.

## Politica de versionamiento

No se versionan PDFs, videos, archivos Excel ni rutas locales de entrega SENA. El repositorio conserva codigo fuente, pruebas reproducibles y documentacion Markdown publica.
