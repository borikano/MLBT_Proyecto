# Evidencia GA7-220501096-AA3-EV01

## Nombre de la evidencia

Codificación de módulos del software Stand-alone, web y móvil de acuerdo al proyecto a desarrollar.

## Proyecto

MLBT - María La Bonita Taquería.

## Objetivo

Consolidar la codificación de módulos web del proyecto MLBT, evidenciando estructura, formularios, lógica de interacción, módulos Java, organización por responsabilidades y versionamiento con Git y GitHub.

## Estado consolidado de la evidencia

La evidencia reúne dos líneas técnicas complementarias:

| Línea | Ruta | Propósito |
|---|---|---|
| Interfaz base HTML, CSS y JavaScript | 01_FRONT_END/02_INTERFAZ_BASE | Base funcional histórica del proyecto. |
| Java Web JSP y Servlets | 02_BACK_END/03_JAVA_WEB | Complemento técnico para evidenciar formularios JSP, GET, POST y Servlets. |
| Spring Web | 02_BACK_END/02_SPRING_WEB | Módulo principal funcional con Spring Boot, Thymeleaf y persistencia. |

## Alcance funcional documentado

- Navegación entre dashboard, usuarios, inventario y ventas.
- Formularios de login, usuarios, inventario y ventas.
- Separación de vistas, estilos, lógica frontend y módulos Java.
- Persistencia local en la interfaz base.
- Persistencia en MySQL/MariaDB en el módulo Spring Web.
- JSP y Servlets en el módulo Java Web complementario.
- Documentación técnica, bitácora, validaciones y cierre.

## Estructura técnica principal

| Elemento | Ruta |
|---|---|
| Interfaz base | 01_FRONT_END/02_INTERFAZ_BASE |
| Módulo Spring Web | 02_BACK_END/02_SPRING_WEB |
| Módulo Java Web | 02_BACK_END/03_JAVA_WEB |
| Documentación de evidencias | 03_DOCS/evidencias/GA7_220501096_AA3_EV01 |
| Trazabilidad formularios HTTP JSP | 03_DOCS/trazabilidad-formularios-http-jsp.md |

## Formularios identificados

| Contexto | Formulario o vista | Propósito |
|---|---|---|
| Interfaz base | login.html | Captura credenciales de acceso. |
| Interfaz base | users.html | Administra usuarios. |
| Interfaz base | inventory.html | Administra inventario y movimientos. |
| Interfaz base | sales.html | Registra ventas y actualiza inventario. |
| Java Web | login.jsp | Evidencia formulario POST de login. |
| Java Web | users.jsp | Evidencia consultas GET y registros POST. |
| Java Web | inventory.jsp | Evidencia consultas GET y registros POST. |
| Java Web | sales.jsp | Evidencia consultas GET y registros POST. |

## Versionamiento

El proyecto utiliza Git y GitHub para el control de versiones.

| Rama | Propósito |
|---|---|
| Arawkano | Rama estable del proyecto. |
| principal | Rama de integración y trabajo controlado. |
| feature/GA7_220501096_AA3_EV01_MLBT | Rama histórica de trabajo para esta evidencia. |

## Criterios técnicos aplicados

- Separación entre HTML, CSS y JavaScript.
- Separación entre JSP, Servlets, modelos y servicios.
- Organización por dominios funcionales.
- Uso de documentación técnica complementaria.
- Uso de ramas, commits, PR y cierre documentado.
- Uso de módulos separados para evitar mezclar responsabilidades.

## Resultado

La evidencia demuestra la codificación de módulos web del proyecto MLBT mediante una base frontend, un módulo Java Web complementario y un módulo Spring Web funcional, manteniendo trazabilidad documental y versionamiento.
