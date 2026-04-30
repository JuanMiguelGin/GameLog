import type { GameStatus } from '../types'
import { statusLabel, statusColor } from '../utils'

interface Props {
  status: GameStatus
}

export default function StatusBadge({ status }: Props) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(status)}`}>
      {statusLabel(status)}
    </span>
  )
}
