# Política de seguridad

Este repositorio corresponde al proyecto MLBT - María La Bonita Taquería. El código, la documentación y los datos incluidos se mantienen para revisión técnica, operación controlada, demostración y portafolio profesional.

## Alcance

| Área | Estado |
|---|---|
| Frontend React | Incluido en revisión de seguridad básica. |
| API Node | Incluida en revisión de configuración, autenticación y validación de entradas. |
| Spring Web | Incluido como módulo Java de referencia y validación. |
| Java Web JSP/Servlets | Incluido como módulo Java Web complementario. |
| Credenciales de prueba documentadas | Datos ficticios y controlados, no secretos reales. |

## Reporte de vulnerabilidades

Si encuentra una vulnerabilidad o exposición accidental de información sensible, repórtela de forma privada al mantenedor del repositorio antes de abrir un issue público.

Incluya, si aplica:

- Ruta o archivo afectado.
- Descripción del riesgo.
- Pasos mínimos para reproducirlo.
- Impacto estimado.
- Recomendación de mitigación.

## Criterios de manejo

- No publicar secretos, tokens, contraseñas reales ni cadenas completas de conexión.
- No incluir datos personales reales en pruebas, evidencias o capturas.
- Mantener `.env`, artefactos generados y dependencias instaladas fuera de Git.
- Validar cambios con pruebas automatizadas y el workflow CI antes de considerarlos listos.
- Documentar credenciales de prueba como datos ficticios y controlados cuando sean necesarias para reproducir evidencias.

## Referencias aplicadas

- OWASP Top 10 para riesgos comunes de aplicaciones web.
- OWASP ASVS como referencia básica para autenticación, autorización y configuración segura.
- ISO/IEC 25010 para criterios de calidad, seguridad, mantenibilidad y confiabilidad.
- WCAG 2.2 AA como referencia de accesibilidad en interfaces.
