![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
 
# 🎮 GameLog
 
> Tu biblioteca personal de videojuegos, sin importar la plataforma.
 
Aplicación web fullstack para registrar y organizar tu colección de videojuegos. Lleva un seguimiento de tus horas de juego, el estado de cada título y tu historial de sesiones, con sistema de usuarios real y base de datos en la nube.
 
| Despliegue | URL |
|------------|-----|
| Frontend | [game-log-mocha.vercel.app](https://game-log-mocha.vercel.app) |
| Tablero Trello | [trello.com/b/zMwL9r1f/gamelog](https://trello.com/b/zMwL9r1f/gamelog) |
 
---
 
## Características
 
- Registro e inicio de sesión con email y contraseña mediante Firebase Auth
- Cada usuario tiene su propia biblioteca privada asociada a su cuenta
- Añade juegos de cualquier plataforma (Steam, PlayStation, Switch, Xbox...)
- Filtra tu biblioteca por estado: jugando, completado, pendiente o abandonado
- Registra, edita y elimina sesiones de juego — las horas se actualizan automáticamente
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
| Context API + useReducer | Estado global de juegos, sesiones y autenticación |
 
| Backend | Uso |
|---------|-----|
| Firebase Auth | Registro e inicio de sesión con email y contraseña |
| Supabase (PostgreSQL) | Base de datos relacional en la nube |
| Vercel Serverless Functions | API REST desplegada junto al frontend |
 
| Auxiliares | Uso |
|------------|-----|
| Vite | Bundler y servidor de desarrollo |
| React Router | Enrutado client-side con página 404 |
| uuid | Generación de IDs únicos |
 
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
│       ├── api/                # Cliente de Supabase tipado
│       ├── components/         # Componentes reutilizables
│       ├── context/            # AuthContext, GamesContext, ThemeContext
│       ├── hooks/              # Custom hooks
│       ├── lib/                # Configuración de Firebase y Supabase
│       ├── pages/              # Páginas de la app
│       ├── types/              # Tipos TypeScript
│       └── utils/              # Utilidades
├── docs/                       # Documentación del proyecto
├── vercel.json                 # Configuración de despliegue
└── README.md
```
 
---
 
## Descargar y ejecutar
 
```bash
git clone https://github.com/JuanMiguelGin/GameLog.git
cd GameLog/client
npm install
npm run dev
```
 
Crea un archivo `.env` en `client/` con tus credenciales de Firebase y Supabase.
 
---
 
## Desplegar en Vercel
 
### Frontend + Backend
 
1. Importa el repositorio desde [vercel.com](https://vercel.com)
2. Deja el **Root Directory** vacío — Vercel leerá el `vercel.json` automáticamente
3. Añade las variables de entorno en **Settings → Environment Variables**
4. Dale a **Deploy**
### Base de datos (Supabase)
 
1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ejecuta el SQL de creación de tablas desde el **SQL Editor**
3. Copia la **Project URL** y la **Publishable key** al `.env`
---
 
*Desarrollado durante las prácticas en [Corner Estudios](https://www.corner-estudios.com) — Juan Miguel — 2026*