import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GamesProvider } from './context/GamesContext'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import GamesPage from './pages/GamesPage'
import GameDetail from './pages/GameDetail'
import NewGame from './pages/NewGame'
import SessionsPage from './pages/SessionsPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <GamesProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <main className="flex flex-1 min-h-screen">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/games/new" element={<NewGame />} />
              <Route path="/games/:id" element={<GameDetail />} />
              <Route path="/sessions" element={<SessionsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </GamesProvider>
  )
}
