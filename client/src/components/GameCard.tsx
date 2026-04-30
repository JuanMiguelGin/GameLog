import { useNavigate } from 'react-router-dom'
import type { Game } from '../types'
import StatusBadge from './StatusBadge'
import { formatHours } from '../utils'

interface Props {
  game: Game
}

export default function GameCard({ game }: Props) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/games/${game.id}`)}
      className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-purple-300 transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-xl">
          🎮
        </div>
        <StatusBadge status={game.status} />
      </div>
      <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{game.title}</h3>
      <p className="text-xs text-gray-500 mb-3">{game.genre} · {game.platform}</p>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>⏱ {formatHours(game.totalHours)}</span>
      </div>
    </div>
  )
}
