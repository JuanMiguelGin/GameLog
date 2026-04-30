# Arquitectura y decisiones de diseño

## Visión general

GameLog es una aplicación fullstack con el frontend y el backend en el mismo repositorio. El frontend es una SPA construida con React y el backend es una API REST con Express. Se comunican a través de HTTP usando JSON.

```
Usuario
  ↓
React (SPA) — src/api/client.ts
  ↓  HTTP/JSON
Express API — /api/v1/...
  ↓
Store en memoria (services/store.ts)
```

---

## Frontend

### Estructura de componentes

```
App
├── Sidebar (navegación)
└── Routes
    ├── Dashboard
    │   ├── StatCard (x4)
    │   ├── GameRow (lista jugando ahora)
    │   └── SessionRow (actividad reciente)
    ├── GamesPage
    │   ├── FilterBar
    │   └── GameCard (grid)
    ├── GameDetail
    │   ├── StatusBadge
    │   ├── GameForm (edición)
    │   └── SessionForm
    ├── NewGame
    │   └── GameForm
    ├── SessionsPage
    │   └── SessionRow (lista)
    └── NotFound
```

### Componentes reutilizables

- `GameCard`: tarjeta de juego para el grid de la biblioteca
- `GameForm`: formulario de creación y edición de juegos (recibe `initial` opcional)
- `SessionForm`: formulario para registrar una sesión de juego
- `StatCard`: tarjeta de métrica para el dashboard
- `StatusBadge`: badge de color según el estado del juego
- `Sidebar`: navegación lateral con NavLink activo

### Gestión del estado

El estado global se gestiona con **Context API + useReducer** en `src/context/GamesContext.tsx`. El contexto expone:
- `games`: lista de todos los juegos
- `sessions`: lista de todas las sesiones
- `loading` y `error`: estados de red
- Acciones: `addGame`, `editGame`, `removeGame`, `addSession`, `removeSession`

Se eligió Context + useReducer en lugar de librerías externas (Redux, Zustand) porque la app no tiene una lógica de estado suficientemente compleja como para justificar una dependencia adicional.

### Cliente de API

El cliente tipado está en `src/api/client.ts`. Todas las llamadas a la API pasan por una función `request<T>` genérica que gestiona los headers, el error handling y el tipado de la respuesta. Las URLs se configuran con la variable de entorno `VITE_API_URL`.

### Tipos

Todos los tipos están centralizados en `src/types/index.ts` y son compartidos entre el cliente de API, el contexto y los componentes. Los tipos del backend (`server/src/types.ts`) están separados pero son equivalentes.

---

## Backend

### Arquitectura por capas

```
Request HTTP
  ↓
Routes (src/routes/)         — define las URLs y los verbos HTTP
  ↓
Controllers (src/controllers/) — extrae parámetros, valida, responde
  ↓
Services (src/services/)     — lógica de negocio y acceso a datos
```

Esta separación hace que el código sea más fácil de mantener: si se quisiera cambiar el store en memoria por una base de datos real, solo habría que tocar la capa de servicios.

### Persistencia

Los datos se guardan en memoria (arrays en `services/store.ts`). Esto es suficiente para el alcance de la práctica. Si se quisiera persistencia real se sustituiría el store por una integración con Supabase, MongoDB o cualquier otra base de datos sin tocar controllers ni routes.

### Endpoints REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/v1/games | Lista todos los juegos |
| GET | /api/v1/games/:id | Obtiene un juego |
| POST | /api/v1/games | Crea un juego |
| PATCH | /api/v1/games/:id | Edita un juego |
| DELETE | /api/v1/games/:id | Elimina un juego y sus sesiones |
| GET | /api/v1/sessions | Lista sesiones (acepta ?gameId=) |
| POST | /api/v1/sessions | Registra una sesión |
| DELETE | /api/v1/sessions/:id | Elimina una sesión |

### Decisiones técnicas destacadas

- Al crear una sesión, el backend suma las horas automáticamente al `totalHours` del juego
- Al eliminar una sesión, el backend resta las horas del juego
- Al eliminar un juego, el backend elimina también todas sus sesiones
- CORS habilitado para que el frontend en localhost:5173 pueda llamar a la API en localhost:3001
