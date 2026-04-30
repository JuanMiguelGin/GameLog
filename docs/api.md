# API REST — Documentación de endpoints

## Base URL

```
http://localhost:3001/api/v1
```

En producción se configura con la variable de entorno `VITE_API_URL` en el frontend.

## Formato de respuesta

Todas las respuestas siguen el mismo formato:

```json
{ "data": <resultado> }
```

En caso de error:

```json
{ "error": "Bad request", "message": "Descripción del error" }
```

---

## Juegos

### GET /games

Devuelve todos los juegos.

**Response 200:**
```json
{
  "data": [
    {
      "id": "abc123",
      "title": "Elden Ring",
      "platform": "PC (Steam)",
      "genre": "RPG",
      "status": "playing",
      "totalHours": 42,
      "notes": "En Farum Azula",
      "createdAt": "2026-04-30T10:00:00.000Z",
      "updatedAt": "2026-04-30T10:00:00.000Z"
    }
  ]
}
```

---

### GET /games/:id

Devuelve un juego por su id.

**Response 200:** igual que el objeto de arriba pero sin array.

**Response 404:**
```json
{ "error": "Not found", "message": "Game not found" }
```

---

### POST /games

Crea un juego nuevo.

**Body:**
```json
{
  "title": "Hollow Knight",
  "platform": "Nintendo Switch",
  "genre": "Metroidvania",
  "status": "completed",
  "notes": "Final verdadero conseguido"
}
```

Campos obligatorios: `title`, `platform`, `genre`, `status`. El campo `notes` es opcional.

**Response 201:**
```json
{
  "data": {
    "id": "xyz789",
    "title": "Hollow Knight",
    "platform": "Nintendo Switch",
    "genre": "Metroidvania",
    "status": "completed",
    "totalHours": 0,
    "notes": "Final verdadero conseguido",
    "createdAt": "2026-04-30T11:00:00.000Z",
    "updatedAt": "2026-04-30T11:00:00.000Z"
  }
}
```

**Response 400:**
```json
{ "error": "Bad request", "message": "title, platform, genre and status are required" }
```

---

### PATCH /games/:id

Edita uno o varios campos de un juego. Solo hay que enviar los campos que se quieren cambiar.

**Body:**
```json
{
  "status": "completed",
  "notes": "Platino conseguido"
}
```

**Response 200:** devuelve el juego actualizado completo.

**Response 404:**
```json
{ "error": "Not found", "message": "Game not found" }
```

---

### DELETE /games/:id

Elimina un juego y todas sus sesiones asociadas.

**Response 200:**
```json
{ "data": null, "message": "Game deleted" }
```

**Response 404:**
```json
{ "error": "Not found", "message": "Game not found" }
```

---

## Sesiones

### GET /sessions

Devuelve todas las sesiones ordenadas por fecha de creación descendente. Acepta un query param opcional para filtrar por juego.

**Query params opcionales:**
- `gameId` — filtra las sesiones de un juego concreto

```
GET /api/v1/sessions
GET /api/v1/sessions?gameId=abc123
```

**Response 200:**
```json
{
  "data": [
    {
      "id": "ses001",
      "gameId": "abc123",
      "gameTitle": "Elden Ring",
      "hours": 2.5,
      "date": "2026-04-30",
      "createdAt": "2026-04-30T20:00:00.000Z"
    }
  ]
}
```

---

### POST /sessions

Registra una nueva sesión. El backend suma automáticamente las horas al `totalHours` del juego.

**Body:**
```json
{
  "gameId": "abc123",
  "hours": 2.5,
  "date": "2026-04-30"
}
```

Todos los campos son obligatorios. `hours` debe ser un número positivo.

**Response 201:**
```json
{
  "data": {
    "id": "ses001",
    "gameId": "abc123",
    "gameTitle": "Elden Ring",
    "hours": 2.5,
    "date": "2026-04-30",
    "createdAt": "2026-04-30T20:00:00.000Z"
  }
}
```

**Response 400:**
```json
{ "error": "Bad request", "message": "gameId, hours and date are required" }
```

**Response 404:**
```json
{ "error": "Not found", "message": "Game not found" }
```

---

### DELETE /sessions/:id

Elimina una sesión y resta sus horas del `totalHours` del juego correspondiente.

**Response 200:**
```json
{ "data": null, "message": "Session deleted" }
```

**Response 404:**
```json
{ "error": "Not found", "message": "Session not found" }
```

---

## Health check

### GET /health

Comprueba que la API está funcionando.

**Response 200:**
```json
{ "status": "ok" }
```
