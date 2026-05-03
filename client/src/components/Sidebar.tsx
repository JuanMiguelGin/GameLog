import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
 
const links = [
  { to: '/', label: 'Dashboard', icon: '▦' },
  { to: '/games', label: 'Mis juegos', icon: '◎' },
  { to: '/sessions', label: 'Historial', icon: '◷' },
]
 
export default function Sidebar() {
  const { dark, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
 
  const navLinks = (
    <nav className="flex flex-col gap-1 p-3 flex-1">
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? 'bg-purple-50 text-purple-700 font-medium dark:bg-purple-950 dark:text-purple-300'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
            }`
          }
        >
          <span className="text-base">{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
 
      {/* Dark mode toggle */}
      <button
        onClick={toggle}
        className="mt-auto flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors"
      >
        <span className="text-base">{dark ? '☀️' : '🌙'}</span>
        {dark ? 'Modo claro' : 'Modo oscuro'}
      </button>
    </nav>
  )
 
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-48 shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-gray-100 dark:border-gray-800">
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            Game<span className="text-purple-600">Log</span>
          </span>
        </div>
        {navLinks}
      </aside>
 
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <span className="text-base font-semibold text-gray-900 dark:text-white">
          Game<span className="text-purple-600">Log</span>
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-lg p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            {dark ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="text-gray-600 dark:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
 
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-12 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
          <nav className="flex flex-col gap-1 p-3">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 font-medium dark:bg-purple-950 dark:text-purple-300'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                  }`
                }
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
 
      {/* Mobile top padding so content doesn't hide under the bar */}
      <div className="md:hidden h-12 w-full" />
    </>
  )
}