import { v4 as uuidv4 } from 'uuid'
import type { Game, Session, CreateGameDTO, UpdateGameDTO, CreateSessionDTO } from '../types'

// In-memory store — replace with a DB if needed
const games: Game[] = [
  {
    id: uuidv4(),
    title: 'Elden Ring',
    platform: 'PC (Steam)',
    genre: 'RPG',
    status: 'playing',
    totalHours: 42,
    notes: 'Épico. En la zona de Farum Azula.',
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
    notes: 'Final verdadero conseguido. De los mejores que he jugado.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const sessions: Session[] = []

// Games
export function getAllGames(): Game[] {
  return games
}

export function getGameById(id: string): Game | undefined {
  return games.find(g => g.id === id)
}

export function createGame(dto: CreateGameDTO): Game {
  const game: Game = {
    id: uuidv4(),
    title: dto.title,
    platform: dto.platform,
    genre: dto.genre,
    status: dto.status,
    totalHours: 0,
    notes: dto.notes ?? '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  games.push(game)
  return game
}

export function updateGame(id: string, dto: UpdateGameDTO): Game | undefined {
  const idx = games.findIndex(g => g.id === id)
  if (idx === -1) return undefined
  const updated: Game = { ...games[idx], ...dto, updatedAt: new Date().toISOString() }
  games[idx] = updated
  return updated
}

export function deleteGame(id: string): boolean {
  const idx = games.findIndex(g => g.id === id)
  if (idx === -1) return false
  games.splice(idx, 1)
  // also remove sessions
  const toDelete = sessions.filter(s => s.gameId === id).map(s => s.id)
  toDelete.forEach(sid => {
    const si = sessions.findIndex(s => s.id === sid)
    if (si !== -1) sessions.splice(si, 1)
  })
  return true
}

// Sessions
export function getAllSessions(gameId?: string): Session[] {
  if (gameId) return sessions.filter(s => s.gameId === gameId)
  return [...sessions].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function createSession(dto: CreateSessionDTO): Session | undefined {
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
  // update totalHours on the game
  game.totalHours = parseFloat((game.totalHours + dto.hours).toFixed(1))
  game.updatedAt = new Date().toISOString()
  return session
}

export function deleteSession(id: string): boolean {
  const idx = sessions.findIndex(s => s.id === id)
  if (idx === -1) return false
  const session = sessions[idx]
  // subtract hours from game
  const game = games.find(g => g.id === session.gameId)
  if (game) {
    game.totalHours = parseFloat(Math.max(0, game.totalHours - session.hours).toFixed(1))
    game.updatedAt = new Date().toISOString()
  }
  sessions.splice(idx, 1)
  return true
}
