# MLBT_Proyecto

Proyecto web del sistema MLBT - María La Bonita Taquería.

## Estado del proyecto

Este repositorio contiene la aplicacion frontend principal del proyecto MLBT y los módulos Java Web desarrollados para la evidencia GA7_220501096_AA3_EV01.

El módulo principal de la evidencia es:

- spring-web

Este módulo implementa una aplicacion Java Web con Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Thymeleaf y MySQL.

## Proyecto funcional

| Elemento | Ruta | Descripción |
|---|---|---|
| Frontend base | index.html | Aplicacion HTML, CSS y JavaScript del proyecto MLBT. |
| Paginas frontend | pages | Vistas HTML del frontend base. |
| Recursos graficos | assets/img | Imagenes originales del proyecto. |
| Módulo Spring Boot principal | spring-web | Implementacion Java Web con framework y CRUD. |
| Módulo Java Web complementario | java-web | Complemento técnico con JSP y Servlets. |
| Evidencia | docs/evidencias/GA7_220501096_AA3_EV01 | Documentación tecnica de la evidencia. |

## Tecnologias

### Frontend base

- HTML.
- CSS.
- JavaScript.

### Módulo principal Spring Web

- Java 17.
- Spring Boot.
- Spring MVC.
- Spring Data JPA.
- Hibernate.
- Thymeleaf.
- MySQL / MariaDB con XAMPP.
- Maven Wrapper.

## Ejecución del módulo Spring Web

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

## Documentación de evidencia

- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_evidencia.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_bitacora.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_validación_tecnica.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_estandares_técnicos.md

## Rama estable

Arawkano

## Entrega GA7_220501096_AA3_EV01

El módulo principal entregado para la evidencia GA7_220501096_AA3_EV01 se encuentra en:

- spring-web

Este módulo implementa una aplicacion web con Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Thymeleaf y MySQL/MariaDB mediante XAMPP.

### Funcionalidades entregadas

- Dashboard principal.
- CRUD de usuarios.
- CRUD de inventario.
- CRUD de ventas.
- Persistencia en MySQL/MariaDB.
- Integracion visual con identidad MLBT.
- Documentación tecnica de soporte.

### Requisitos de la evidencia cubiertos

- Se tienen en cuenta artefactos previos del ciclo del software.
- Se documenta la relacion con requisitos, prototipos, modelos, arquitectura y navegacion.
- Se mantiene estructura de codigo separada por responsabilidad.
- Se conserva versionamiento mediante Git y GitHub.
- Se incluyen documentos de validación funcional, cierre, hoja de ruta e indice de entrega.

### Trazabilidad de requisitos

El documento de trazabilidad principal se encuentra en:

- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_trazabilidad_requisitos_evidencia.md

Este documento relaciona los elementos solicitados para la evidencia con los componentes implementados en el repositorio.

### Ejecución local

Antes de ejecutar el módulo, iniciar MySQL desde XAMPP.

Comando desde la raiz del repositorio:

.\spring-web\mvnw.cmd -f .\spring-web\pom.xml spring-boot:run

URL local:

http://localhost:8082

### Compilacion

.\spring-web\mvnw.cmd -f .\spring-web\pom.xml clean package

### Documentación de entrega

- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_indice_entrega.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_entrega_final.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_validación_funcional_spring_web.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_hoja_ruta_evolutiva.md
- docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_trazabilidad_requisitos_evidencia.md

### Alcance posterior

Los componentes de autenticación, roles, permisos, auditoria, KDS, reportes e inventario avanzado quedan documentados como linea evolutiva posterior del proyecto MLBT.

## Entrega GA7_220501096_AA5_EV03

La evidencia GA7-220501096-AA5-EV03 corresponde al diseño y desarrollo de servicios web para el proyecto MLBT.

Módulo principal:

- api-mlbt

La API implementa servicios para:

- Autenticación con JWT.
- Perfil protegido.
- Usuarios.
- Inventario.
- Ventas.
- Validaciónes con Zod.
- Persistencia con Prisma y MySQL/MariaDB mediante XAMPP.

Documentación principal:

- docs/evidencias/GA7_220501096_AA5_EV03/GA7_220501096_AA5_EV03_indice_entrega.md
- docs/evidencias/GA7_220501096_AA5_EV03/GA7_220501096_AA5_EV03_cierre_técnico.md
- api-mlbt/docs/ENDPOINTS_EV03.md
- api-mlbt/docs/BASE_DATOS_EV03.md
- api-mlbt/docs/DATOS_INICIALES_EV03.md
- api-mlbt/docs/VALIDACION_ENDPOINTS_EV03.md

Ejecución local:

Antes de ejecutar, iniciar MySQL desde XAMPP.

Desde la carpeta api-mlbt:

node .\src\server.js

URL local:

http://localhost:3001


