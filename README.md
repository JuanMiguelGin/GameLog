# GameLog 🎮
 
> Biblioteca personal de videojuegos. Registra tus juegos, sesiones de juego y estadísticas en un solo lugar, sin importar la plataforma.
 
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
 
---
 
## 🔗 Enlaces
 
| | URL |
|---|---|
| 🌐 App desplegada | https://game-log-mocha.vercel.app/ |
| 🗂 Tablero Trello | https://trello.com/b/zMwL9r1f/gamelog |
 
---
 
## 🛠 Stack
 
| Parte | Tecnología |
|-------|-----------|
| Frontend | React 18 + TypeScript + Tailwind CSS |
| Routing | React Router v6 |
| Estado global | Context API + useReducer |
| Backend | Node.js + Express + TypeScript |
| Arquitectura | Capas: routes → controllers → services |
 
---
 
## 📁 Estructura del repo
 
```
gamelog/
├── client/                  # Frontend React + Vite
│   └── src/
│       ├── api/             # Cliente de API tipado
│       ├── components/      # Componentes reutilizables
│       ├── context/         # Context API (estado global)
│       ├── hooks/           # Custom hooks
│       ├── pages/           # Páginas de la app
│       ├── types/           # Tipos TypeScript
│       └── utils/           # Utilidades
├── server/                  # Backend Express
│   └── src/
│       ├── controllers/     # Lógica de cada endpoint
│       ├── routes/          # Definición de rutas
│       └── services/        # Lógica de negocio / store
└── docs/                    # Documentación del proyecto
```
 
---
 
## 🚀 Cómo arrancarlo
 
### 1. Backend
 
```bash
cd server
npm install
npm run dev
# API disponible en http://localhost:3001
```
 
### 2. Frontend
 
```bash
cd client
npm install
npm run dev
# App disponible en http://localhost:5173
```
 
> Asegúrate de arrancar el backend **antes** que el frontend.
 
---
 
## 📡 API Endpoints
 
### Juegos
 
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/v1/games` | Lista todos los juegos |
| `GET` | `/api/v1/games/:id` | Obtiene un juego por id |
| `POST` | `/api/v1/games` | Crea un juego nuevo |
| `PATCH` | `/api/v1/games/:id` | Edita un juego |
| `DELETE` | `/api/v1/games/:id` | Elimina un juego y sus sesiones |
 
### Sesiones
 
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/v1/sessions` | Lista todas las sesiones |
| `GET` | `/api/v1/sessions?gameId=:id` | Filtra sesiones por juego |
| `POST` | `/api/v1/sessions` | Registra una sesión |
| `DELETE` | `/api/v1/sessions/:id` | Elimina una sesión |
 
---
 
## 📚 Documentación
 
Toda la documentación del proyecto está en la carpeta [`docs/`](./docs):
 
| Archivo | Contenido |
|---------|-----------|
| [`agile.md`](./docs/agile.md) | Metodologías Agile, Scrum y Kanban |
| [`idea.md`](./docs/idea.md) | Idea y definición del proyecto |
| [`project-management.md`](./docs/project-management.md) | Gestión y organización del trabajo |
| [`design.md`](./docs/design.md) | Arquitectura y decisiones técnicas |
| [`components.md`](./docs/components.md) | Documentación de componentes |
| [`hooks.md`](./docs/hooks.md) | Hooks nativos y personalizados |
| [`context.md`](./docs/context.md) | Context API y estado global |
| [`routing.md`](./docs/routing.md) | Rutas y navegación |
| [`forms.md`](./docs/forms.md) | Formularios e interacción |
| [`api.md`](./docs/api.md) | Endpoints con ejemplos de request/response |
| [`testing.md`](./docs/testing.md) | Pruebas manuales realizadas |
| [`deployment.md`](./docs/deployment.md) | Proceso de despliegue |
| [`retrospective.md`](./docs/retrospective.md) | Reflexión final del proyecto |