import { useState, useMemo, useCallback } from 'react'
import type { Game, GameStatus, Platform } from '../types'

interface Filters {
  search: string
  status: GameStatus | 'all'
  platform: Platform | 'all'
}

export function useGamesFilter(games: Game[]) {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: 'all',
    platform: 'all',
  })

  const filtered = useMemo(() => {
    return games.filter(game => {
      const matchSearch = game.title.toLowerCase().includes(filters.search.toLowerCase())
      const matchStatus = filters.status === 'all' || game.status === filters.status
      const matchPlatform = filters.platform === 'all' || game.platform === filters.platform
      return matchSearch && matchStatus && matchPlatform
    })
  }, [games, filters])

  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }))
  }, [])

  const setStatus = useCallback((status: GameStatus | 'all') => {
    setFilters(prev => ({ ...prev, status }))
  }, [])

  const setPlatform = useCallback((platform: Platform | 'all') => {
    setFilters(prev => ({ ...prev, platform }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({ search: '', status: 'all', platform: 'all' })
  }, [])

  return { filtered, filters, setSearch, setStatus, setPlatform, resetFilters }
}
