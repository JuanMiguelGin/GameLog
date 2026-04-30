# GameLog 🎮

Biblioteca personal de videojuegos. Registra tus juegos, sesiones de juego y estadísticas en un solo lugar.

## Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + React Router
- **Backend**: Node.js + Express + TypeScript (arquitectura por capas)

## Estructura del repo

```
gamelog/
├── client/          # Frontend React + Vite
│   └── src/
│       ├── api/         # Cliente de API tipado
│       ├── components/  # Componentes reutilizables
│       ├── context/     # Context API (estado global)
│       ├── hooks/       # Custom hooks
│       ├── pages/       # Páginas de la app
│       ├── types/       # Tipos TypeScript
│       └── utils/       # Utilidades
└── server/          # Backend Express
    └── src/
        ├── controllers/ # Lógica de cada endpoint
        ├── routes/      # Definición de rutas
        └── services/    # Lógica de negocio / store
```

## Cómo arrancarlo

### Backend
```bash
cd server
npm install
npm run dev
# API disponible en http://localhost:3001
```

### Frontend
```bash
cd client
npm install
npm run dev
# App disponible en http://localhost:5173
```

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/v1/games | Lista todos los juegos |
| GET | /api/v1/games/:id | Obtiene un juego por id |
| POST | /api/v1/games | Crea un juego nuevo |
| PATCH | /api/v1/games/:id | Edita un juego |
| DELETE | /api/v1/games/:id | Elimina un juego |
| GET | /api/v1/sessions | Lista todas las sesiones |
| POST | /api/v1/sessions | Registra una sesión |
| DELETE | /api/v1/sessions/:id | Elimina una sesión |
