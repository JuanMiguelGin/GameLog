import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', icon: '▦' },
  { to: '/games', label: 'Mis juegos', icon: '◎' },
  { to: '/sessions', label: 'Historial', icon: '◷' },
]

export default function Sidebar() {
  return (
    <aside className="w-48 shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-gray-100">
        <span className="text-base font-semibold text-gray-900">Game<span className="text-purple-600">Log</span></span>
      </div>
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-purple-50 text-purple-700 font-medium'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`
            }
          >
            <span className="text-base">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
