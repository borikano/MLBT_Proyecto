# GA9-220501096 - Resumen de pruebas de software

## Objetivo

Documentar en el repositorio el soporte publico del ciclo GA9 de pruebas de software del proyecto MLBT.

## Alcance tecnico

El ciclo GA9 cubre pruebas funcionales, pruebas automatizadas, validacion de API, trazabilidad documental y consolidacion de resultados.

## Ambientes utilizados

| Ambiente | Uso |
|---|---|
| Vercel | Frontend React publicado. |
| Render | API Node publicada. |
| Aiven MySQL 8.4 | Base de datos publica conectada a la API mediante variable segura. |
| Local frontend React | Ejecucion de pruebas automatizadas con Vitest. |
| Git / GitHub | Trazabilidad tecnica y control de versiones. |

## Herramientas

| Herramienta | Uso |
|---|---|
| Vitest | Pruebas automatizadas basicas del frontend. |
| PowerShell / Invoke-WebRequest | Validacion directa del endpoint publico /api/health. |
| Navegador web | Validacion funcional de interfaz, login, dashboard y modulos. |
| Git | Revision de trazabilidad tecnica. |
| Word / Excel | Construccion de entregables formales fuera del repositorio. |

## Evidencias publicas versionadas

- Codigo de pruebas: [mlbt-basicas.test.js](../../../01_FRONT_END/01_REACT_AP07/src/__tests__/mlbt-basicas.test.js).
- README frontend: [01_REACT_AP07](../../../01_FRONT_END/01_REACT_AP07/README.md).
- API Node: [01_API_NODE](../../../02_BACK_END/01_API_NODE/README.md).
- Documentacion GA8 de integracion publica: [GA8 AA1 EV02](../GA8_220501096_AA1_EV02/README.md).

## Evidencias formales no versionadas

- GA9-220501096-AA1-EV01: PDF de taller.
- GA9-220501096-AA1-EV02: PDF de plan de pruebas.
- GA9-220501096-AA2-EV01: Excel de casos y ambiente de pruebas.
- GA9-220501096-AA3-EV01: PDF de ejecucion documentada y video.
- GA9-220501096-AA3-EV02: PDF de reporte final y Excel actualizado.
