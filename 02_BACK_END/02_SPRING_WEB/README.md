# MLBT Spring Web

Módulo principal Spring Boot para la evidencia GA7_220501096_AA3_EV01.

## Propósito

Este módulo implementa una aplicación web Java usando Spring Boot, Spring MVC, Spring Data JPA, Hibernate, Thymeleaf y MySQL.

Su objetivo es evidenciar la codificación de un módulo web funcional con navegación, persistencia y operaciones CRUD.

## Framework aplicado

| Tecnología | Uso |
|---|---|
| Spring Boot | Arranque y configuración del proyecto Java Web. |
| Spring MVC | Controladores, rutas y navegación web. |
| Spring Data JPA | Acceso a datos mediante repositorios. |
| Hibernate | Implementación ORM para persistencia. |
| Thymeleaf | Plantillas HTML dinámicas. |
| MySQL / MariaDB | Base de datos local mediante XAMPP. |

## Separación técnica

| Tipo | Ubicación |
|---|---|
| Aplicación principal | src/main/java/com/mlbt/springweb/SpringWebApplication.java |
| Controladores Spring MVC | src/main/java/com/mlbt/springweb/controller |
| Modelos JPA | src/main/java/com/mlbt/springweb/model |
| Repositorios Spring Data JPA | src/main/java/com/mlbt/springweb/repository |
| Servicios | src/main/java/com/mlbt/springweb/service |
| Configuración inicial | src/main/java/com/mlbt/springweb/config |
| Templates Thymeleaf | src/main/resources/templates |
| CSS | src/main/resources/static/css |
| Configuración de aplicación | src/main/resources/application.properties |

## Funcionalidades

- Navegación entre dashboard, usuarios, inventario y ventas.
- CRUD de usuarios.
- CRUD de productos de inventario.
- CRUD de ventas.
- Persistencia en MySQL de XAMPP.
- Creación automática de tablas mediante JPA/Hibernate.
- Datos iniciales mediante DataInitializer.

## Base de datos

Nombre: mlbt_ga7_aa3_ev01

Usuario local: root

Contraseña local: sin contraseña, según configuración local de XAMPP.

Esta configuración corresponde al entorno local académico. No debe reutilizarse como configuración productiva.

## Ejecución

Desde la raíz del repositorio:

.\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\02_SPRING_WEB\pom.xml spring-boot:run

URL local:

http://localhost:8082

## Compilación

.\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\02_SPRING_WEB\pom.xml clean package

## Pruebas

Desde la raíz del repositorio:

```powershell
.\02_BACK_END\02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END\02_SPRING_WEB\pom.xml test
```

Las pruebas automatizadas deben validar comportamiento real de servicios, controladores o configuración. No deben limitarse a afirmaciones triviales.

## Módulos funcionales

| Módulo | Ruta | Operaciones |
|---|---|---|
| Dashboard | /dashboard | Navegación principal. |
| Usuarios | /usuarios | Listar, crear, editar y eliminar. |
| Inventario | /inventario | Listar, crear, editar y eliminar. |
| Ventas | /ventas | Listar, crear, editar y eliminar. |
