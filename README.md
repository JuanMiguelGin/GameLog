![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
 
# 🎮 GameLog
 
> Tu biblioteca personal de videojuegos, sin importar la plataforma.
 
Aplicación web fullstack para registrar y organizar tu colección de videojuegos. Lleva un seguimiento de tus horas de juego, el estado de cada título y tu historial de sesiones, todo en un solo lugar.
 
| Despliegue | URL |
|------------|-----|
| Frontend | [game-log-mocha.vercel.app](https://game-log-mocha.vercel.app) |
| Tablero Trello | [trello.com/b/zMwL9r1f/gamelog](https://trello.com/b/zMwL9r1f/gamelog) |
 
---
 
## Características
 
- Añade juegos de cualquier plataforma (Steam, PlayStation, Switch, Xbox...)
- Filtra tu biblioteca por estado: jugando, completado, pendiente o abandonado
- Registra sesiones de juego con fecha y horas, el total se calcula automáticamente
- Dashboard con estadísticas: juegos totales, horas acumuladas y actividad reciente
- Modo oscuro con preferencia guardada en el navegador
- Diseño responsive adaptado a móvil y escritorio
---
 
## Tecnologías
 
| Frontend | Uso |
|----------|-----|
| React 18 | Librería principal de UI con componentes funcionales |
| TypeScript | Tipado estático en todo el proyecto |
| Tailwind CSS | Estilos y diseño responsive |
| React Router v6 | Navegación entre páginas |
| Context API + useReducer | Estado global de juegos y sesiones |
 
| Backend | Uso |
|---------|-----|
| Node.js + Express | Servidor y API REST |
| TypeScript | Tipado en controllers, services y routes |
| Vercel Serverless Functions | Despliegue del backend en producción |
 
| Auxiliares | Uso |
|------------|-----|
| Vite | Bundler y servidor de desarrollo |
| uuid | Generación de IDs únicos |
| localStorage | Caché de datos en el cliente |
 
---
 
## Estructura del proyecto
 
```
GameLog/
├── api/                        # Backend serverless (Vercel Functions)
│   ├── _store.ts               # Store compartido en memoria
│   └── v1/
│       ├── games.ts            # GET y POST /api/v1/games
│       ├── games/[id].ts       # GET, PATCH, DELETE /api/v1/games/:id
│       ├── sessions.ts         # GET y POST /api/v1/sessions
│       └── sessions/[id].ts    # DELETE /api/v1/sessions/:id
├── client/                     # Frontend React + Vite
│   └── src/
│       ├── api/                # Cliente de API tipado
│       ├── components/         # Componentes reutilizables
│       ├── context/            # Context API (estado global y tema)
│       ├── hooks/              # Custom hooks
│       ├── pages/              # Páginas de la app
│       ├── types/              # Tipos TypeScript
│       └── utils/              # Utilidades
├── server/                     # Backend Express (desarrollo local)
│   └── src/
│       ├── controllers/
│       ├── routes/
│       └── services/
├── docs/                       # Documentación del proyecto
├── vercel.json                 # Configuración de despliegue
└── README.md
```
 
---
 
## Descargar y ejecutar
 
```bash
git clone https://github.com/JuanMiguelGin/GameLog.git
cd GameLog
```
 
Arrancar el frontend:
 
```bash
cd client
npm install
npm run dev
# App disponible en http://localhost:5173
```
 
Arrancar el backend en local (opcional):
 
```bash
cd server
npm install
npm run dev
# API disponible en http://localhost:3001
```
 
---
 
## Desplegar en Vercel
 
### Frontend + Backend 
 
1. Importa el repositorio desde [vercel.com](https://vercel.com)
2. Vercel leerá el `vercel.json` automáticamente
3. No hace falta configurar variables de entorno — la API está en la misma URL
4. Dale a **Deploy**
---
 
*Desarrollado durante las prácticas en [Corner Estudios](https://www.corner-estudios.com) — Juan Miguel — 2026*