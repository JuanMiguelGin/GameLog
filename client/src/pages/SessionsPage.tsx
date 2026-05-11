import { useState } from 'react'
import { useGames } from '../context/useGames'
import { formatHours, formatDate } from '../utils'
import type { UpdateSessionDTO } from '../types'

interface EditingState {
  id: string
  hours: string
  date: string
  gameId: string
  oldHours: number
}

export default function SessionsPage() {
  const { sessions, removeSession, editSession, loading } = useGames()
  const [editing, setEditing] = useState<EditingState | null>(null)
  const [saving, setSaving] = useState(false)

  if (loading) return <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">Cargando...</div>

  async function handleSave() {
    if (!editing) return
    const h = parseFloat(editing.hours)
    if (isNaN(h) || h <= 0) return
    setSaving(true)
    try {
      const dto: UpdateSessionDTO = { hours: h, date: editing.date }
      await editSession(editing.id, dto, editing.oldHours, editing.gameId)
      setEditing(null)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto w-full min-w-0">
      <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-5">Historial de sesiones</h1>

      {sessions.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <p className="text-4xl mb-3">⏱</p>
          <p className="text-sm">Aún no has registrado ninguna sesión.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.map(session => (
            <div key={session.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 md:p-4">
              {editing?.id === session.id ? (
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-lg shrink-0">⏱</div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white shrink-0">{session.gameTitle}</p>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={editing.hours}
                    onChange={e => setEditing(prev => prev ? { ...prev, hours: e.target.value } : null)}
                    className="w-20 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <input
                    type="date"
                    value={editing.date}
                    onChange={e => setEditing(prev => prev ? { ...prev, date: e.target.value } : null)}
                    className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <div className="flex gap-2 ml-auto">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="text-xs bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg"
                    >
                      {saving ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="text-xs border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-xl shrink-0">⏱</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{session.gameTitle}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(session.date)}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 shrink-0">{formatHours(session.hours)}</span>
                  <button
                    onClick={() => setEditing({ id: session.id, hours: String(session.hours), date: session.date, gameId: session.gameId, oldHours: session.hours })}
                    className="text-xs text-purple-500 hover:text-purple-700 shrink-0"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => removeSession(session.id, session.hours, session.gameId)}
                    className="text-xs text-red-400 hover:text-red-600 shrink-0"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
