import { createContext, useReducer, useEffect, type ReactNode } from 'react'
import type { Game, Session, CreateGameDTO, UpdateGameDTO, CreateSessionDTO, UpdateSessionDTO } from '../types'
import * as db from '../api/supabase'
import { useAuth } from './AuthContext'

interface State {
  games: Game[]
  sessions: Session[]
  loading: boolean
  error: string | null
}

type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_DATA'; payload: { games: Game[]; sessions: Session[] } }
  | { type: 'ADD_GAME'; payload: Game }
  | { type: 'UPDATE_GAME'; payload: Game }
  | { type: 'DELETE_GAME'; payload: string }
  | { type: 'ADD_SESSION'; payload: Session }
  | { type: 'UPDATE_SESSION'; payload: { session: Session; oldHours: number } }
  | { type: 'DELETE_SESSION'; payload: { id: string; hours: number; gameId: string } }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null }
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'SET_DATA':
      return { ...state, loading: false, games: action.payload.games, sessions: action.payload.sessions }
    case 'ADD_GAME':
      return { ...state, games: [action.payload, ...state.games] }
    case 'UPDATE_GAME':
      return { ...state, games: state.games.map(g => g.id === action.payload.id ? action.payload : g) }
    case 'DELETE_GAME':
      return {
        ...state,
        games: state.games.filter(g => g.id !== action.payload),
        sessions: state.sessions.filter(s => s.gameId !== action.payload),
      }
    case 'ADD_SESSION': {
      const session = action.payload
      return {
        ...state,
        sessions: [session, ...state.sessions],
        games: state.games.map(g =>
          g.id === session.gameId ? { ...g, totalHours: +(g.totalHours + session.hours).toFixed(1) } : g
        ),
      }
    }
    case 'UPDATE_SESSION': {
      const { session, oldHours } = action.payload
      const delta = session.hours - oldHours
      return {
        ...state,
        sessions: state.sessions.map(s => s.id === session.id ? session : s),
        games: state.games.map(g =>
          g.id === session.gameId ? { ...g, totalHours: +(g.totalHours + delta).toFixed(1) } : g
        ),
      }
    }
    case 'DELETE_SESSION':
      return {
        ...state,
        sessions: state.sessions.filter(s => s.id !== action.payload.id),
        games: state.games.map(g =>
          g.id === action.payload.gameId
            ? { ...g, totalHours: +Math.max(0, g.totalHours - action.payload.hours).toFixed(1) }
            : g
        ),
      }
    default:
      return state
  }
}

interface ContextValue extends State {
  addGame: (dto: CreateGameDTO) => Promise<void>
  editGame: (id: string, dto: UpdateGameDTO) => Promise<void>
  removeGame: (id: string) => Promise<void>
  addSession: (dto: CreateSessionDTO) => Promise<void>
  editSession: (id: string, dto: UpdateSessionDTO, oldHours: number, gameId: string) => Promise<void>
  removeSession: (id: string, hours: number, gameId: string) => Promise<void>
}

const GamesContext = createContext<ContextValue | null>(null)

export function GamesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(reducer, {
    games: [], sessions: [], loading: false, error: null,
  })

  useEffect(() => {
    if (!user) {
      dispatch({ type: 'SET_DATA', payload: { games: [], sessions: [] } })
      return
    }
    dispatch({ type: 'SET_LOADING' })
    Promise.all([db.getGames(user.uid), db.getSessions(user.uid)])
      .then(([games, sessions]) => dispatch({ type: 'SET_DATA', payload: { games, sessions } }))
      .catch(err => dispatch({ type: 'SET_ERROR', payload: err.message }))
  }, [user])

  async function addGame(dto: CreateGameDTO) {
    if (!user) return
    const game = await db.createGame(user.uid, dto)
    dispatch({ type: 'ADD_GAME', payload: game })
  }

  async function editGame(id: string, dto: UpdateGameDTO) {
    const game = await db.updateGame(id, dto)
    dispatch({ type: 'UPDATE_GAME', payload: game })
  }

  async function removeGame(id: string) {
    await db.deleteGame(id)
    dispatch({ type: 'DELETE_GAME', payload: id })
  }

  async function addSession(dto: CreateSessionDTO) {
    if (!user) return
    const gameTitle = state.games.find(g => g.id === dto.gameId)?.title ?? ''
    const session = await db.createSession(user.uid, dto, gameTitle)
    dispatch({ type: 'ADD_SESSION', payload: session })
  }

  async function editSession(id: string, dto: UpdateSessionDTO, oldHours: number, gameId: string) {
    const session = await db.updateSession(id, dto, oldHours, gameId)
    dispatch({ type: 'UPDATE_SESSION', payload: { session, oldHours } })
  }

  async function removeSession(id: string, hours: number, gameId: string) {
    await db.deleteSession(id, hours, gameId)
    dispatch({ type: 'DELETE_SESSION', payload: { id, hours, gameId } })
  }

  return (
    <GamesContext.Provider value={{ ...state, addGame, editGame, removeGame, addSession, editSession, removeSession }}>
      {children}
    </GamesContext.Provider>
  )
}

export { GamesContext }
