import { Request, Response } from 'express'
import * as store from '../services/store'

export function getSessions(req: Request, res: Response) {
  const { gameId } = req.query
  res.json({ data: store.getAllSessions(gameId as string | undefined) })
}

export function createSession(req: Request, res: Response) {
  const { gameId, hours, date } = req.body
  if (!gameId || !hours || !date) {
    return res.status(400).json({ error: 'Bad request', message: 'gameId, hours and date are required' })
  }
  if (typeof hours !== 'number' || hours <= 0) {
    return res.status(400).json({ error: 'Bad request', message: 'hours must be a positive number' })
  }
  const session = store.createSession({ gameId, hours, date })
  if (!session) return res.status(404).json({ error: 'Not found', message: 'Game not found' })
  res.status(201).json({ data: session })
}

export function deleteSession(req: Request, res: Response) {
  const ok = store.deleteSession(req.params.id)
  if (!ok) return res.status(404).json({ error: 'Not found', message: 'Session not found' })
  res.json({ data: null, message: 'Session deleted' })
}
