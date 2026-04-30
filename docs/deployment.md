# Despliegue

## Opción recomendada: Vercel (frontend) + Railway (backend)

Vercel es ideal para el frontend estático generado por Vite. Para el backend Express necesitamos un servidor Node.js activo, para lo que Railway es la opción más sencilla y tiene tier gratuito.

---

## 1. Desplegar el backend en Railway

1. Crear cuenta en [railway.app](https://railway.app)
2. Crear un nuevo proyecto → "Deploy from GitHub repo"
3. Seleccionar el repositorio de GameLog
4. En la configuración del servicio:
   - **Root directory**: `server`
   - **Build command**: `npm install && npm run build`
   - **Start command**: `npm start`
5. Railway asignará una URL pública automáticamente (ej: `https://gamelog-server.railway.app`)
6. Copiar esa URL, la necesitarás para el frontend

---

## 2. Desplegar el frontend en Vercel

1. Crear cuenta en [vercel.com](https://vercel.com)
2. Importar el repositorio de GitHub
3. En la configuración del proyecto:
   - **Root directory**: `client`
   - **Framework preset**: Vite (lo detecta automáticamente)
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
4. Añadir la variable de entorno:
   - **Nombre**: `VITE_API_URL`
   - **Valor**: `https://gamelog-server.railway.app/api/v1` (la URL de Railway)
5. Deploy

---

## 3. Verificar que todo funciona en producción

Una vez desplegado, comprobar:

- [ ] El frontend carga correctamente en la URL de Vercel
- [ ] Los juegos precargados aparecen en el dashboard
- [ ] Se puede añadir un juego nuevo y persiste al recargar
- [ ] Las sesiones se registran correctamente
- [ ] No hay errores CORS en la consola del navegador

---

## Variables de entorno

| Variable | Dónde | Valor en producción |
|----------|-------|---------------------|
| `VITE_API_URL` | Vercel (frontend) | URL pública del backend en Railway |
| `PORT` | Railway (backend) | Lo asigna Railway automáticamente |

---

## Notas importantes

- El backend usa un store en memoria, por lo que los datos se pierden cada vez que Railway reinicia el servidor. Esto es normal para el alcance de la práctica. Si se quisiera persistencia real habría que integrar una base de datos como Supabase.
- El archivo `.env` del frontend **no** se sube a GitHub (está en `.gitignore`). La variable de entorno se configura directamente en el panel de Vercel.
