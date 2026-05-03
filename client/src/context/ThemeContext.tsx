import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
 
interface ThemeContextValue {
  dark: boolean
  toggle: () => void
}
 
const ThemeContext = createContext<ThemeContextValue>({ dark: false, toggle: () => {} })
 
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('gamelog_theme') === 'dark'
  })
 
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('gamelog_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('gamelog_theme', 'light')
    }
  }, [dark])
 
  function toggle() {
    setDark(prev => !prev)
  }
 
  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
 
export function useTheme() {
  return useContext(ThemeContext)
}