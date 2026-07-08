# GA7_220501096_AA3_EV01 - Indice de entrega

## Proyecto

MLBT_Proyecto - Maria La Bonita Taqueria

## Repositorio

https://github.com/borikano/MLBT_Proyecto

## Rama estable

Arawkano

## Modulo principal de la evidencia

02_BACK_END/02_SPRING_WEB

## Descripcion breve

Este indice centraliza los archivos, rutas y comandos principales para revisar la evidencia GA7_220501096_AA3_EV01 del proyecto MLBT.

La evidencia entrega un modulo web funcional desarrollado con Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Thymeleaf y MySQL/MariaDB mediante XAMPP.

## Documentos de entrega

| Documento | Ruta |
|---|---|
| Entrega final | 03_DOCS/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_entrega_final.md |
| Validacion funcional Spring Web | 03_DOCS/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_validacion_funcional_spring_web.md |
| Hoja de ruta evolutiva | 03_DOCS/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_hoja_ruta_evolutiva.md |
| Trazabilidad de requisitos de la evidencia | 03_DOCS/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_trazabilidad_requisitos_evidencia.md |
| Evidencia tecnica | 03_DOCS/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_evidencia.md |
| Bitacora | 03_DOCS/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_bitacora.md |
| Validacion tecnica | 03_DOCS/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_validacion_tecnica.md |
| Estandares tecnicos | 03_DOCS/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_estandares_tecnicos.md |
| Cierre preentrega | 03_DOCS/evidencias/GA7_220501096_AA3_EV01/GA7_220501096_AA3_EV01_cierre_preentrega.md |

## Requisitos principales cubiertos

| Requisito de la evidencia | Evidencia dentro del repositorio |
|---|---|
| Tener en cuenta artefactos previos del ciclo del software | GA7_220501096_AA3_EV01_trazabilidad_requisitos_evidencia.md |
| Codificar modulos del software | 02_BACK_END/02_SPRING_WEB |
| Incluir comentarios y estructura entendible | 02_BACK_END/02_SPRING_WEB/src/main/java y documentos tecnicos |
| Cumplir estandares de codificacion | Separacion por controller, model, repository, service, config, templates, static |
| Usar herramientas de versionamiento | Git, GitHub, ramas, commits, PR y merges |

## Ubicaciones tecnicas principales

| Elemento | Ruta |
|---|---|
| Modulo Spring Boot | 02_BACK_END/02_SPRING_WEB |
| Configuracion Maven | 02_BACK_END/02_SPRING_WEB/pom.xml |
| Maven Wrapper | 02_BACK_END/02_SPRING_WEB/mvnw.cmd |
| Aplicacion principal | 02_BACK_END/02_SPRING_WEB/src/main/java/com/mlbt/springweb/SpringWebApplication.java |
| Controladores | 02_BACK_END/02_SPRING_WEB/src/main/java/com/mlbt/springweb/controller |
| Modelos JPA | 02_BACK_END/02_SPRING_WEB/src/main/java/com/mlbt/springweb/model |
| Repositorios JPA | 02_BACK_END/02_SPRING_WEB/src/main/java/com/mlbt/springweb/repository |
| Servicios | 02_BACK_END/02_SPRING_WEB/src/main/java/com/mlbt/springweb/service |
| Configuracion inicial | 02_BACK_END/02_SPRING_WEB/src/main/java/com/mlbt/springweb/config |
| Templates Thymeleaf | 02_BACK_END/02_SPRING_WEB/src/main/resources/templates |
| CSS Spring Web | 02_BACK_END/02_SPRING_WEB/src/main/resources/static/css/app.css |
| Imagenes Spring Web | 02_BACK_END/02_SPRING_WEB/src/main/resources/static/img |
| Configuracion MySQL | 02_BACK_END/02_SPRING_WEB/src/main/resources/application.properties |

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

.\02_BACK_END/02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END/02_SPRING_WEB\pom.xml clean package

## Comando de ejecucion

.\02_BACK_END/02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END/02_SPRING_WEB\pom.xml spring-boot:run

## URL local

http://localhost:8082

## Resultado esperado

El evaluador puede ubicar el modulo principal, revisar la documentacion de soporte, ejecutar el proyecto localmente y validar navegacion, persistencia, versionamiento y CRUD de usuarios, inventario y ventas.
