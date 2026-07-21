# GA9-220501096 - Trazabilidad de evidencias

## Relacion EV01 a EV05

| Evidencia | Proposito | Soporte en repositorio | Entregable formal externo |
|---|---|---|---|
| AA1-EV01 | Taller sobre codificacion y pruebas basicas | Prueba Vitest, README frontend y documentacion GA9 | PDF |
| AA1-EV02 | Plan de pruebas de software | Resumen de alcance, ambientes y estrategia | PDF |
| AA2-EV01 | Casos y ambiente de pruebas | Matriz publica de casos y resultados resumidos | Excel |
| AA3-EV01 | Documentar pruebas ejecutadas | Resultados por caso, evidencia por nombre y referencia al video | PDF + video |
| AA3-EV02 | Reporte de plan de pruebas ejecutadas | Consolidado final de resultados y trazabilidad | PDF + Excel actualizado |

## Relacion tecnica

| Elemento | Ruta publica | Uso |
|---|---|---|
| Frontend React | [01_FRONT_END/01_REACT_AP07](../../../01_FRONT_END/01_REACT_AP07) | Interfaz publica, login, dashboard y modulos. |
| Pruebas Vitest | [mlbt-basicas.test.js](../../../01_FRONT_END/01_REACT_AP07/src/__tests__/mlbt-basicas.test.js) | Validacion automatizada basica. |
| API Node | [02_BACK_END/01_API_NODE](../../../02_BACK_END/01_API_NODE) | Backend, JWT, endpoints y health check. |
| GA8 integracion publica | [GA8 AA1 EV02](../GA8_220501096_AA1_EV02/README.md) | Antecedente tecnico del despliegue publico. |

## Estado de versionamiento

- Rama documental actual: feature/ga9-aa3-ejecucion-reporte-pruebas.
- Los entregables privados SENA no se versionan.
- La documentacion Markdown conserva la trazabilidad publica y reproducible del proceso.
