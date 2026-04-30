export type GameStatus = 'playing' | 'completed' | 'abandoned' | 'pending'

export type Platform =
  | 'PC (Steam)'
  | 'PC (Epic)'
  | 'PlayStation'
  | 'Xbox'
  | 'Nintendo Switch'
  | 'Mobile'
  | 'Other'

export type Genre =
  | 'RPG'
  | 'Action'
  | 'Adventure'
  | 'Strategy'
  | 'Simulation'
  | 'Sports'
  | 'Horror'
  | 'Metroidvania'
  | 'Roguelike'
  | 'Puzzle'
  | 'FPS'
  | 'Fighting'
  | 'Other'

export interface Game {
  id: string
  title: string
  platform: Platform
  genre: Genre
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
  platform: Platform
  genre: Genre
  status: GameStatus
  notes?: string
}

export interface UpdateGameDTO {
  title?: string
  platform?: Platform
  genre?: Genre
  status?: GameStatus
  notes?: string
}

export interface CreateSessionDTO {
  gameId: string
  hours: number
  date: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  error: string
  message: string
}
