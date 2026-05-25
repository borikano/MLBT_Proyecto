# MLBT_Proyecto

Proyecto web del sistema MLBT - Maria La Bonita Taqueria.

## Estado del proyecto

Este repositorio contiene la aplicacion frontend principal del proyecto MLBT y los modulos Java Web desarrollados para la evidencia GA7_220501096_AA3_EV01.

El modulo principal de la evidencia es:

- spring-web

Este modulo implementa una aplicacion Java Web con Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Thymeleaf y MySQL.

## Proyecto funcional

| Elemento | Ruta | Descripcion |
|---|---|---|
| Frontend base | index.html | Aplicacion HTML, CSS y JavaScript del proyecto MLBT. |
| Paginas frontend | pages | Vistas HTML del frontend base. |
| Recursos graficos | assets/img | Imagenes originales del proyecto. |
| Modulo Spring Boot principal | spring-web | Implementacion Java Web con framework y CRUD. |
| Modulo Java Web complementario | java-web | Complemento tecnico con JSP y Servlets. |
| Evidencia | docs/evidencias/GA7_220501096_AA3_EV01 | Documentacion tecnica de la evidencia. |

## Tecnologias

### Frontend base

- HTML.
- CSS.
- JavaScript.

### Modulo principal Spring Web

- Java 17.
- Spring Boot.
- Spring MVC.
- Spring Data JPA.
- Hibernate.
- Thymeleaf.
- MySQL / MariaDB con XAMPP.
- Maven Wrapper.

## Ejecucion del modulo Spring Web

Antes de ejecutar, iniciar MySQL desde XAMPP.

Base de datos:

mlbt_ga7_aa3_ev01

Comando:

.\spring-web\mvnw.cmd -f .\spring-web\pom.xml spring-boot:run

URL local:

http://localhost:8082

## Rutas funcionales

| Ruta | Funcion |
|---|---|
| /dashboard | Panel principal. |
| /usuarios | CRUD de usuarios. |
| /inventario | CRUD de inventario. |
| /ventas | CRUD de ventas. |

## Compilacion

.\spring-web\mvnw.cmd -f .\spring-web\pom.xml clean package

## Documentacion de evidencia

- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_evidencia.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_bitacora.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_validacion_tecnica.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_estandares_tecnicos.md

## Rama estable

Arawkano
