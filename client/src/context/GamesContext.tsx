import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { Game, Session, CreateGameDTO, UpdateGameDTO, CreateSessionDTO } from '../types'
import * as api from '../api/client'

interface State {
  games: Game[]
  sessions: Session[]
  loading: boolean
  error: string | null
}

type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_GAMES'; payload: Game[] }
  | { type: 'ADD_GAME'; payload: Game }
  | { type: 'UPDATE_GAME'; payload: Game }
  | { type: 'DELETE_GAME'; payload: string }
  | { type: 'SET_SESSIONS'; payload: Session[] }
  | { type: 'ADD_SESSION'; payload: Session }
  | { type: 'DELETE_SESSION'; payload: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null }
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'SET_GAMES':
      return { ...state, loading: false, games: action.payload }
    case 'ADD_GAME':
      return { ...state, games: [...state.games, action.payload] }
    case 'UPDATE_GAME':
      return {
        ...state,
        games: state.games.map(g => (g.id === action.payload.id ? action.payload : g)),
      }
    case 'DELETE_GAME':
      return {
        ...state,
        games: state.games.filter(g => g.id !== action.payload),
        sessions: state.sessions.filter(s => s.gameId !== action.payload),
      }
    case 'SET_SESSIONS':
      return { ...state, sessions: action.payload }
    case 'ADD_SESSION':
      return {
        ...state,
        sessions: [action.payload, ...state.sessions],
        games: state.games.map(g =>
          g.id === action.payload.gameId
            ? { ...g, totalHours: g.totalHours + action.payload.hours }
            : g
        ),
      }
    case 'DELETE_SESSION':
      return { ...state, sessions: state.sessions.filter(s => s.id !== action.payload) }
    default:
      return state
  }
}

interface ContextValue extends State {
  addGame: (dto: CreateGameDTO) => Promise<void>
  editGame: (id: string, dto: UpdateGameDTO) => Promise<void>
  removeGame: (id: string) => Promise<void>
  addSession: (dto: CreateSessionDTO) => Promise<void>
  removeSession: (id: string) => Promise<void>
}

const GamesContext = createContext<ContextValue | null>(null)

export function GamesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    games: [],
    sessions: [],
    loading: false,
    error: null,
  })

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' })
    Promise.all([api.getGames(), api.getSessions()])
      .then(([games, sessions]) => {
        dispatch({ type: 'SET_GAMES', payload: games })
        dispatch({ type: 'SET_SESSIONS', payload: sessions })
      })
      .catch(err => dispatch({ type: 'SET_ERROR', payload: err.message }))
  }, [])

  async function addGame(dto: CreateGameDTO) {
    const game = await api.createGame(dto)
    dispatch({ type: 'ADD_GAME', payload: game })
  }

  async function editGame(id: string, dto: UpdateGameDTO) {
    const game = await api.updateGame(id, dto)
    dispatch({ type: 'UPDATE_GAME', payload: game })
  }

  async function removeGame(id: string) {
    await api.deleteGame(id)
    dispatch({ type: 'DELETE_GAME', payload: id })
  }

  async function addSession(dto: CreateSessionDTO) {
    const session = await api.createSession(dto)
    dispatch({ type: 'ADD_SESSION', payload: session })
  }

  async function removeSession(id: string) {
    await api.deleteSession(id)
    dispatch({ type: 'DELETE_SESSION', payload: id })
  }

  return (
    <GamesContext.Provider value={{ ...state, addGame, editGame, removeGame, addSession, removeSession }}>
      {children}
    </GamesContext.Provider>
  )
}

export function useGames() {
  const ctx = useContext(GamesContext)
  if (!ctx) throw new Error('useGames must be used inside GamesProvider')
  return ctx
}
