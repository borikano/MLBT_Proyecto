# MLBT Java Web

Modulo complementario Java Web para la evidencia GA7_220501096_AA3_EV01.

## Proposito

Este modulo permite evidenciar una estructura web basada en Java, JSP y Servlets, incluyendo formularios con metodos GET y POST.

## Separacion tecnica

| Tipo | Ubicacion |
|---|---|
| Java | src/main/java/com/mlbt/ |
| Servlets | src/main/java/com/mlbt/controller/ |
| Modelos | src/main/java/com/mlbt/model/ |
| Repositorio temporal | src/main/java/com/mlbt/repository/ |
| Servicios | src/main/java/com/mlbt/service/ |
| JSP | src/main/webapp/WEB-INF/jsp/ |
| CSS | src/main/webapp/assets/css/ |
| Configuracion web | src/main/webapp/WEB-INF/web.xml |

## Servlets

| Servlet | Ruta | GET | POST |
|---|---|---|---|
| LoginServlet | /login | Carga login.jsp | Procesa credenciales |
| DashboardServlet | /dashboard | Carga dashboard.jsp | No aplica |
| UsersServlet | /users | Consulta usuarios | Registra usuarios |
| InventoryServlet | /inventory | Consulta inventario | Registra productos |
| SalesServlet | /sales | Consulta ventas | Registra ventas |
| LogoutServlet | /logout | Cierra sesion | No aplica |

## Compilacion

```powershell
mvn -f java-web/pom.xml clean package
```

## Artefacto esperado

```text
java-web/target/mlbt-java-web.war
```
