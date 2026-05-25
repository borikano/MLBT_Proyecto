# GA7_220501096_AA3_EV01 - Trazabilidad de requisitos de la evidencia

## Proyecto

MLBT_Proyecto - Maria La Bonita Taqueria

## Proposito

Este documento relaciona los requisitos solicitados para la evidencia GA7_220501096_AA3_EV01 con los elementos implementados y documentados en el repositorio MLBT_Proyecto.

## Requisitos de la evidencia

| Requisito | Cumplimiento en el proyecto | Ubicacion / evidencia |
|---|---|---|
| Tener en cuenta artefactos previos del ciclo del software | Se consideran modelos, arquitectura, prototipos, mapa de navegacion, modelo de datos, clases, requisitos y documentacion previa del proyecto MLBT. | docs/evidencias y documentacion historica del proyecto. |
| Codificar modulos del software | Se implementa el modulo spring-web con dashboard, usuarios, inventario y ventas. | spring-web |
| Usar tecnologias respectivas | Se utiliza Java 17, Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Thymeleaf, MySQL/MariaDB y Maven Wrapper. | spring-web/pom.xml |
| Incluir comentarios en el codigo | El codigo mantiene nombres descriptivos y comentarios puntuales de soporte en componentes de inicializacion, controladores y estructura funcional cuando aplica. | spring-web/src/main/java |
| Cumplir estandares de codificacion | Se separan responsabilidades por controlador, modelo, repositorio, servicio, configuracion, templates y estilos. | spring-web/src/main/java y spring-web/src/main/resources |
| Usar herramientas de versionamiento | El proyecto se gestiona con Git y GitHub mediante ramas, commits, PR y merges documentados. | Repositorio GitHub y bitacora de commits. |

## Artefactos previos considerados

| Artefacto | Uso dentro de esta evidencia |
|---|---|
| Requisitos funcionales y no funcionales | Orientan los modulos base, la necesidad de navegacion, CRUD, persistencia y evolucion hacia seguridad y roles. |
| Modelo entidad-relacion y modelo logico | Sirven como referencia para entidades, persistencia y estructura de datos del sistema MLBT. |
| Diagrama de clases | Apoya la separacion de entidades, relaciones y componentes del dominio. |
| Arquitectura y despliegue | Orientan el enfoque cliente-servidor, modulo web, base de datos y crecimiento futuro. |
| Mapa de navegacion | Apoya las rutas principales y la organizacion por modulos del sistema. |
| Prototipos de interfaz | Ayudan a mantener identidad visual, navegacion y estructura de vistas. |
| Informe de entregables | Consolida el avance del ciclo de software y da soporte documental a la implementacion. |

## Modulos codificados

| Modulo | Ruta | Estado |
|---|---|---|
| Dashboard | spring-web/src/main/resources/templates/dashboard.html | Implementado |
| Usuarios | spring-web/src/main/resources/templates/usuarios | Implementado |
| Inventario | spring-web/src/main/resources/templates/inventario | Implementado |
| Ventas | spring-web/src/main/resources/templates/ventas | Implementado |
| Controladores | spring-web/src/main/java/com/mlbt/springweb/controller | Implementado |
| Servicios | spring-web/src/main/java/com/mlbt/springweb/service | Implementado |
| Repositorios | spring-web/src/main/java/com/mlbt/springweb/repository | Implementado |
| Modelos JPA | spring-web/src/main/java/com/mlbt/springweb/model | Implementado |
| Configuracion inicial | spring-web/src/main/java/com/mlbt/springweb/config | Implementado |
| Estilos CSS | spring-web/src/main/resources/static/css/app.css | Implementado |
| Imagenes del proyecto | spring-web/src/main/resources/static/img | Implementado |

## Separacion tecnica aplicada

| Capa | Responsabilidad | Ruta |
|---|---|---|
| Controller | Gestion de rutas, solicitudes GET/POST y navegacion MVC. | spring-web/src/main/java/com/mlbt/springweb/controller |
| Model | Entidades JPA persistidas en base de datos. | spring-web/src/main/java/com/mlbt/springweb/model |
| Repository | Acceso a datos mediante Spring Data JPA. | spring-web/src/main/java/com/mlbt/springweb/repository |
| Service | Reglas de aplicacion y operaciones de negocio. | spring-web/src/main/java/com/mlbt/springweb/service |
| Config | Datos iniciales y configuracion de arranque. | spring-web/src/main/java/com/mlbt/springweb/config |
| Templates | Vistas Thymeleaf separadas por modulo. | spring-web/src/main/resources/templates |
| Static CSS | Presentacion visual separada del codigo Java. | spring-web/src/main/resources/static/css |
| Static IMG | Recursos visuales del proyecto. | spring-web/src/main/resources/static/img |

## Versionamiento aplicado

| Elemento | Evidencia |
|---|---|
| Repositorio remoto | https://github.com/borikano/MLBT_Proyecto |
| Rama estable | Arawkano |
| Rama de integracion | principal |
| Rama de cierre actual | feature/GA7_220501096_AA3_EV01_MLBT_CIERRE_FINAL |
| Commits | Registran avances por modulo, documentacion, presentacion y cierre. |
| Pull Requests | Usados para integrar avances y documentar cambios. |
| Limpieza de ramas | Se eliminan ramas feature ya integradas para mantener trazabilidad clara. |

## Relacion con la evidencia actual

El modulo spring-web demuestra la codificacion de modulos web con tecnologia Java y framework Spring Boot, aplicando persistencia, controladores, servicios, vistas y estilos separados.

La evidencia actual entrega una base funcional validable localmente. Los componentes avanzados de seguridad, roles, auditoria, KDS, reportes e inventario avanzado quedan registrados en la hoja de ruta evolutiva para una fase posterior.

## Cierre

Con esta trazabilidad se evidencia que la entrega no se limita al codigo fuente, sino que se apoya en artefactos previos del ciclo del software, aplica separacion tecnica, documenta validaciones, mantiene versionamiento y deja continuidad organizada para la evolucion del proyecto MLBT.
