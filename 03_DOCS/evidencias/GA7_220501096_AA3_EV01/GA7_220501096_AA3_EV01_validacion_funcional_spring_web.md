# GA7_220501096_AA3_EV01 - Validacion funcional Spring Web

## Proyecto

MLBT_Proyecto - Maria La Bonita Taqueria

## Modulo validado

02_BACK_END/02_SPRING_WEB

## Objetivo de la validacion

Comprobar que el modulo Spring Web entregado para la evidencia GA7_220501096_AA3_EV01 permite ejecutar la aplicacion, navegar entre los modulos principales y realizar operaciones CRUD con persistencia en MySQL/MariaDB.

## Entorno de validacion

| Elemento | Resultado esperado |
|---|---|
| Java 17 | Disponible en el entorno local. |
| Maven Wrapper | Disponible dentro de 02_BACK_END/02_SPRING_WEB. |
| XAMPP | Disponible para MySQL/MariaDB. |
| MySQL/MariaDB | Activo en puerto 3306. |
| Base de datos | mlbt_ga7_aa3_ev01 creada y disponible. |
| Navegador | Acceso local mediante http://localhost:8082. |

## Comandos de validacion del entorno

Validar puerto MySQL:

Test-NetConnection 127.0.0.1 -Port 3306

Validar conexion MySQL:

& "C:\xampp\mysql\bin\mysql.exe" -u root -h 127.0.0.1 -e "SELECT VERSION();"

Crear o verificar base de datos:

& "C:\xampp\mysql\bin\mysql.exe" -u root -h 127.0.0.1 -e "CREATE DATABASE IF NOT EXISTS mlbt_ga7_aa3_ev01 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

Compilar modulo Spring Web:

.\02_BACK_END/02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END/02_SPRING_WEB\pom.xml clean package

Ejecutar modulo Spring Web:

.\02_BACK_END/02_SPRING_WEB\mvnw.cmd -f .\02_BACK_END/02_SPRING_WEB\pom.xml spring-boot:run

## URL principal de prueba

http://localhost:8082

## Validacion de rutas

| Ruta | Validacion | Estado esperado |
|---|---|---|
| /dashboard | Carga del panel principal | Conforme |
| /usuarios | Acceso al modulo de usuarios | Conforme |
| /inventario | Acceso al modulo de inventario | Conforme |
| /ventas | Acceso al modulo de ventas | Conforme |

## Validacion funcional por modulo

### Dashboard

| Prueba | Resultado esperado |
|---|---|
| Abrir dashboard | Se muestra el panel principal del modulo Spring Web. |
| Ver identidad visual | Se visualiza el logo y la identidad del proyecto MLBT. |
| Navegar a usuarios | El boton de usuarios abre el modulo correspondiente. |
| Navegar a inventario | El boton de inventario abre el modulo correspondiente. |
| Navegar a ventas | El boton de ventas abre el modulo correspondiente. |

### Usuarios

| Operacion | Resultado esperado |
|---|---|
| Listar usuarios | Se visualizan los usuarios registrados. |
| Crear usuario | El formulario permite registrar un nuevo usuario. |
| Editar usuario | El sistema permite modificar datos del usuario. |
| Eliminar usuario | El sistema permite retirar un usuario registrado. |

### Inventario

| Operacion | Resultado esperado |
|---|---|
| Listar productos | Se visualizan los productos registrados. |
| Crear producto | El formulario permite registrar un nuevo producto. |
| Editar producto | El sistema permite modificar datos del producto. |
| Eliminar producto | El sistema permite retirar un producto registrado. |
| Consultar por GET | Se evidencia consulta por parametro de busqueda. |

### Ventas

| Operacion | Resultado esperado |
|---|---|
| Listar ventas | Se visualizan las ventas registradas. |
| Crear venta | El formulario permite registrar una nueva venta. |
| Editar venta | El sistema permite modificar datos de la venta. |
| Eliminar venta | El sistema permite retirar una venta registrada. |
| Consultar por GET | Se evidencia consulta por parametro de busqueda. |

## Validacion visual

| Elemento | Estado esperado |
|---|---|
| Logo del proyecto | Visible en el modulo Spring Web. |
| Identidad MLBT | Conservada en colores, estilo y presentacion. |
| Botones | Visibles y funcionales. |
| Tablas | Legibles y organizadas. |
| Formularios | Funcionales para captura y edicion. |
| Navegacion | Permite moverse entre dashboard, usuarios, inventario y ventas. |

## Validacion tecnica

| Elemento | Estado esperado |
|---|---|
| Controladores Spring MVC | Presentes en 02_BACK_END/02_SPRING_WEB/src/main/java/com/mlbt/springweb/controller. |
| Modelos JPA | Presentes en 02_BACK_END/02_SPRING_WEB/src/main/java/com/mlbt/springweb/model. |
| Repositorios JPA | Presentes en 02_BACK_END/02_SPRING_WEB/src/main/java/com/mlbt/springweb/repository. |
| Servicios | Presentes en 02_BACK_END/02_SPRING_WEB/src/main/java/com/mlbt/springweb/service. |
| Templates Thymeleaf | Presentes en 02_BACK_END/02_SPRING_WEB/src/main/resources/templates. |
| CSS separado | Presente en 02_BACK_END/02_SPRING_WEB/src/main/resources/static/css/app.css. |
| Imagenes estaticas | Presentes en 02_BACK_END/02_SPRING_WEB/src/main/resources/static/img. |
| Configuracion MySQL | Presente en 02_BACK_END/02_SPRING_WEB/src/main/resources/application.properties. |

## Resultado de validacion

El modulo Spring Web cumple con el alcance funcional requerido para esta entrega: ejecucion local, navegacion entre modulos, operaciones CRUD, persistencia en MySQL/MariaDB y presentacion visual alineada con el proyecto MLBT.

## Observacion de continuidad tecnica

La implementacion actual deja una base funcional para evolucionar posteriormente hacia autenticacion, control de roles, auditoria, KDS, reportes, inventario avanzado y modulos operativos especializados.
