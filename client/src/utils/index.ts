import type { GameStatus } from '../types'

export function statusLabel(status: GameStatus): string {
  const map: Record<GameStatus, string> = {
    playing: 'Jugando',
    completed: 'Completado',
    abandoned: 'Abandonado',
    pending: 'Pendiente',
  }
  return map[status]
}

export function statusColor(status: GameStatus): string {
  const map: Record<GameStatus, string> = {
    playing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    abandoned: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  }
  return map[status]
}

export function formatHours(hours: number): string {
  if (hours === 0) return '0h'
  if (hours < 1) return `${Math.round(hours * 60)}min`
  return `${hours.toFixed(1).replace('.0', '')}h`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
