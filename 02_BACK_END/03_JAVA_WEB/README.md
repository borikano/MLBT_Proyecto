# MLBT Java Web

Módulo complementario Java Web del proyecto MLBT.

## Propósito

Este módulo implementa una estructura web basada en Java, JSP y Servlets, incluyendo formularios con métodos GET y POST.

## Alcance

| Elemento | Estado |
|---|---|
| Uso principal | Módulo complementario de referencia. |
| Autenticación | Simulada con credenciales controladas embebidas en el módulo histórico. |
| Persistencia | Repositorio temporal en memoria. |
| Producción | No debe usarse como autenticación productiva. |

Las credenciales de validación se gestionan fuera de la documentación pública del repositorio. Para pruebas locales del módulo, consulte el código fuente del servicio de autenticación y las pruebas JUnit asociadas.

## Separación técnica

| Tipo | Ubicación |
|---|---|
| Java | `src/main/java/com/mlbt/` |
| Servlets | `src/main/java/com/mlbt/controller/` |
| Modelos | `src/main/java/com/mlbt/model/` |
| Repositorio temporal | `src/main/java/com/mlbt/repository/` |
| Servicios | `src/main/java/com/mlbt/service/` |
| JSP | `src/main/webapp/WEB-INF/jsp/` |
| CSS | `src/main/webapp/assets/css/` |
| Configuración web | `src/main/webapp/WEB-INF/web.xml` |

## Servlets

| Servlet | Ruta | GET | POST |
|---|---|---|---|
| LoginServlet | /login | Carga login.jsp | Procesa credenciales |
| DashboardServlet | /dashboard | Carga dashboard.jsp | No aplica |
| UsersServlet | /users | Consulta usuarios | Registra usuarios |
| InventoryServlet | /inventory | Consulta inventario | Registra productos |
| SalesServlet | /sales | Consulta ventas | Registra ventas |
| LogoutServlet | /logout | Cierra sesión | No aplica |

## Pruebas (H-002 estandarizado)

Desde la raíz del repositorio:

```powershell
.\02_BACK_END\03_JAVA_WEB\test.cmd
```

El script reutiliza internamente el Maven Wrapper de Spring Web. **No se requiere Maven global** en la estación local.

## Compilación

```powershell
.\02_BACK_END\03_JAVA_WEB\package.cmd
```

## Artefacto esperado

```text
02_BACK_END/03_JAVA_WEB/target/mlbt-java-web.war
```

## Referencias

- [README principal](../../README.md)
- [Comandos de ejecución](../../00_GUIA_TECNICA_PROYECTO/03_COMANDOS_DE_EJECUCION.md)
