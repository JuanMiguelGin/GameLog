import { useState } from 'react'
import type { Game, CreateGameDTO, Platform, Genre, GameStatus } from '../types'

const PLATFORMS: Platform[] = [
  'PC (Steam)', 'PC (Epic)', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile', 'Other',
]
const GENRES: Genre[] = [
  'RPG', 'Action', 'Adventure', 'Strategy', 'Simulation', 'Sports',
  'Horror', 'Metroidvania', 'Roguelike', 'Puzzle', 'FPS', 'Fighting', 'Other',
]
const STATUSES: { value: GameStatus; label: string }[] = [
  { value: 'playing', label: 'Jugando' },
  { value: 'completed', label: 'Completado' },
  { value: 'abandoned', label: 'Abandonado' },
  { value: 'pending', label: 'Pendiente' },
]

interface Props {
  initial?: Partial<Game>
  onSubmit: (dto: CreateGameDTO) => Promise<void>
  onCancel: () => void
}

export default function GameForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<CreateGameDTO>({
    title: initial?.title ?? '',
    platform: initial?.platform ?? 'PC (Steam)',
    genre: initial?.genre ?? 'RPG',
    status: initial?.status ?? 'pending',
    notes: initial?.notes ?? '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof CreateGameDTO, string>>>({})
  const [submitting, setSubmitting] = useState(false)

  function validate(): boolean {
    const newErrors: typeof errors = {}
    if (!form.title.trim()) newErrors.title = 'El título es obligatorio'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit(form)
    } finally {
      setSubmitting(false)
    }
  }

  function field(key: keyof CreateGameDTO, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
        <input
          value={form.title}
          onChange={e => field('title', e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
          placeholder="Nombre del juego"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plataforma</label>
          <select
            value={form.platform}
            onChange={e => field('platform', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {PLATFORMS.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
          <select
            value={form.genre}
            onChange={e => field('genre', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {GENRES.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
        <div className="grid grid-cols-2 gap-2">
          {STATUSES.map(s => (
            <button
              key={s.value}
              type="button"
              onClick={() => field('status', s.value)}
              className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                form.status === s.value
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'border-gray-300 text-gray-600 hover:border-purple-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
        <textarea
          value={form.notes}
          onChange={e => field('notes', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          placeholder="Apuntes, opinión, dónde lo dejaste..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-medium transition-colors"
        >
          {submitting ? 'Guardando...' : initial?.id ? 'Guardar cambios' : 'Añadir juego'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
