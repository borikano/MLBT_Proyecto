# Interfaz base HTML, CSS y JavaScript - MLBT

Este módulo conserva la interfaz base del proyecto MLBT construida con HTML, CSS y JavaScript. Su propósito principal es servir como referencia histórica de la evolución del sistema antes de la interfaz React.

## Alcance

| Elemento | Estado |
|---|---|
| Uso principal | Referencia histórica y funcional. |
| Autenticación | Simulada en cliente mediante datos controlados de prueba. |
| Persistencia | `localStorage` del navegador. |
| Producción | No debe usarse como mecanismo productivo de autenticación. |

## Credenciales

Las credenciales de validación se gestionan fuera del repositorio. Este módulo histórico conserva datos de prueba embebidos en el cliente; no deben reutilizarse en producción ni sustituir la autenticación JWT de la API Node y la interfaz React.

## Reglas de mantenimiento

- Mantener la separación entre `pages`, `css`, `js` y `assets`.
- No incorporar secretos reales en archivos JavaScript del cliente.
- Documentar cualquier dato de prueba visible como dato controlado.
- Conservar el módulo como referencia histórica salvo que se defina un plan explícito de endurecimiento productivo.
- Preferir la interfaz React para validaciones actuales del sistema MLBT.

## Validación manual sugerida

1. Abrir `index.html` desde un servidor local o entorno compatible.
2. Validar navegación entre páginas y formularios con datos controlados del entorno local.
3. Validar navegación hacia usuarios, inventario y ventas.
4. Confirmar que los datos se mantienen únicamente en almacenamiento local del navegador.
