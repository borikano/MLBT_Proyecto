# Interfaz base HTML, CSS y JavaScript - MLBT

Este módulo conserva la interfaz base del proyecto MLBT construida con HTML, CSS y JavaScript. Su propósito principal es servir como evidencia académica e histórica de la evolución del sistema antes de la interfaz React.

## Alcance

| Elemento | Estado |
|---|---|
| Uso principal | Evidencia académica y referencia funcional. |
| Autenticación | Simulada en cliente mediante datos controlados de prueba. |
| Persistencia | `localStorage` del navegador. |
| Producción | No debe usarse como mecanismo productivo de autenticación. |

## Credenciales controladas de prueba

La interfaz base incluye credenciales ficticias para permitir navegación y validación de formularios durante la revisión académica:

| Usuario | Contraseña | Alcance |
|---|---|---|
| admin@mlbt.com | admin123 | Dato controlado de prueba para evidencia local. |

Estas credenciales no representan secretos reales, no deben reutilizarse en producción y no sustituyen la autenticación JWT implementada en la API Node y la interfaz React.

## Reglas de mantenimiento

- Mantener la separación entre `pages`, `css`, `js` y `assets`.
- No incorporar secretos reales en archivos JavaScript del cliente.
- Documentar cualquier dato de prueba visible como dato controlado.
- Conservar el módulo como referencia histórica salvo que se defina un plan explícito de endurecimiento productivo.
- Preferir la interfaz React para validaciones actuales del sistema MLBT.

## Validación manual sugerida

1. Abrir `index.html` desde un servidor local o entorno compatible.
2. Ingresar con las credenciales controladas de prueba.
3. Validar navegación hacia usuarios, inventario y ventas.
4. Confirmar que los datos se mantienen únicamente en almacenamiento local del navegador.
