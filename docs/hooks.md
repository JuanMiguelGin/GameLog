# Hooks de React

## Hooks nativos utilizados

### useState

Usado en los componentes de formulario para controlar el valor de cada campo y el estado de envío.

```tsx
const [form, setForm] = useState<CreateGameDTO>({ title: '', platform: 'PC (Steam)', ... })
const [errors, setErrors] = useState<Partial<Record<keyof CreateGameDTO, string>>>({})
const [submitting, setSubmitting] = useState(false)
```

También se usa en `GameDetail` para controlar si el formulario de edición o el de sesión están abiertos:

```tsx
const [editing, setEditing] = useState(false)
const [addingSession, setAddingSession] = useState(false)
```

### useEffect

Usado en `GamesContext` para cargar los datos iniciales de la API cuando el componente se monta. Solo se ejecuta una vez gracias al array de dependencias vacío.

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

### useReducer

Usado en `GamesContext` para gestionar el estado global. Se eligió `useReducer` sobre múltiples `useState` porque el estado tiene varias propiedades relacionadas y las acciones son predecibles. Cada acción describe qué pasó, y el reducer decide cómo cambia el estado.

```tsx
const [state, dispatch] = useReducer(reducer, {
  games: [],
  sessions: [],
  loading: false,
  error: null,
})
```

### useMemo

Usado en `GameDetail` y en `Dashboard` para calcular valores derivados sin recalcularlos en cada render. Solo se recalcula cuando cambian las dependencias.

```tsx
// En GameDetail
const game = useMemo(() => games.find(g => g.id === id), [games, id])
const gameSessions = useMemo(() => sessions.filter(s => s.gameId === id), [sessions, id])

// En Dashboard
const stats = useMemo(() => ({
  total: games.length,
  playing: games.filter(g => g.status === 'playing').length,
  completed: games.filter(g => g.status === 'completed').length,
  totalHours: games.reduce((acc, g) => acc + g.totalHours, 0),
}), [games])
```

### useCallback

Usado en el hook personalizado `useGamesFilter` para estabilizar las funciones que actualizan los filtros. Sin `useCallback`, estas funciones se recrearían en cada render y causarían renders innecesarios en los componentes hijos que las reciben como props.

```tsx
const setSearch = useCallback((search: string) => {
  setFilters(prev => ({ ...prev, search }))
}, [])

const setStatus = useCallback((status: GameStatus | 'all') => {
  setFilters(prev => ({ ...prev, status }))
}, [])
```

### useContext

Usado en todos los componentes que necesitan acceder al estado global. Se accede a través del hook personalizado `useGames`.

```tsx
const { games, sessions, addGame, loading } = useGames()
```

---

## Hook personalizado: useGamesFilter

**Archivo**: `src/hooks/useGamesFilter.ts`

Encapsula la lógica de filtrado de la lista de juegos. Recibe el array de juegos y devuelve los juegos filtrados junto con las funciones para actualizar los filtros.

```tsx
const { filtered, filters, setSearch, setStatus, setPlatform, resetFilters } = useGamesFilter(games)
```

**Por qué es un hook**: la lógica de filtrado (estado de filtros + cálculo de la lista filtrada) puede reutilizarse en cualquier componente que necesite mostrar juegos con filtros. Al extraerla a un hook, el componente queda limpio y la lógica es fácil de testear de forma aislada.

Internamente usa `useState` para los filtros, `useMemo` para calcular la lista filtrada solo cuando cambian los juegos o los filtros, y `useCallback` para estabilizar las funciones de actualización.
