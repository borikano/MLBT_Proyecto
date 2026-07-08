# GA7_220501096_AA3_EV01 - Reporte de validación Java Web

## Fecha

2026-05-24 18:45:07

## Rama validada

feature/GA7_220501096_AA3_EV01_MLBT

## Módulo validado

02_BACK_END/03_JAVA_WEB

## Conteo de archivos

| Tipo | Cantidad |
|---|---:|
| Java | 14 |
| JSP | 6 |
| CSS | 1 |
| XML | 2 |
| Markdown | 1 |

## Estructura validada

| Responsabilidad | Ruta | Estado |
|---|---|---|
| Configuración Maven | 02_BACK_END/03_JAVA_WEB/pom.xml | Validado |
| Java / Controladores | 02_BACK_END/03_JAVA_WEB/src/main/java/com/mlbt/controller | Validado |
| Java / Modelos | 02_BACK_END/03_JAVA_WEB/src/main/java/com/mlbt/model | Validado |
| Java / Repositorio temporal | 02_BACK_END/03_JAVA_WEB/src/main/java/com/mlbt/repository | Validado |
| Java / Servicios | 02_BACK_END/03_JAVA_WEB/src/main/java/com/mlbt/service | Validado |
| JSP / Vistas | 02_BACK_END/03_JAVA_WEB/src/main/webapp/WEB-INF/jsp | Validado |
| CSS / Estilos | 02_BACK_END/03_JAVA_WEB/src/main/webapp/assets/css | Validado |
| Index de entrada | 02_BACK_END/03_JAVA_WEB/src/main/webapp/index.jsp | Validado |

## Validación de formularios JSP

Se validó la presencia de formularios con action, method="get" y method="post" en las vistas JSP del módulo Java Web.

| Vista | Método | Propósito |
|---|---|---|
| login.jsp | POST | Procesar credenciales. |
| users.jsp | GET y POST | Consultar y registrar usuarios. |
| inventory.jsp | GET y POST | Consultar y registrar productos. |
| sales.jsp | GET y POST | Consultar y registrar ventas. |

## Validación de Servlets

Se validó la presencia de anotaciones @WebServlet y métodos doGet / doPost.

| Servlet | Ruta | Métodos |
|---|---|---|
| LoginServlet | /login | doGet y doPost |
| DashboardServlet | /dashboard | doGet |
| UsersServlet | /users | doGet y doPost |
| InventoryServlet | /inventory | doGet y doPost |
| SalesServlet | /sales | doGet y doPost |
| LogoutServlet | /logout | doGet |

## Revisión de index.jsp

El archivo index.jsp fue revisado para confirmar que funciona como punto de entrada y no concentra lógica sensible.

## Compilación

En la validación histórica inicial, Maven no estaba disponible en PATH. La estructura del módulo quedó documentada para compilación mediante Maven cuando el entorno lo permita.

Comando sugerido:

    mvn -f 02_BACK_END/03_JAVA_WEB/pom.xml clean package

## Resultado

El módulo 02_BACK_END/03_JAVA_WEB queda estructurado como complemento técnico de la evidencia GA7_220501096_AA3_EV01. La implementación separa Java, JSP, CSS, configuración y documentación, e incluye formularios con métodos GET y POST procesados mediante Servlets.
