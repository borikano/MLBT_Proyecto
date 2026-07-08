# Trazabilidad de formularios HTML, métodos HTTP y páginas JSP

## Evidencia

GA7-220501096-AA3-EV01 - Codificación de módulos del software Stand-alone, web y móvil de acuerdo al proyecto a desarrollar.

## Propósito

Este documento consolida la trazabilidad técnica de los formularios HTML, la lógica equivalente a operaciones GET/POST y el estado actual de páginas JSP dentro del proyecto:

- Dónde están los formularios HTML.
- Cómo se identifican las operaciones equivalentes a GET y POST.
- Dónde estarían o se proyectan las páginas JSP.
- Qué archivos JavaScript gestionan la lógica de cada formulario.

## Estado actual del proyecto

El proyecto MLBT se encuentra implementado actualmente como una aplicación web frontend con HTML, CSS y JavaScript Vanilla.

En la versión actual del repositorio:

- Sí existen formularios HTML.
- Sí existe captura de eventos submit desde JavaScript.
- Sí existe persistencia local mediante localStorage.
- No se encontraron archivos .jsp.
- No se encontraron formularios HTML con atributos method="get" o method="post" declarados directamente.
- No se encontraron atributos action apuntando a servlets o páginas JSP.

Por lo anterior, el comportamiento equivalente a GET y POST se documenta de acuerdo con la lógica implementada en JavaScript.

## Formularios HTML identificados

| Página | Formulario | Archivo | Línea aproximada | Descripción |
|---|---|---|---:|---|
| Inventario | inventory-item-form | pages/inventory.html | 33 | Formulario para registrar o actualizar ítems de inventario. |
| Inventario | inventory-movement-form | pages/inventory.html | 69 | Formulario para registrar movimientos de inventario. |
| Login | login-form | pages/login.html | 21 | Formulario de inicio de sesión. |
| Ventas | sales-form | pages/sales.html | 33 | Formulario para registrar ventas. |
| Usuarios | user-form | pages/users.html | 36 | Formulario para registrar o administrar usuarios. |

## Relación entre formularios y lógica JavaScript

| Formulario | Archivo HTML | Archivo JavaScript asociado | Evidencia técnica |
|---|---|---|---|
| login-form | pages/login.html | js/auth.js | Gestiona autenticación y sesión de usuario. |
| inventory-item-form | pages/inventory.html | js/inventory.js | Usa addEventListener("submit"), event.preventDefault() y funciones de guardado de inventario. |
| inventory-movement-form | pages/inventory.html | js/inventory.js | Registra movimientos y actualiza existencias mediante JavaScript. |
| sales-form | pages/sales.html | js/sales.js | Usa addEventListener("submit"), event.preventDefault() y saveSales(). |
| user-form | pages/users.html | js/users.js | Usa addEventListener("submit"), event.preventDefault() y saveUsers(). |

## Uso equivalente de GET

En esta versión frontend, las operaciones equivalentes a GET se realizan mediante lectura de datos desde almacenamiento local y servicios JavaScript.

| Operación equivalente | Archivo | Función o evidencia | Descripción |
|---|---|---|---|
| Consultar usuarios | js/services/user-data-service.js | getUsers() | Obtiene usuarios desde el proveedor configurado. |
| Consultar usuarios locales | js/services/local/user-data-service.local.js | getUsers() | Obtiene usuarios desde localStorage. |
| Consultar auditoría | js/services/user-data-service.js | getAuditEntries() | Obtiene registros de auditoría. |
| Consultar sesión | js/session.js | getUser() | Recupera la sesión activa. |
| Consultar inventario | js/inventory.js | storage.get() | Carga ítems y movimientos de inventario. |
| Consultar ventas | js/sales.js | storage.get() | Carga ventas registradas. |

## Uso equivalente de POST

En esta versión frontend, las operaciones equivalentes a POST se realizan cuando el usuario envía un formulario HTML y JavaScript captura el evento submit.

| Operación equivalente | Formulario | Archivo JavaScript | Evidencia técnica | Descripción |
|---|---|---|---|---|
| Iniciar sesión | login-form | js/auth.js | Captura de formulario y validación | Valida credenciales y crea sesión local. |
| Registrar ítem de inventario | inventory-item-form | js/inventory.js | addEventListener("submit") y event.preventDefault() | Guarda o actualiza ítems de inventario. |
| Registrar movimiento de inventario | inventory-movement-form | js/inventory.js | addEventListener("submit") y event.preventDefault() | Registra entradas o salidas de inventario. |
| Registrar venta | sales-form | js/sales.js | addEventListener("submit"), event.preventDefault() y saveSales() | Guarda ventas y actualiza inventario. |
| Registrar o administrar usuario | user-form | js/users.js | addEventListener("submit"), event.preventDefault() y saveUsers() | Guarda usuarios y registra cambios administrativos. |

## Persistencia de datos

La persistencia actual se realiza mediante localStorage, centralizada principalmente en:

| Archivo | Responsabilidad |
|---|---|
| js/storage.js | Encapsula operaciones sobre localStorage: guardar, leer, eliminar y limpiar datos. |
| js/services/local/user-data-service.local.js | Gestiona persistencia local de usuarios y auditoría. |
| js/services/user-data-service.js | Selecciona proveedor de datos local o remoto. |
| js/services/remote/user-data-service.remote.js | Deja preparada una capa remota para futura conexión con backend. |

## Estado de páginas JSP

En la revisión actual del repositorio no se encontraron archivos con extensión .jsp.

Comando utilizado:

Get-ChildItem -Recurse -Include *.jsp

Resultado:

Sin resultados.

## Interpretación para la entrega

La documentación técnica deja visible que el proyecto tiene formularios HTML funcionales, pero actualmente no usa JSP ni servlets.

La lógica de envío no se realiza con method="post" directamente en el HTML, sino mediante JavaScript, capturando el evento submit y evitando la recarga de página con event.preventDefault().

## Mejora técnica futura

Para fortalecer la evidencia frente al objetivo de aprendizaje, se recomienda una de estas dos opciones:

### Opción 1: Mantener frontend y documentar claramente

Mantener el proyecto como aplicación frontend, dejando este documento como trazabilidad de formularios, lógica de consulta, lógica de registro y ausencia actual de JSP.

### Opción 2: Crear módulo complementario Java Web

Crear una carpeta o rama complementaria con JSP y Servlets, por ejemplo:

back-end/java-web/
├── src/main/webapp/
│   ├── login.jsp
│   ├── dashboard.jsp
│   ├── inventory.jsp
│   ├── sales.jsp
│   └── users.jsp
│
└── src/main/java/
    └── servlets/
        ├── LoginServlet.java
        ├── InventoryServlet.java
        ├── SalesServlet.java
        └── UserServlet.java

De esta forma se podría evidenciar directamente:

- Formularios JSP/HTML.
- Métodos GET.
- Métodos POST.
- Servlets.
- Redirección o despacho hacia páginas JSP.

## Conclusión

El proyecto MLBT cumple actualmente con una estructura web frontend organizada y con formularios funcionales. Este documento permite ubicar de forma directa los formularios HTML, la lógica equivalente a GET/POST y el estado actual de páginas JSP.

Una mejora técnica futura es complementar el proyecto con una implementación Java Web basada en JSP y Servlets.
