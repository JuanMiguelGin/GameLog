# Context API y estado global

## ¿Por qué Context API?

GameLog necesita compartir los datos de juegos y sesiones entre varias páginas: el Dashboard los muestra resumidos, GamesPage los muestra en grid, GameDetail muestra uno concreto y SessionsPage muestra todas las sesiones. Sin un estado global, habría que pasar estos datos de componente en componente mediante props, lo que se complica rápido.

Context API es la solución nativa de React para este problema. Permite que cualquier componente del árbol acceda al estado sin necesidad de prop drilling.

---

## Implementación

**Archivo**: `src/context/GamesContext.tsx`

### Estructura del estado

```ts
interface State {
  games: Game[]
  sessions: Session[]
  loading: boolean
  error: string | null
}
```

### Acciones del reducer

El estado se gestiona con `useReducer`. Cada acción describe un cambio concreto:

| Acción | Qué hace |
|--------|----------|
| `SET_LOADING` | Activa el estado de carga |
| `SET_ERROR` | Guarda el mensaje de error |
| `SET_GAMES` | Reemplaza la lista completa de juegos |
| `ADD_GAME` | Añade un juego al array |
| `UPDATE_GAME` | Reemplaza un juego por su id |
| `DELETE_GAME` | Elimina un juego y sus sesiones |
| `SET_SESSIONS` | Reemplaza la lista completa de sesiones |
| `ADD_SESSION` | Añade una sesión y actualiza las horas del juego |
| `DELETE_SESSION` | Elimina una sesión |

### Carga inicial de datos

Cuando el Provider se monta, hace las dos llamadas a la API en paralelo con `Promise.all` y carga los datos en el estado:

```tsx
useEffect(() => {
  dispatch({ type: 'SET_LOADING' })
  Promise.all([api.getGames(), api.getSessions()])
    .then(([games, sessions]) => {
      dispatch({ type: 'SET_GAMES', payload: games })
      dispatch({ type: 'SET_SESSIONS', payload: sessions })
    })
    .catch(err => dispatch({ type: 'SET_ERROR', payload: err.message }))
}, [])
```

### Hook personalizado useGames

Para consumir el contexto de forma cómoda y con control de errores, se exporta un hook que encapsula `useContext`:

```tsx
export function useGames() {
  const ctx = useContext(GamesContext)
  if (!ctx) throw new Error('useGames must be used inside GamesProvider')
  return ctx
}
```

Si alguien usa `useGames` fuera del Provider, el error es claro y descriptivo en lugar de un fallo silencioso.

### Uso en los componentes

```tsx
// En cualquier componente dentro del Provider
const { games, sessions, loading, error, addGame } = useGames()
```

---

## ¿Cuándo usar Context API?

Context es útil cuando:
- Varios componentes no relacionados directamente necesitan el mismo dato
- Pasar props se vuelve tedioso porque hay muchos niveles de componentes intermedios
- El estado cambia con acciones predecibles (añadir, editar, eliminar)

Context **no** es la solución ideal cuando:
- El estado cambia muy frecuentemente (puede causar muchos renders)
- Solo lo necesita un componente o sus hijos directos (ahí basta con useState local)
- La app es muy grande y compleja (en ese caso librerías como Zustand o Redux son más apropiadas)
