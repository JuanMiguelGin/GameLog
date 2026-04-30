import type {
  Game,
  Session,
  CreateGameDTO,
  UpdateGameDTO,
  CreateSessionDTO,
} from '../types'

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api/v1'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? 'API error')
  return json.data as T
}

// Games
export const getGames = (): Promise<Game[]> => request('/games')

export const getGame = (id: string): Promise<Game> => request(`/games/${id}`)

export const createGame = (body: CreateGameDTO): Promise<Game> =>
  request('/games', { method: 'POST', body: JSON.stringify(body) })

export const updateGame = (id: string, body: UpdateGameDTO): Promise<Game> =>
  request(`/games/${id}`, { method: 'PATCH', body: JSON.stringify(body) })

export const deleteGame = (id: string): Promise<void> =>
  request(`/games/${id}`, { method: 'DELETE' })

// Sessions
export const getSessions = (): Promise<Session[]> => request('/sessions')

export const getSessionsByGame = (gameId: string): Promise<Session[]> =>
  request(`/sessions?gameId=${gameId}`)

export const createSession = (body: CreateSessionDTO): Promise<Session> =>
  request('/sessions', { method: 'POST', body: JSON.stringify(body) })

export const deleteSession = (id: string): Promise<void> =>
  request(`/sessions/${id}`, { method: 'DELETE' })