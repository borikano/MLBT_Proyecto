# GA7_220501096_AA3_EV01 - Indice de entrega

## Proyecto

MLBT_Proyecto - Maria La Bonita Taqueria

## Repositorio

https://github.com/borikano/MLBT_Proyecto

## Rama estable

Arawkano

## Modulo principal de la evidencia

spring-web

## Descripcion breve

Este indice centraliza los archivos, rutas y comandos principales para revisar la evidencia GA7_220501096_AA3_EV01 del proyecto MLBT.

La evidencia entrega un modulo web funcional desarrollado con Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Thymeleaf y MySQL/MariaDB mediante XAMPP.

## Documentos de entrega

| Documento | Ruta |
|---|---|
| Entrega final | docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_entrega_final.md |
| Validacion funcional Spring Web | docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_validacion_funcional_spring_web.md |
| Hoja de ruta evolutiva | docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_hoja_ruta_evolutiva.md |
| Trazabilidad de requisitos de la evidencia | docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_trazabilidad_requisitos_evidencia.md |
| Evidencia tecnica | docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_evidencia.md |
| Bitacora | docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_bitacora.md |
| Validacion tecnica | docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_validacion_tecnica.md |
| Estandares tecnicos | docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_estandares_tecnicos.md |
| Cierre preentrega | docs/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_cierre_preentrega.md |

## Requisitos principales cubiertos

| Requisito de la evidencia | Evidencia dentro del repositorio |
|---|---|
| Tener en cuenta artefactos previos del ciclo del software | GA7_220501096_AA3_EV01_trazabilidad_requisitos_evidencia.md |
| Codificar modulos del software | spring-web |
| Incluir comentarios y estructura entendible | spring-web/src/main/java y documentos tecnicos |
| Cumplir estandares de codificacion | Separacion por controller, model, repository, service, config, templates, static |
| Usar herramientas de versionamiento | Git, GitHub, ramas, commits, PR y merges |

## Ubicaciones tecnicas principales

| Elemento | Ruta |
|---|---|
| Modulo Spring Boot | spring-web |
| Configuracion Maven | spring-web/pom.xml |
| Maven Wrapper | spring-web/mvnw.cmd |
| Aplicacion principal | spring-web/src/main/java/com/mlbt/springweb/SpringWebApplication.java |
| Controladores | spring-web/src/main/java/com/mlbt/springweb/controller |
| Modelos JPA | spring-web/src/main/java/com/mlbt/springweb/model |
| Repositorios JPA | spring-web/src/main/java/com/mlbt/springweb/repository |
| Servicios | spring-web/src/main/java/com/mlbt/springweb/service |
| Configuracion inicial | spring-web/src/main/java/com/mlbt/springweb/config |
| Templates Thymeleaf | spring-web/src/main/resources/templates |
| CSS Spring Web | spring-web/src/main/resources/static/css/app.css |
| Imagenes Spring Web | spring-web/src/main/resources/static/img |
| Configuracion MySQL | spring-web/src/main/resources/application.properties |

## Rutas funcionales del modulo Spring Web

| Ruta | Descripcion |
|---|---|
| http://localhost:8082/dashboard | Panel principal. |
| http://localhost:8082/usuarios | Gestion de usuarios. |
| http://localhost:8082/inventario | Gestion de inventario. |
| http://localhost:8082/ventas | Gestion de ventas. |

## Base de datos

| Elemento | Valor |
|---|---|
| Motor | MySQL / MariaDB |
| Entorno | XAMPP |
| Base de datos | mlbt_ga7_aa3_ev01 |
| Puerto | 3306 |
| Usuario local | root |

## Comando de compilacion

.\spring-web\mvnw.cmd -f .\spring-web\pom.xml clean package

## Comando de ejecucion

.\spring-web\mvnw.cmd -f .\spring-web\pom.xml spring-boot:run

## URL local

http://localhost:8082

## Resultado esperado

El evaluador puede ubicar el modulo principal, revisar la documentacion de soporte, ejecutar el proyecto localmente y validar navegacion, persistencia, versionamiento y CRUD de usuarios, inventario y ventas.
