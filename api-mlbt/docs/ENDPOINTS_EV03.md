# API MLBT - Endpoints iniciales

## Proyecto

MLBT Project - Maria La Bonita Taqueria

## Evidencia

GA7-220501096-AA5-EV03 - Diseno y Desarrollo de servicios web - proyecto

## URL base local

http://localhost:3001

## Endpoints iniciales

| Metodo | Endpoint | Descripcion | Autenticacion |
|---|---|---|---|
| GET | / | Ruta raiz de la API. | No |
| GET | /api/health | Verifica estado del servicio. | No |

## Respuesta esperada GET /

{
  "ok": true,
  "message": "API MLBT disponible",
  "project": "MLBT Project - Maria La Bonita Taqueria",
  "evidence": "GA7-220501096-AA5-EV03"
}

## Respuesta esperada GET /api/health

{
  "ok": true,
  "service": "api-mlbt",
  "status": "running"
}

## Estado

Endpoints base creados para validar disponibilidad inicial de la API.
