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
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400 dark:text-gray-500">
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
    <div className="flex-1 p-4 md:p-6 overflow-y-auto w-full min-w-0">
      <button
        onClick={() => navigate('/games')}
        className="text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-4 flex items-center gap-1"
      >
        ← Volver
      </button>
 
      {editing ? (
        <div className="max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 md:p-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Editar juego</h2>
          <GameForm initial={game} onSubmit={handleEdit} onCancel={() => setEditing(false)} />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Game header card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 md:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-100 dark:bg-purple-950 rounded-xl flex items-center justify-center text-2xl md:text-3xl shrink-0">🎮</div>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white leading-tight">{game.title}</h1>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">{game.genre} · {game.platform}</p>
                  <div className="mt-2"><StatusBadge status={game.status} /></div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <button
                  onClick={() => setEditing(true)}
                  className="text-xs md:text-sm border border-gray-300 dark:border-gray-700 px-2 md:px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="text-xs md:text-sm border border-red-200 dark:border-red-900 px-2 md:px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  Eliminar
                </button>
              </div>
            </div>
 
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Horas totales</p>
                <p className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{formatHours(game.totalHours)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Sesiones</p>
                <p className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{gameSessions.length}</p>
              </div>
            </div>
 
            {game.notes && (
              <div className="mt-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-100 dark:border-yellow-900 rounded-lg p-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Notas</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{game.notes}</p>
              </div>
            )}
          </div>
 
          {/* Sessions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Historial de sesiones</h2>
              <button
                onClick={() => setAddingSession(true)}
                className="text-sm text-purple-600 hover:underline"
              >
                + Registrar sesión
              </button>
            </div>
 
            {addingSession && (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 mb-4">
                <SessionForm gameId={game.id} onSubmit={handleAddSession} onCancel={() => setAddingSession(false)} />
              </div>
            )}
 
            {gameSessions.length === 0 ? (
              <p className="text-sm text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                Aún no has registrado ninguna sesión para este juego.
              </p>
            ) : (
              <div className="space-y-2">
                {gameSessions.map(session => (
                  <div
                    key={session.id}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 md:p-4 flex items-center gap-3"
                  >
                    <div className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-lg shrink-0">⏱</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{formatHours(session.hours)} jugadas</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{formatDate(session.date)}</p>
                    </div>
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
        </div>
      )}
    </div>
  )
}