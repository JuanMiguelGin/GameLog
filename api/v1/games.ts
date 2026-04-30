import type { VercelRequest, VercelResponse } from '@vercel/node'
import * as store from '../_store'

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    return res.status(200).json({ data: store.getAllGames() })
  }

  if (req.method === 'POST') {
    const { title, platform, genre, status, notes } = req.body
    if (!title || !platform || !genre || !status) {
      return res.status(400).json({ error: 'Bad request', message: 'title, platform, genre and status are required' })
    }
    const game = store.createGame({ title, platform, genre, status, notes: notes ?? '' })
    return res.status(201).json({ data: game })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
