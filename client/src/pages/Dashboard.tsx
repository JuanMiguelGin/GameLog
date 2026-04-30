import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGames } from '../context/GamesContext'
import StatCard from '../components/StatCard'
import { formatHours, formatDate } from '../utils'

export default function Dashboard() {
  const { games, sessions, loading, error } = useGames()
  const navigate = useNavigate()

  const stats = useMemo(() => ({
    total: games.length,
    playing: games.filter(g => g.status === 'playing').length,
    completed: games.filter(g => g.status === 'completed').length,
    totalHours: games.reduce((acc, g) => acc + g.totalHours, 0),
  }), [games])

  const recentSessions = useMemo(() => sessions.slice(0, 5), [sessions])
  const currentlyPlaying = useMemo(() => games.filter(g => g.status === 'playing').slice(0, 4), [games])

  if (loading) return <div className="flex-1 flex items-center justify-center text-gray-400">Cargando...</div>
  if (error) return <div className="flex-1 flex items-center justify-center text-red-500">{error}</div>

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <button
          onClick={() => navigate('/games/new')}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          + Añadir juego
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Juegos totales" value={stats.total} />
        <StatCard label="Jugando ahora" value={stats.playing} />
        <StatCard label="Completados" value={stats.completed} sub={`${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% de tu biblioteca`} />
        <StatCard label="Horas totales" value={formatHours(stats.totalHours)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-3">Jugando ahora</h2>
          {currentlyPlaying.length === 0 ? (
            <p className="text-sm text-gray-400 bg-gray-50 rounded-xl p-4">No tienes ningún juego en progreso.</p>
          ) : (
            <div className="space-y-2">
              {currentlyPlaying.map(game => (
                <div
                  key={game.id}
                  onClick={() => navigate(`/games/${game.id}`)}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-purple-300 transition-all"
                >
                  <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center text-lg shrink-0">🎮</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{game.title}</p>
                    <p className="text-xs text-gray-400">{game.platform}</p>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">{formatHours(game.totalHours)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-3">Actividad reciente</h2>
          {recentSessions.length === 0 ? (
            <p className="text-sm text-gray-400 bg-gray-50 rounded-xl p-4">Aún no has registrado ninguna sesión.</p>
          ) : (
            <div className="space-y-2">
              {recentSessions.map(session => (
                <div key={session.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-lg shrink-0">⏱</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{session.gameTitle}</p>
                    <p className="text-xs text-gray-400">{formatHours(session.hours)} jugadas</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{formatDate(session.date)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
