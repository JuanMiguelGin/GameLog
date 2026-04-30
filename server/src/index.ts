import express from 'express'
import cors from 'cors'
import gamesRouter from './routes/games.routes'
import sessionsRouter from './routes/sessions.routes'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// API routes
app.use('/api/v1/games', gamesRouter)
app.use('/api/v1/sessions', sessionsRouter)

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found', message: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`🎮 GameLog API running on http://localhost:${PORT}`)
})

export default app
