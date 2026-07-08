# GA7_220501096_AA3_EV01 - Estándares técnicos de estructura y codificación

## Propósito

Este documento define los criterios técnicos que deben respetarse durante la preparación y desarrollo de la evidencia GA7_220501096_AA3_EV01 del proyecto MLBT.

## Regla de trazabilidad SENA

Los elementos asociados a evidencias SENA deben nombrarse de forma completa para permitir trazabilidad directa entre repositorio, rama, documentos y entrega.

Convención aplicada:

```text
GA7_220501096_AA3_EV01_MLBT
```

Para esta evidencia se usa:

| Elemento | Nombre aplicado |
|---|---|
| Repositorio principal | MLBT_Proyecto |
| Rama de trabajo | feature/GA7_220501096_AA3_EV01_MLBT |
| Carpeta documental | 03_DOCS/evidencias/GA7_220501096_AA3_EV01/ |
| Documento principal | GA7_220501096_AA3_EV01_evidencia.md |
| Bitácora | GA7_220501096_AA3_EV01_bitacora.md |
| Validación técnica | GA7_220501096_AA3_EV01_validacion_tecnica.md |

## Separación por tipo de código

Todo el código debe separarse por tipo, responsabilidad y tecnología.

| Tipo | Ubicación recomendada | Regla |
|---|---|---|
| HTML | pages/ o vistas equivalentes | Solo estructura de interfaz. |
| JSP | src/main/webapp/ en módulo Java Web | Vista dinámica y formularios, sin lógica sensible. |
| CSS | css/ o assets/css/ | Estilos visuales y reglas de presentación. |
| JavaScript | js/ | Comportamiento frontend, eventos, validaciones de interfaz y consumo de servicios. |
| Java | src/main/java/ | Controladores, modelos, servicios y lógica del servidor. |
| Documentación | 03_DOCS/ | Trazabilidad técnica, bitácoras y validaciones. |

## Regla sobre archivos index

Los archivos index deben funcionar como punto de entrada, presentación inicial o navegación básica.

No deben almacenar:

- Credenciales sensibles.
- Reglas críticas de negocio.
- Lógica de autenticación real.
- Procesamiento de datos sensibles.
- Consultas directas a persistencia.
- Código extenso que pertenezca a controladores, servicios o módulos separados.

En frontend, `index.html` debe limitarse a estructura pública y carga de recursos.

En Java Web, `index.jsp` debe limitarse a entrada o redirección inicial, dejando la lógica en Servlets o clases Java.

## No mezclar marcos ni responsabilidades

El proyecto debe evitar mezclar responsabilidades entre tecnologías.

Reglas:

- HTML o JSP no deben concentrar lógica que corresponda a JavaScript, Servlets o servicios.
- CSS no debe incluirse embebido dentro de páginas salvo casos mínimos y justificados.
- JavaScript no debe reemplazar reglas críticas que deban vivir en backend cuando exista servidor.
- Java no debe mezclarse con responsabilidades visuales más allá del despacho hacia vistas.
- La documentación no debe contener código funcional que deba vivir en archivos fuente.

## Organización recomendada para módulo Java Web

Si se agrega un módulo Java Web, debe mantener estructura separada:

```text
02_BACK_END/03_JAVA_WEB/
├── pom.xml
├── src/main/java/
│   └── com/mlbt/
│       ├── controller/
│       ├── model/
│       ├── repository/
│       └── service/
└── src/main/webapp/
    ├── assets/css/
    ├── WEB-INF/
    └── *.jsp
```

Responsabilidades:

| Capa | Responsabilidad |
|---|---|
| controller | Recibir solicitudes HTTP y coordinar respuestas. |
| model | Representar entidades del dominio. |
| repository | Gestionar acceso a datos. |
| service | Implementar reglas de negocio. |
| webapp/*.jsp | Renderizar vistas y formularios. |
| webapp/assets/css | Centralizar estilos del módulo Java Web. |

## Seguridad básica de estructura

- No dejar credenciales reales en archivos públicos.
- No guardar información sensible en index.
- No incluir claves, tokens ni contraseñas productivas en el repositorio.
- No duplicar lógica de permisos en múltiples archivos sin necesidad.
- Centralizar reglas críticas en módulos o clases específicas.
- Mantener los formularios separados de la lógica de procesamiento.

## Criterio de entrega

La entrega debe permitir identificar claramente:

- Qué módulo se codificó.
- Qué archivos pertenecen a vistas.
- Qué archivos pertenecen a estilos.
- Qué archivos pertenecen a lógica frontend.
- Qué archivos pertenecen a lógica Java, si aplica.
- Qué formularios existen.
- Qué operaciones usan GET o POST.
- Qué documentos respaldan la validación técnica.

## Conclusión

La evidencia debe conservar una estructura clara, trazable y separada por tipo de tecnología. Esta organización facilita revisión, mantenimiento, seguridad y continuidad del proyecto.
