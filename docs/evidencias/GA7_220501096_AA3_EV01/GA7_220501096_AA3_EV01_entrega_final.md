# GA7_220501096_AA3_EV01 - Entrega final

## Proyecto

MLBT_Proyecto - Maria La Bonita Taqueria

## Evidencia

GA7_220501096_AA3_EV01 - Codificacion de modulos del software stand-alone, web y movil de acuerdo al proyecto a desarrollar.

## Repositorio

https://github.com/borikano/MLBT_Proyecto

## Rama estable

Arawkano

## Modulo principal entregado

back-end/spring-web

## Descripcion general

Para esta evidencia se entrega un modulo web funcional desarrollado con Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Thymeleaf y MySQL/MariaDB mediante XAMPP.

El modulo implementa una aplicacion web para el proyecto MLBT, permitiendo navegacion funcional y operaciones CRUD sobre usuarios, inventario y ventas.

## Alcance funcional entregado

| Modulo | Estado | Descripcion |
|---|---|---|
| Dashboard | Implementado | Panel principal del modulo Spring Web. |
| Usuarios | Implementado | Listado, creacion, edicion y eliminacion de usuarios. |
| Inventario | Implementado | Listado, creacion, edicion y eliminacion de productos de inventario. |
| Ventas | Implementado | Listado, creacion, edicion y eliminacion de ventas. |
| Persistencia | Implementado | Conexion a MySQL/MariaDB mediante XAMPP. |
| Identidad visual | Implementado | Uso del logo e imagenes institucionales del proyecto MLBT. |
| Documentacion tecnica | Implementado | README, trazabilidad y documentos de soporte de la evidencia. |

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| Java 17 | Lenguaje principal del modulo Spring Web. |
| Spring Boot | Arranque y configuracion del proyecto. |
| Spring MVC | Controladores, rutas y navegacion. |
| Spring Data JPA | Repositorios y acceso a datos. |
| Hibernate | Mapeo ORM y persistencia. |
| Thymeleaf | Renderizado de vistas HTML. |
| MySQL / MariaDB | Base de datos local mediante XAMPP. |
| Maven Wrapper | Compilacion y ejecucion sin Maven global. |
| HTML / CSS | Estructura y presentacion de vistas. |

## Estructura tecnica principal

| Elemento | Ruta |
|---|---|
| Proyecto Spring Web | back-end/spring-web |
| Configuracion Maven | back-end/spring-web/pom.xml |
| Aplicacion principal | back-end/spring-web/src/main/java/com/mlbt/springweb/SpringWebApplication.java |
| Controladores | back-end/spring-web/src/main/java/com/mlbt/springweb/controller |
| Modelos JPA | back-end/spring-web/src/main/java/com/mlbt/springweb/model |
| Repositorios | back-end/spring-web/src/main/java/com/mlbt/springweb/repository |
| Servicios | back-end/spring-web/src/main/java/com/mlbt/springweb/service |
| Configuracion inicial | back-end/spring-web/src/main/java/com/mlbt/springweb/config |
| Vistas Thymeleaf | back-end/spring-web/src/main/resources/templates |
| Estilos Spring Web | back-end/spring-web/src/main/resources/static/css/app.css |
| Imagenes Spring Web | back-end/spring-web/src/main/resources/static/img |
| Configuracion de aplicacion | back-end/spring-web/src/main/resources/application.properties |

## Base de datos

| Elemento | Valor |
|---|---|
| Motor | MySQL / MariaDB |
| Entorno | XAMPP |
| Base de datos | mlbt_ga7_aa3_ev01 |
| Puerto | 3306 |
| Usuario local | root |

## Ejecucion local

Antes de ejecutar, iniciar MySQL desde XAMPP.

Desde la raiz del repositorio:

.\back-end/spring-web\mvnw.cmd -f .\back-end/spring-web\pom.xml spring-boot:run

URL local:

http://localhost:8082

## Rutas validadas

| Ruta | Resultado esperado |
|---|---|
| http://localhost:8082/dashboard | Abre el dashboard del modulo. |
| http://localhost:8082/usuarios | Permite gestionar usuarios. |
| http://localhost:8082/inventario | Permite gestionar inventario. |
| http://localhost:8082/ventas | Permite gestionar ventas. |

## Compilacion

Comando utilizado:

.\back-end/spring-web\mvnw.cmd -f .\back-end/spring-web\pom.xml clean package

Resultado esperado:

BUILD SUCCESS

## Cierre tecnico

La evidencia queda preparada con un modulo web funcional, persistencia en base de datos, navegacion entre modulos, operaciones CRUD y documentacion de soporte.

Los componentes avanzados de seguridad, roles operativos completos, auditoria extendida, KDS, reportes y modulos especializados se conservan como linea evolutiva del proyecto MLBT para la siguiente fase de desarrollo.
