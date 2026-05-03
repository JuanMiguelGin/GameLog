import { useNavigate } from 'react-router-dom'
import { useGames } from '../context/useGames'
import GameForm from '../components/GameForm'
import type { CreateGameDTO } from '../types'
 
export default function NewGame() {
  const navigate = useNavigate()
  const { addGame } = useGames()
 
  async function handleSubmit(dto: CreateGameDTO) {
    await addGame(dto)
    navigate('/games')
  }
 
  return (
    <div className="flex-1 p-4 md:p-6 overflow-y-auto w-full min-w-0">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-5 flex items-center gap-1"
      >
        ← Volver
      </button>
      <div className="max-w-lg">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Añadir juego</h1>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <GameForm onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
        </div>
      </div>
    </div>
  )
}