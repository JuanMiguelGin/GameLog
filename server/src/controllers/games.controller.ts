import { Request, Response } from 'express'
import * as store from '../services/store'

export function getGames(req: Request, res: Response) {
  res.json({ data: store.getAllGames() })
}

export function getGame(req: Request, res: Response) {
  const game = store.getGameById(req.params.id)
  if (!game) return res.status(404).json({ error: 'Not found', message: 'Game not found' })
  res.json({ data: game })
}

export function createGame(req: Request, res: Response) {
  const { title, platform, genre, status, notes } = req.body
  if (!title || !platform || !genre || !status) {
    return res.status(400).json({ error: 'Bad request', message: 'title, platform, genre and status are required' })
  }
  const game = store.createGame({ title, platform, genre, status, notes })
  res.status(201).json({ data: game })
}

export function updateGame(req: Request, res: Response) {
  const game = store.updateGame(req.params.id, req.body)
  if (!game) return res.status(404).json({ error: 'Not found', message: 'Game not found' })
  res.json({ data: game })
}

export function deleteGame(req: Request, res: Response) {
  const ok = store.deleteGame(req.params.id)
  if (!ok) return res.status(404).json({ error: 'Not found', message: 'Game not found' })
  res.json({ data: null, message: 'Game deleted' })
}
