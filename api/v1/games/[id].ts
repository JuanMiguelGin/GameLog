import type { VercelRequest, VercelResponse } from '@vercel/node'
import * as store from '../../_store'

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const { id } = req.query as { id: string }

  if (req.method === 'GET') {
    const game = store.getGameById(id)
    if (!game) return res.status(404).json({ error: 'Not found', message: 'Game not found' })
    return res.status(200).json({ data: game })
  }

  if (req.method === 'PATCH') {
    const game = store.updateGame(id, req.body)
    if (!game) return res.status(404).json({ error: 'Not found', message: 'Game not found' })
    return res.status(200).json({ data: game })
  }

  if (req.method === 'DELETE') {
    const ok = store.deleteGame(id)
    if (!ok) return res.status(404).json({ error: 'Not found', message: 'Game not found' })
    return res.status(200).json({ data: null, message: 'Game deleted' })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
