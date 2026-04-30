import { useState } from 'react'
import type { CreateSessionDTO } from '../types'

interface Props {
  gameId: string
  onSubmit: (dto: CreateSessionDTO) => Promise<void>
  onCancel: () => void
}

export default function SessionForm({ gameId, onSubmit, onCancel }: Props) {
  const today = new Date().toISOString().split('T')[0]
  const [hours, setHours] = useState('')
  const [date, setDate] = useState(today)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const h = parseFloat(hours)
    if (!hours || isNaN(h) || h <= 0) {
      setError('Introduce un número de horas válido')
      return
    }
    setSubmitting(true)
    try {
      await onSubmit({ gameId, hours: h, date })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Horas jugadas *</label>
        <input
          type="number"
          min="0.5"
          step="0.5"
          value={hours}
          onChange={e => { setHours(e.target.value); setError('') }}
          className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${error ? 'border-red-400' : 'border-gray-300'}`}
          placeholder="Ej: 2.5"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
        <input
          type="date"
          value={date}
          max={today}
          onChange={e => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg py-2 text-sm font-medium transition-colors"
        >
          {submitting ? 'Guardando...' : 'Registrar sesión'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
