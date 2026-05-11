import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GamesProvider } from './context/GamesContext'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import GamesPage from './pages/GamesPage'
import GameDetail from './pages/GameDetail'
import NewGame from './pages/NewGame'
import SessionsPage from './pages/SessionsPage'
import NotFound from './pages/NotFound'
import AuthPage from './pages/AuthPage'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-400">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return <AuthPage />
  }

  return (
    <GamesProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <main className="flex flex-1 min-h-screen min-w-0 pt-12 md:pt-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/new" element={<NewGame />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/auth" element={<Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </GamesProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
