import { useContext } from 'react'
import { GamesContext } from '../context/GamesContext'

export function useGames() {
  const ctx = useContext(GamesContext)
  if (!ctx) throw new Error('useGames must be used inside GamesProvider')
  return ctx
}
