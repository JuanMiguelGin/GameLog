import type { VercelRequest, VercelResponse } from '@vercel/node'
import * as store from '../_store'

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const { gameId } = req.query
    return res.status(200).json({ data: store.getAllSessions(gameId as string | undefined) })
  }

  if (req.method === 'POST') {
    const { gameId, hours, date } = req.body
    if (!gameId || !hours || !date) {
      return res.status(400).json({ error: 'Bad request', message: 'gameId, hours and date are required' })
    }
    if (typeof hours !== 'number' || hours <= 0) {
      return res.status(400).json({ error: 'Bad request', message: 'hours must be a positive number' })
    }
    const session = store.createSession({ gameId, hours, date })
    if (!session) return res.status(404).json({ error: 'Not found', message: 'Game not found' })
    return res.status(201).json({ data: session })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
