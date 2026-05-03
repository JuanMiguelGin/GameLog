import { useNavigate } from 'react-router-dom'
import { useGames } from '../context/useGames'
import { useGamesFilter } from '../hooks/useGamesFilter'
import GameCard from '../components/GameCard'
import type { GameStatus } from '../types'
 
const STATUSES: { value: GameStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'playing', label: 'Jugando' },
  { value: 'completed', label: 'Completados' },
  { value: 'abandoned', label: 'Abandonados' },
  { value: 'pending', label: 'Pendientes' },
]
 
export default function GamesPage() {
  const { games, loading, error } = useGames()
  const navigate = useNavigate()
  const { filtered, filters, setSearch, setStatus } = useGamesFilter(games)
 
  if (loading) return <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">Cargando...</div>
  if (error) return <div className="flex-1 flex items-center justify-center text-red-500">{error}</div>
 
  return (
    <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto w-full min-w-0">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Mis juegos</h1>
        <button
          onClick={() => navigate('/games/new')}
          className="bg-purple-600 hover:bg-purple-700 text-white text-xs md:text-sm px-3 md:px-4 py-2 rounded-lg transition-colors shrink-0"
        >
          + Añadir
        </button>
      </div>
 
      <div className="flex flex-col gap-3">
        <input
          value={filters.search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar juego..."
          className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button
              key={s.value}
              onClick={() => setStatus(s.value as GameStatus | 'all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filters.status === s.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
 
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🎮</p>
          <p className="text-sm">No se encontraron juegos.</p>
          {games.length === 0 && (
            <button
              onClick={() => navigate('/games/new')}
              className="mt-4 text-purple-600 text-sm hover:underline"
            >
              Añade tu primer juego
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map(game => <GameCard key={game.id} game={game} />)}
        </div>
      )}
    </div>
  )
}