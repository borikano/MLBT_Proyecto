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

## Entrega GA7_220501096_AA3_EV01

El modulo principal entregado para la evidencia GA7_220501096_AA3_EV01 se encuentra en:

- spring-web

Este modulo implementa una aplicacion web con Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Thymeleaf y MySQL/MariaDB mediante XAMPP.

### Funcionalidades entregadas

- Dashboard principal.
- CRUD de usuarios.
- CRUD de inventario.
- CRUD de ventas.
- Persistencia en MySQL/MariaDB.
- Integracion visual con identidad MLBT.
- Documentacion tecnica de soporte.

### Requisitos de la evidencia cubiertos

- Se tienen en cuenta artefactos previos del ciclo del software.
- Se documenta la relacion con requisitos, prototipos, modelos, arquitectura y navegacion.
- Se mantiene estructura de codigo separada por responsabilidad.
- Se conserva versionamiento mediante Git y GitHub.
- Se incluyen documentos de validacion funcional, cierre, hoja de ruta e indice de entrega.

### Trazabilidad de requisitos

El documento de trazabilidad principal se encuentra en:

- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_trazabilidad_requisitos_evidencia.md

Este documento relaciona los elementos solicitados para la evidencia con los componentes implementados en el repositorio.

### Ejecucion local

Antes de ejecutar el modulo, iniciar MySQL desde XAMPP.

Comando desde la raiz del repositorio:

.\spring-web\mvnw.cmd -f .\spring-web\pom.xml spring-boot:run

URL local:

http://localhost:8082

### Compilacion

.\spring-web\mvnw.cmd -f .\spring-web\pom.xml clean package

### Documentacion de entrega

- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_indice_entrega.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_entrega_final.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_validacion_funcional_spring_web.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_hoja_ruta_evolutiva.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_trazabilidad_requisitos_evidencia.md

### Alcance posterior

Los componentes de autenticacion, roles, permisos, auditoria, KDS, reportes e inventario avanzado quedan documentados como linea evolutiva posterior del proyecto MLBT.

