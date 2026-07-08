# Trazabilidad de formularios HTML, métodos HTTP y páginas JSP

## Evidencia

GA7-220501096-AA3-EV01 - Codificación de módulos del software Stand-alone, web y móvil de acuerdo al proyecto a desarrollar.

## Propósito

Este documento consolida la trazabilidad técnica de formularios, operaciones equivalentes a GET y POST, y módulos web disponibles dentro del proyecto MLBT.

## Estado consolidado actual

El repositorio MLBT cuenta actualmente con varios frentes técnicos:

| Bloque | Ruta | Estado |
|---|---|---|
| Interfaz base HTML, CSS y JavaScript | 01_FRONT_END/02_INTERFAZ_BASE | Disponible como base histórica y funcional. |
| Interfaz React | 01_FRONT_END/01_REACT_AP07 | Disponible como componente Front End AP07. |
| API Node | 02_BACK_END/01_API_NODE | Disponible como servicio REST. |
| Spring Web | 02_BACK_END/02_SPRING_WEB | Disponible como módulo Java Spring Boot. |
| Java Web JSP y Servlets | 02_BACK_END/03_JAVA_WEB | Disponible como módulo complementario Java Web. |

## Interfaz base HTML y JavaScript

La interfaz base conserva formularios HTML controlados con JavaScript. Las operaciones equivalentes a GET y POST se realizan mediante lectura y escritura de datos desde servicios locales y almacenamiento del navegador.

| Formulario | Ruta | Lógica asociada |
|---|---|---|
| Login | 01_FRONT_END/02_INTERFAZ_BASE/pages/login.html | 01_FRONT_END/02_INTERFAZ_BASE/js/auth.js |
| Usuarios | 01_FRONT_END/02_INTERFAZ_BASE/pages/users.html | 01_FRONT_END/02_INTERFAZ_BASE/js/users.js |
| Inventario | 01_FRONT_END/02_INTERFAZ_BASE/pages/inventory.html | 01_FRONT_END/02_INTERFAZ_BASE/js/inventory.js |
| Ventas | 01_FRONT_END/02_INTERFAZ_BASE/pages/sales.html | 01_FRONT_END/02_INTERFAZ_BASE/js/sales.js |

## Módulo Java Web

El módulo Java Web complementario evidencia directamente el uso de JSP, Servlets y formularios con métodos GET y POST.

| Elemento | Ruta |
|---|---|
| Módulo Java Web | 02_BACK_END/03_JAVA_WEB |
| JSP | 02_BACK_END/03_JAVA_WEB/src/main/webapp/WEB-INF/jsp |
| Servlets | 02_BACK_END/03_JAVA_WEB/src/main/java/com/mlbt/controller |
| Modelos | 02_BACK_END/03_JAVA_WEB/src/main/java/com/mlbt/model |
| Servicios | 02_BACK_END/03_JAVA_WEB/src/main/java/com/mlbt/service |
| CSS | 02_BACK_END/03_JAVA_WEB/src/main/webapp/assets/css |

## Servlets documentados

| Servlet | Ruta HTTP | Método principal |
|---|---|---|
| LoginServlet | /login | GET y POST |
| DashboardServlet | /dashboard | GET |
| UsersServlet | /users | GET y POST |
| InventoryServlet | /inventory | GET y POST |
| SalesServlet | /sales | GET y POST |
| LogoutServlet | /logout | GET |

## Interpretación para la entrega

La evidencia cuenta con una base histórica frontend y con un módulo complementario Java Web. La documentación permite identificar formularios HTML, lógica JavaScript, JSP, Servlets y operaciones HTTP usadas para validar la separación de responsabilidades.

## Conclusión

El proyecto MLBT conserva trazabilidad entre formularios frontend, operaciones equivalentes de JavaScript y una implementación Java Web complementaria con JSP y Servlets.
