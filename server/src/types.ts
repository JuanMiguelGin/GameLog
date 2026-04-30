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

export interface CreateGameDTO {
  title: string
  platform: string
  genre: string
  status: GameStatus
  notes?: string
}

export interface UpdateGameDTO {
  title?: string
  platform?: string
  genre?: string
  status?: GameStatus
  notes?: string
}

export interface CreateSessionDTO {
  gameId: string
  hours: number
  date: string
}
