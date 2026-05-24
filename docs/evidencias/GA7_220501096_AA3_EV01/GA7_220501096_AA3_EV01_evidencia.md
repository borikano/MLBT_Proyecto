# Evidencia GA7-220501096-AA3-EV01

## Nombre de la evidencia

Codificación de módulos del software Stand-alone, web y móvil de acuerdo al proyecto a desarrollar.

## Proyecto

MLBT - Sistema administrativo frontend para Maria La Bonita Taqueria.

## Objetivo

Consolidar la codificación del módulo web del proyecto MLBT, evidenciando estructura del proyecto, formularios HTML, lógica de interacción, control de sesión, gestión de datos locales, organización por archivos y uso de versionamiento mediante Git y GitHub.

## Alcance actual

La versión actual del proyecto corresponde a una aplicación web frontend construida con HTML, CSS y JavaScript Vanilla.

El sistema funciona de forma local y offline mediante almacenamiento del navegador, manteniendo una capa inicial de servicios que facilita una futura migración hacia backend.

## Módulos incluidos

| Módulo | Archivos principales | Descripción |
|---|---|---|
| Landing pública | index.html, js/app.js | Presenta el sistema y permite acceso a login. |
| Autenticación | pages/login.html, js/auth.js, js/session.js | Controla inicio de sesión, cierre de sesión y protección de rutas privadas. |
| Dashboard | pages/dashboard.html | Presenta información inicial del usuario autenticado. |
| Usuarios | pages/users.html, pages/users-list.html, js/users.js | Permite administrar usuarios, roles, estados y trazabilidad local. |
| Inventario | pages/inventory.html, js/inventory.js | Permite registrar productos, movimientos y alertas de stock. |
| Ventas | pages/sales.html, js/sales.js | Permite registrar ventas y descontar inventario. |
| Servicios de datos | js/services/ | Centraliza acceso a datos locales y prepara una futura conexión remota. |

## Estructura técnica del proyecto

```text
assets/       Recursos gráficos locales
css/          Estilos, variables, formularios, tablas y componentes
docs/         Documentación técnica del proyecto
js/           Lógica del sistema organizada por dominio
pages/        Páginas HTML públicas y privadas
index.html    Página pública principal
README.md     Documentación general del repositorio
```

## Formularios HTML identificados

| Página | Formulario | Archivo | Propósito |
|---|---|---|---|
| Login | login-form | pages/login.html | Captura credenciales de acceso. |
| Usuarios | user-form | pages/users.html | Registra o administra usuarios. |
| Inventario | inventory-item-form | pages/inventory.html | Registra o actualiza ítems de inventario. |
| Inventario | inventory-movement-form | pages/inventory.html | Registra entradas, salidas o ajustes de inventario. |
| Ventas | sales-form | pages/sales.html | Registra ventas y actualiza inventario. |

## Gestión equivalente a métodos GET y POST

En la versión actual, el proyecto no utiliza envío tradicional con action y method en HTML. Los formularios son controlados desde JavaScript mediante eventos submit y event.preventDefault.

Las operaciones equivalentes a GET se realizan mediante lectura de datos desde servicios JavaScript y almacenamiento local.

Las operaciones equivalentes a POST se realizan mediante captura del envío de formularios, validación de datos y persistencia local.

Documento técnico complementario:

- docs/trazabilidad-formularios-http-jsp.md

## Estado JSP

En la versión actual no se encontraron archivos JSP dentro del repositorio.

El sistema se encuentra implementado como frontend web estático. La documentación técnica deja registrada esta condición y propone una posible ruta de evolución hacia una implementación Java Web con JSP y Servlets.

## Versionamiento

El proyecto utiliza Git y GitHub para el control de versiones.

Ramas vigentes:

- Arawkano: rama estable.
- principal: rama de integración y desarrollo.
- feature/GA7_220501096_AA3_EV01_MLBT: rama de trabajo para esta evidencia.

## Criterios técnicos aplicados

- Separación entre HTML, CSS y JavaScript.
- Organización de lógica por dominio.
- Uso de archivos JavaScript específicos para autenticación, usuarios, inventario y ventas.
- Uso de localStorage encapsulado mediante utilidades y servicios.
- Uso de addEventListener para eventos de interacción.
- Control de sesión local.
- Gestión de roles y permisos.
- Documentación técnica complementaria.
- Versionamiento con Git.

## Resultado esperado

La evidencia permite demostrar la codificación del módulo web del proyecto MLBT, su estructura funcional, su organización técnica, la trazabilidad de formularios y la preparación para una futura evolución hacia backend.

