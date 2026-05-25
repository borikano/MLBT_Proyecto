# MLBT Spring Web

Modulo principal Spring Boot para la evidencia GA7_220501096_AA3_EV01.

## Proposito

Este modulo implementa una aplicacion web Java usando Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Thymeleaf y MySQL.

Su objetivo es evidenciar la codificacion de un modulo web funcional con navegacion, persistencia y operaciones CRUD.

## Framework aplicado

| Tecnologia | Uso |
|---|---|
| Spring Boot | Arranque y configuracion del proyecto Java Web. |
| Spring MVC | Controladores, rutas y navegacion web. |
| Spring Data JPA | Acceso a datos mediante repositorios. |
| Hibernate | Implementacion ORM para persistencia. |
| Thymeleaf | Plantillas HTML dinamicas. |
| MySQL / MariaDB | Base de datos local mediante XAMPP. |

## Separacion tecnica

| Tipo | Ubicacion |
|---|---|
| Aplicacion principal | src/main/java/com/mlbt/springweb/SpringWebApplication.java |
| Controladores Spring MVC | src/main/java/com/mlbt/springweb/controller |
| Modelos JPA | src/main/java/com/mlbt/springweb/model |
| Repositorios Spring Data JPA | src/main/java/com/mlbt/springweb/repository |
| Servicios | src/main/java/com/mlbt/springweb/service |
| Configuracion inicial | src/main/java/com/mlbt/springweb/config |
| Templates Thymeleaf | src/main/resources/templates |
| CSS | src/main/resources/static/css |
| Configuracion de aplicacion | src/main/resources/application.properties |

## Funcionalidades

- Navegacion entre dashboard, usuarios, inventario y ventas.
- CRUD de usuarios.
- CRUD de productos de inventario.
- CRUD de ventas.
- Persistencia en MySQL de XAMPP.
- Creacion automatica de tablas mediante JPA/Hibernate.
- Datos iniciales mediante DataInitializer.

## Base de datos

Nombre: mlbt_ga7_aa3_ev01

Usuario local: root

Contrasena local: sin contrasena, segun configuracion local de XAMPP.

## Ejecucion

Desde la raiz del repositorio:

.\spring-web\mvnw.cmd -f .\spring-web\pom.xml spring-boot:run

URL local:

http://localhost:8082

## Compilacion

.\spring-web\mvnw.cmd -f .\spring-web\pom.xml clean package

## Modulos funcionales

| Modulo | Ruta | Operaciones |
|---|---|---|
| Dashboard | /dashboard | Navegacion principal. |
| Usuarios | /usuarios | Listar, crear, editar y eliminar. |
| Inventario | /inventario | Listar, crear, editar y eliminar. |
| Ventas | /ventas | Listar, crear, editar y eliminar. |
