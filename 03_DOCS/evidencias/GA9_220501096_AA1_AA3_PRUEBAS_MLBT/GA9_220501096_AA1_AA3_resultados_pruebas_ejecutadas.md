# GA9-220501096 - Resultados de pruebas ejecutadas

## Resumen consolidado

| Indicador | Resultado |
|---|---|
| Total de casos ejecutados | 10 |
| Casos aprobados | 10 |
| Casos pendientes | 0 |
| Casos rechazados | 0 |
| Casos en seguimiento | 0 |
| Resultado general | Aprobado |

## Matriz de casos ejecutados

| Caso | Nombre | Tipo | Ambiente | Resultado | Evidencia |
|---|---|---|---|---|---|
| CP-001 | Validar disponibilidad del frontend publico | Funcional / humo | Vercel | Aprobado | EV04_PRINT_01_frontend_publico.png |
| CP-002 | Validar pantalla de login | Funcional | Vercel | Aprobado | EV04_PRINT_02_login.png |
| CP-003 | Validar inicio de sesion con usuario autorizado | Funcional / integracion | Vercel + Render + Aiven MySQL | Aprobado | EV04_PRINT_03_dashboard_autenticado.png |
| CP-004 | Validar proteccion del dashboard | Funcional / seguridad basica | Vercel | Aprobado | EV04_PRINT_04_dashboard_protegido.png |
| CP-005 | Validar navegacion al modulo de usuarios | Funcional | Vercel | Aprobado | EV04_PRINT_05_modulo_usuarios.png |
| CP-006 | Validar navegacion al modulo de inventario | Funcional | Vercel | Aprobado | EV04_PRINT_06_modulo_inventario.png |
| CP-007 | Validar navegacion al modulo de ventas | Funcional | Vercel | Aprobado | EV04_PRINT_07_modulo_ventas.png |
| CP-008 | Validar calculo total de pedido | Automatizada | Frontend React local | Aprobado | EV04_PRINT_08_vitest_pruebas_aprobadas.png |
| CP-009 | Validar endpoint publico /api/health | Automatizada / integracion basica | Render | Aprobado | EV04_PRINT_09_health_api_directa.png |
| CP-010 | Validar trazabilidad tecnica en Git | Documental / trazabilidad | Git / GitHub | Aprobado | EV04_PRINT_10_repositorio_estado_git.png |

## Pruebas automatizadas

### CP-008 - Calculo total de pedido

    cd 01_FRONT_END/01_REACT_AP07
    pnpm test:run

Resultado documentado: la suite de Vitest finalizo correctamente.

### CP-009 - Endpoint publico /api/health

    Invoke-WebRequest -Uri https://mlbt-proyecto.onrender.com/api/health -UseBasicParsing -TimeoutSec 30

Resultado documentado: la API publica respondio con codigo HTTP 200 y contenido disponible.

## Conclusion

El plan de pruebas ejecutadas finalizo con diez casos aprobados. El soporte formal se conserva en los entregables PDF, video y Excel externos al repositorio.
