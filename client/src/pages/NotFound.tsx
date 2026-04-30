import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-6">
      <p className="text-6xl">🕹️</p>
      <h1 className="text-2xl font-semibold text-gray-900">404 — Página no encontrada</h1>
      <p className="text-gray-400 text-sm">Esta ruta no existe en el mapa del juego.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-5 py-2 rounded-lg transition-colors"
      >
        Volver al inicio
      </button>
    </div>
  )
}
