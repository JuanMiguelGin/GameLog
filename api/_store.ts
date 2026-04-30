import { v4 as uuidv4 } from 'uuid'

export type GameStatus = 'playing' | 'completed' | 'abandoned' | 'pending'

export interface Game {
  id: string
  title: string
  platform: string
  genre: string
  status: GameStatus
  totalHours: number
  notes: string
  createdAt: string
  updatedAt: string
}

export interface Session {
  id: string
  gameId: string
  gameTitle: string
  hours: number
  date: string
  createdAt: string
}

// Global store — persists across requests in the same serverless instance
const games: Game[] = [
  {
    id: uuidv4(),
    title: 'Elden Ring',
    platform: 'PC (Steam)',
    genre: 'RPG',
    status: 'playing',
    totalHours: 42,
    notes: 'En Farum Azula. Brutal.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Hollow Knight',
    platform: 'Nintendo Switch',
    genre: 'Metroidvania',
    status: 'completed',
    totalHours: 30,
    notes: 'Final verdadero conseguido.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const sessions: Session[] = []

export function getAllGames(): Game[] {
  return games
}

export function getGameById(id: string): Game | undefined {
  return games.find(g => g.id === id)
}

export function createGame(dto: Omit<Game, 'id' | 'totalHours' | 'createdAt' | 'updatedAt'>): Game {
  const game: Game = {
    id: uuidv4(),
    ...dto,
    totalHours: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  games.push(game)
  return game
}

export function updateGame(id: string, dto: Partial<Game>): Game | undefined {
  const idx = games.findIndex(g => g.id === id)
  if (idx === -1) return undefined
  games[idx] = { ...games[idx], ...dto, updatedAt: new Date().toISOString() }
  return games[idx]
}

export function deleteGame(id: string): boolean {
  const idx = games.findIndex(g => g.id === id)
  if (idx === -1) return false
  games.splice(idx, 1)
  const toDelete = sessions.filter(s => s.gameId === id).map(s => s.id)
  toDelete.forEach(sid => {
    const si = sessions.findIndex(s => s.id === sid)
    if (si !== -1) sessions.splice(si, 1)
  })
  return true
}

export function getAllSessions(gameId?: string): Session[] {
  const list = gameId ? sessions.filter(s => s.gameId === gameId) : [...sessions]
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function createSession(dto: { gameId: string; hours: number; date: string }): Session | undefined {
  const game = games.find(g => g.id === dto.gameId)
  if (!game) return undefined
  const session: Session = {
    id: uuidv4(),
    gameId: dto.gameId,
    gameTitle: game.title,
    hours: dto.hours,
    date: dto.date,
    createdAt: new Date().toISOString(),
  }
  sessions.push(session)
  game.totalHours = parseFloat((game.totalHours + dto.hours).toFixed(1))
  game.updatedAt = new Date().toISOString()
  return session
}

export function deleteSession(id: string): boolean {
  const idx = sessions.findIndex(s => s.id === id)
  if (idx === -1) return false
  const session = sessions[idx]
  const game = games.find(g => g.id === session.gameId)
  if (game) {
    game.totalHours = parseFloat(Math.max(0, game.totalHours - session.hours).toFixed(1))
    game.updatedAt = new Date().toISOString()
  }
  sessions.splice(idx, 1)
  return true
}
