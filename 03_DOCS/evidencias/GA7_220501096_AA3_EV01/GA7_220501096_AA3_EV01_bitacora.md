# Bitácora GA7-220501096-AA3-EV01

## Proyecto

MLBT - Sistema administrativo frontend para Maria La Bonita Taqueria.

## Rama de trabajo

feature/GA7_220501096_AA3_EV01_MLBT

## Registro inicial

- Fecha de inicio: 2026-05-24 18:21:53
- Se crea estructura documental para la evidencia GA7-220501096-AA3-EV01.
- Se identifica el estado actual del proyecto como aplicación frontend HTML, CSS y JavaScript.
- Se consolida la trazabilidad técnica de formularios, operaciones equivalentes GET/POST y estado JSP.
- Se mantiene el trabajo en rama feature para no afectar directamente las ramas principal ni Arawkano.

## Actividades previstas

| Actividad | Estado | Descripción |
|---|---|---|
| Preparar rama de trabajo | Completado | Se creó la rama feature/GA7_220501096_AA3_EV01_MLBT desde principal. |
| Documentar evidencia | En proceso | Se crea documento base de la evidencia. |
| Revisar estructura del proyecto | Pendiente | Validar archivos HTML, CSS, JS y documentación. |
| Validar formularios | Pendiente | Confirmar formularios y lógica de eventos submit. |
| Revisar funcionamiento local | Pendiente | Ejecutar el sistema y comprobar navegación principal. |
| Preparar entrega | Pendiente | Consolidar documentación y versionamiento final. |

## Notas técnicas

- La aplicación funciona actualmente en modo offline.
- La persistencia se realiza mediante localStorage.
- La estructura ya contiene una capa inicial de servicios para futura migración a backend.
- No se registran archivos JSP en la versión actual.

## Actualización - 2026-05-24 18:37:30

- Se ajusta la nomenclatura de rama, carpeta y documentos para usar el identificador completo de la evidencia.
- Se agrega documento de estándares técnicos para separar código por tipo y responsabilidad.
- Se define que los archivos index solo deben actuar como punto de entrada o navegación inicial.


## Actualizacion - 2026-05-24 18:41:30

- Se crea el modulo complementario 02_BACK_END/03_JAVA_WEB.
- Se agregan modelos Java para usuarios, inventario y ventas.
- Se agregan servicios Java para separar reglas de aplicacion.
- Se agrega repositorio temporal en memoria para separar datos de controladores.
- Se agregan Servlets para login, dashboard, usuarios, inventario, ventas y cierre de sesion.
- Se agregan JSP en WEB-INF para mantener vistas separadas.
- Se agrega CSS separado en assets/css.
- Se mantiene index.jsp solo como punto de entrada del modulo.

## Actualización - 2026-05-24 18:45:07

- Se genera reporte de validación técnica del módulo Java Web.
- Se valida estructura separada por tipo de código.
- Se valida presencia de formularios JSP con GET y POST.
- Se valida presencia de Servlets con doGet, doPost y @WebServlet.
- Se valida que index.jsp funcione como punto de entrada sin concentrar lógica sensible.
