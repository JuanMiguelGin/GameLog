import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGames } from '../context/useGames'
import StatusBadge from '../components/StatusBadge'
import GameForm from '../components/GameForm'
import SessionForm from '../components/SessionForm'
import { formatHours, formatDate } from '../utils'
import type { CreateGameDTO, CreateSessionDTO } from '../types'

export default function GameDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { games, sessions, editGame, removeGame, addSession, removeSession } = useGames()

  const game = useMemo(() => games.find(g => g.id === id), [games, id])
  const gameSessions = useMemo(() => sessions.filter(s => s.gameId === id), [sessions, id])

  const [editing, setEditing] = useState(false)
  const [addingSession, setAddingSession] = useState(false)

  if (!game) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
        <p className="text-5xl">🕹️</p>
        <p>Juego no encontrado.</p>
        <button onClick={() => navigate('/games')} className="text-purple-600 text-sm hover:underline">
          Volver a mis juegos
        </button>
      </div>
    )
  }

  async function handleEdit(dto: CreateGameDTO) {
    await editGame(game!.id, dto)
    setEditing(false)
  }

  async function handleDelete() {
    if (!confirm(`¿Seguro que quieres eliminar "${game!.title}"?`)) return
    await removeGame(game!.id)
    navigate('/games')
  }

  async function handleAddSession(dto: CreateSessionDTO) {
    await addSession(dto)
    setAddingSession(false)
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <button onClick={() => navigate('/games')} className="text-sm text-gray-400 hover:text-gray-700 mb-5 flex items-center gap-1">
        ← Volver
      </button>

      {editing ? (
        <div className="max-w-lg bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Editar juego</h2>
          <GameForm initial={game} onSubmit={handleEdit} onCancel={() => setEditing(false)} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-3xl shrink-0">🎮</div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{game.title}</h1>
                  <p className="text-sm text-gray-500 mt-0.5">{game.genre} · {game.platform}</p>
                  <div className="mt-2"><StatusBadge status={game.status} /></div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing(true)} className="text-sm border border-gray-300 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50">Editar</button>
                <button onClick={handleDelete} className="text-sm border border-red-200 px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50">Eliminar</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">Horas totales</p>
                <p className="text-xl font-semibold text-gray-900">{formatHours(game.totalHours)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">Sesiones</p>
                <p className="text-xl font-semibold text-gray-900">{gameSessions.length}</p>
              </div>
            </div>

            {game.notes && (
              <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1 font-medium">Notas</p>
                <p className="text-sm text-gray-700">{game.notes}</p>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-500">Historial de sesiones</h2>
              <button
                onClick={() => setAddingSession(true)}
                className="text-sm text-purple-600 hover:underline"
              >
                + Registrar sesión
              </button>
            </div>

            {addingSession && (
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <SessionForm gameId={game.id} onSubmit={handleAddSession} onCancel={() => setAddingSession(false)} />
              </div>
            )}

            {gameSessions.length === 0 ? (
              <p className="text-sm text-gray-400 bg-gray-50 rounded-xl p-4">Aún no has registrado ninguna sesión para este juego.</p>
            ) : (
              <div className="space-y-2">
                {gameSessions.map(session => (
                  <div key={session.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-lg">⏱</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{formatHours(session.hours)} jugadas</p>
                      <p className="text-xs text-gray-400">{formatDate(session.date)}</p>
                    </div>
                    <button
                      onClick={() => removeSession(session.id)}
                      className="text-xs text-red-400 hover:text-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
