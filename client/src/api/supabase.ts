import { supabase } from '../lib/supabase'
import type { Game, Session, CreateGameDTO, UpdateGameDTO, CreateSessionDTO, UpdateSessionDTO } from '../types'
 
// ── Games ──────────────────────────────────────────────────────────────────
 
export async function getGames(userId: string): Promise<Game[]> {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []).map(toGame)
}
 
export async function createGame(userId: string, dto: CreateGameDTO): Promise<Game> {
  const { data, error } = await supabase
    .from('games')
    .insert({
      user_id: userId,
      title: dto.title,
      platform: dto.platform,
      genre: dto.genre,
      status: dto.status,
      notes: dto.notes ?? '',
      total_hours: 0,
    })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return toGame(data)
}
 
export async function updateGame(id: string, dto: UpdateGameDTO): Promise<Game> {
  const { data, error } = await supabase
    .from('games')
    .update({ ...dto, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return toGame(data)
}
 
export async function deleteGame(id: string): Promise<void> {
  const { error } = await supabase.from('games').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
 
// ── Sessions ───────────────────────────────────────────────────────────────
 
export async function getSessions(userId: string): Promise<Session[]> {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data ?? []).map(toSession)
}
 
export async function createSession(userId: string, dto: CreateSessionDTO, gameTitle: string): Promise<Session> {
  // 1. Insert session
  const { data, error } = await supabase
    .from('sessions')
    .insert({
      user_id: userId,
      game_id: dto.gameId,
      game_title: gameTitle,
      hours: dto.hours,
      date: dto.date,
    })
    .select()
    .single()
  if (error) throw new Error(error.message)
 
  // 2. Get current hours and update directly
  const { data: gameData } = await supabase
    .from('games')
    .select('total_hours')
    .eq('id', dto.gameId)
    .single()
 
  if (gameData) {
    const newHours = Math.max(0, Number(gameData.total_hours) + dto.hours)
    await supabase
      .from('games')
      .update({ total_hours: newHours, updated_at: new Date().toISOString() })
      .eq('id', dto.gameId)
  }
 
  return toSession(data)
}
 
export async function updateSession(id: string, dto: UpdateSessionDTO, oldHours: number, gameId: string): Promise<Session> {
  const { data, error } = await supabase
    .from('sessions')
    .update({ hours: dto.hours, date: dto.date })
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
 
  // Adjust game totalHours by the difference
  const delta = dto.hours - oldHours
  if (delta !== 0) {
    const { data: gameData } = await supabase
      .from('games')
      .select('total_hours')
      .eq('id', gameId)
      .single()
 
    if (gameData) {
      const newHours = Math.max(0, Number(gameData.total_hours) + delta)
      await supabase
        .from('games')
        .update({ total_hours: newHours, updated_at: new Date().toISOString() })
        .eq('id', gameId)
    }
  }
 
  return toSession(data)
}
 
export async function deleteSession(id: string, hours: number, gameId: string): Promise<void> {
  // 1. Delete session
  const { error } = await supabase.from('sessions').delete().eq('id', id)
  if (error) throw new Error(error.message)
 
  // 2. Get current hours and subtract directly
  const { data: gameData } = await supabase
    .from('games')
    .select('total_hours')
    .eq('id', gameId)
    .single()
 
  if (gameData) {
    const newHours = Math.max(0, Number(gameData.total_hours) - hours)
    await supabase
      .from('games')
      .update({ total_hours: newHours, updated_at: new Date().toISOString() })
      .eq('id', gameId)
  }
}
 
// ── Helpers ────────────────────────────────────────────────────────────────
 
function toGame(row: Record<string, unknown>): Game {
  return {
    id: row.id as string,
    title: row.title as string,
    platform: row.platform as Game['platform'],
    genre: row.genre as Game['genre'],
    status: row.status as Game['status'],
    totalHours: Number(row.total_hours ?? 0),
    notes: (row.notes as string) ?? '',
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}
 
function toSession(row: Record<string, unknown>): Session {
  return {
    id: row.id as string,
    gameId: row.game_id as string,
    gameTitle: row.game_title as string,
    hours: Number(row.hours),
    date: row.date as string,
    createdAt: row.created_at as string,
  }
}