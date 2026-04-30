import { useGames } from '../context/GamesContext'
import { formatHours, formatDate } from '../utils'

export default function SessionsPage() {
  const { sessions, removeSession, loading } = useGames()

  if (loading) return <div className="flex-1 flex items-center justify-center text-gray-400">Cargando...</div>

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-xl font-semibold text-gray-900 mb-5">Historial de sesiones</h1>

      {sessions.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">⏱</p>
          <p className="text-sm">Aún no has registrado ninguna sesión.</p>
          <p className="text-xs mt-1">Ve a un juego y registra cuánto has jugado.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.map(session => (
            <div key={session.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0">⏱</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{session.gameTitle}</p>
                <p className="text-xs text-gray-400">{formatDate(session.date)}</p>
              </div>
              <span className="text-sm font-medium text-gray-700 shrink-0">{formatHours(session.hours)}</span>
              <button
                onClick={() => removeSession(session.id)}
                className="text-xs text-red-400 hover:text-red-600 shrink-0"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
