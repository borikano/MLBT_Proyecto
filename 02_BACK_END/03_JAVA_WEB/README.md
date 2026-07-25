# MLBT Java Web

Módulo complementario Java Web para la evidencia GA7_220501096_AA3_EV01.

## Propósito

Este módulo permite evidenciar una estructura web basada en Java, JSP y Servlets, incluyendo formularios con métodos GET y POST.

## Alcance

| Elemento | Estado |
|---|---|
| Uso principal | Evidencia académica complementaria. |
| Autenticación | Simulada mediante credenciales controladas de prueba. |
| Persistencia | Repositorio temporal en memoria. |
| Producción | No debe usarse como autenticación productiva. |

## Credenciales controladas de prueba

| Usuario | Contraseña | Alcance |
|---|---|---|
| admin@mlbt.com | admin123 | Dato controlado de prueba para evidencia local. |

Estas credenciales son ficticias y se conservan para reproducir la evidencia académica. No representan secretos reales.

## Separación técnica

| Tipo | Ubicación |
|---|---|
| Java | src/main/java/com/mlbt/ |
| Servlets | src/main/java/com/mlbt/controller/ |
| Modelos | src/main/java/com/mlbt/model/ |
| Repositorio temporal | src/main/java/com/mlbt/repository/ |
| Servicios | src/main/java/com/mlbt/service/ |
| JSP | src/main/webapp/WEB-INF/jsp/ |
| CSS | src/main/webapp/assets/css/ |
| Configuración web | src/main/webapp/WEB-INF/web.xml |

## Servlets

| Servlet | Ruta | GET | POST |
|---|---|---|---|
| LoginServlet | /login | Carga login.jsp | Procesa credenciales |
| DashboardServlet | /dashboard | Carga dashboard.jsp | No aplica |
| UsersServlet | /users | Consulta usuarios | Registra usuarios |
| InventoryServlet | /inventory | Consulta inventario | Registra productos |
| SalesServlet | /sales | Consulta ventas | Registra ventas |
| LogoutServlet | /logout | Cierra sesión | No aplica |

## Pruebas

```powershell
mvn -f 02_BACK_END/03_JAVA_WEB/pom.xml test
```

## Compilación

```powershell
mvn -f 02_BACK_END/03_JAVA_WEB/pom.xml clean package
```

## Artefacto esperado

```text
02_BACK_END/03_JAVA_WEB/target/mlbt-java-web.war
```
