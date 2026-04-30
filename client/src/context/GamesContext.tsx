import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { Game, Session, CreateGameDTO, UpdateGameDTO, CreateSessionDTO } from '../types'
import * as api from '../api/client'

const LS_GAMES_KEY = 'gamelog_games'
const LS_SESSIONS_KEY = 'gamelog_sessions'

function loadFromLS<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function saveToLS<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore quota / disabled storage
  }
}

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

    const cachedGames = loadFromLS<Game[]>(LS_GAMES_KEY)
    const cachedSessions = loadFromLS<Session[]>(LS_SESSIONS_KEY)
    if (cachedGames && cachedSessions) {
      dispatch({ type: 'SET_GAMES', payload: cachedGames })
      dispatch({ type: 'SET_SESSIONS', payload: cachedSessions })
      return
    }

    Promise.all([api.getGames(), api.getSessions()])
      .then(([games, sessions]) => {
        saveToLS(LS_GAMES_KEY, games)
        saveToLS(LS_SESSIONS_KEY, sessions)
        dispatch({ type: 'SET_GAMES', payload: games })
        dispatch({ type: 'SET_SESSIONS', payload: sessions })
      })
      .catch(err => dispatch({ type: 'SET_ERROR', payload: err.message }))
  }, [])

  async function addGame(dto: CreateGameDTO) {
    const game = await api.createGame(dto).catch(() => {
      const now = new Date().toISOString()
      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`
      return {
        id,
        ...dto,
        totalHours: 0,
        createdAt: now,
        updatedAt: now,
      } as Game
    })

    const nextGames = [...state.games, game]
    saveToLS(LS_GAMES_KEY, nextGames)
    dispatch({ type: 'ADD_GAME', payload: game })
  }

  async function editGame(id: string, dto: UpdateGameDTO) {
    const existing = state.games.find(g => g.id === id)
    const patched: Game | null = existing
      ? { ...existing, ...dto, updatedAt: new Date().toISOString() }
      : null

    const game = await api.updateGame(id, dto).catch(() => patched)
    if (!game) throw new Error('Game not found')

    const nextGames = state.games.map(g => (g.id === game.id ? game : g))
    saveToLS(LS_GAMES_KEY, nextGames)
    dispatch({ type: 'UPDATE_GAME', payload: game })
  }

  async function removeGame(id: string) {
    await api.deleteGame(id).catch(() => undefined)

    const nextGames = state.games.filter(g => g.id !== id)
    const nextSessions = state.sessions.filter(s => s.gameId !== id)
    saveToLS(LS_GAMES_KEY, nextGames)
    saveToLS(LS_SESSIONS_KEY, nextSessions)

    dispatch({ type: 'DELETE_GAME', payload: id })
  }

  async function addSession(dto: CreateSessionDTO) {
    const session = await api.createSession(dto).catch(() => {
      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`
      return {
        id,
        gameId: dto.gameId,
        gameTitle: state.games.find(g => g.id === dto.gameId)?.title ?? 'Unknown',
        hours: dto.hours,
        date: dto.date,
        createdAt: new Date().toISOString(),
      } as Session
    })

    const nextSessions = [session, ...state.sessions]
    const nextGames = state.games.map(g =>
      g.id === session.gameId ? { ...g, totalHours: g.totalHours + session.hours } : g
    )
    saveToLS(LS_SESSIONS_KEY, nextSessions)
    saveToLS(LS_GAMES_KEY, nextGames)

    dispatch({ type: 'ADD_SESSION', payload: session })
  }

  async function removeSession(id: string) {
    await api.deleteSession(id).catch(() => undefined)

    const session = state.sessions.find(s => s.id === id)
    const nextSessions = state.sessions.filter(s => s.id !== id)
    const nextGames = session
      ? state.games.map(g =>
          g.id === session.gameId ? { ...g, totalHours: Math.max(0, g.totalHours - session.hours) } : g
        )
      : state.games

    saveToLS(LS_SESSIONS_KEY, nextSessions)
    saveToLS(LS_GAMES_KEY, nextGames)

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