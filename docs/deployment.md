# Despliegue

## Opción recomendada: Vercel (frontend + API)

Vercel es ideal para el frontend estático generado por Vite. Para el backend Express necesitamos un servidor Node.js activo, para lo que Railway es la opción más sencilla y tiene tier gratuito.

---

## 1. Desplegar en Vercel

1. Crear cuenta en [Vercel](https://vercel.com)
2. Importar el repositorio desde GitHub
3. En la configuración del proyecto:
   - **Root Directory**: la raíz del repo (donde están `client/`, `api/` y `vercel.json`)
   - **Framework preset**: Vite
4. Deploy

---

## 2. Variables de entorno

En producción **no es necesario** configurar `VITE_API_URL` porque el frontend usa por defecto la API relativa:

- **Base URL**: `/api/v1`

Opcionalmente, puedes definir `VITE_API_URL` para apuntar a otra API (por ejemplo, en desarrollo o si cambias el hosting del backend).

---

## 3. Verificar que todo funciona en producción

Una vez desplegado, comprobar:

- [ ] El frontend carga correctamente en la URL de Vercel
- [ ] Los juegos precargados aparecen en el dashboard
- [ ] Se puede añadir un juego nuevo y persiste al recargar
- [ ] Las sesiones se registran correctamente
- [ ] No hay errores en consola al llamar a `/api/v1/...`

---

## Notas importantes

- Las funciones serverless usan un store en memoria. En entornos serverless, los datos pueden no persistir entre ejecuciones. Si se quisiera persistencia real habría que integrar una base de datos (Supabase, Postgres, etc.).
- El `.env` del frontend **no** se sube a GitHub (está en `.gitignore`). Las variables se configuran en el panel de Vercel si hicieran falta.
