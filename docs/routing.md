# Rutas y navegación

## Configuración

La navegación está gestionada con **React Router v6**. El router se configura en `App.tsx` envolviendo toda la aplicación en `BrowserRouter`.

## Estructura de rutas

```
/                   → Dashboard (resumen general)
/games              → GamesPage (biblioteca completa)
/games/new          → NewGame (formulario de creación)
/games/:id          → GameDetail (detalle y edición de un juego)
/sessions           → SessionsPage (historial de sesiones)
*                   → NotFound (página 404)
```

### Código de configuración

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/games" element={<GamesPage />} />
    <Route path="/games/new" element={<NewGame />} />
    <Route path="/games/:id" element={<GameDetail />} />
    <Route path="/sessions" element={<SessionsPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

## Navegación entre páginas

### NavLink (Sidebar)

El componente `Sidebar` usa `NavLink` en lugar de `Link` porque `NavLink` recibe una función como `className` que indica si la ruta está activa. Así se aplican los estilos de color púrpura automáticamente sin lógica manual:

```tsx
<NavLink
  to="/games"
  className={({ isActive }) =>
    isActive ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-500'
  }
>
  Mis juegos
</NavLink>
```

### useNavigate (navegación programática)

En los componentes que necesitan navegar como resultado de una acción (enviar un formulario, eliminar un juego) se usa el hook `useNavigate`:

```tsx
const navigate = useNavigate()

// Después de crear un juego
await addGame(dto)
navigate('/games')

// Botón de volver
navigate(-1)
```

### useParams (parámetros de ruta)

En `GameDetail` se usa `useParams` para obtener el `id` del juego desde la URL:

```tsx
const { id } = useParams<{ id: string }>()
const game = games.find(g => g.id === id)
```

## Página 404

La ruta `path="*"` captura cualquier URL que no coincida con las anteriores y renderiza el componente `NotFound`, que muestra un mensaje y un botón para volver al inicio.
