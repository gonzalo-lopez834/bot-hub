import { Routes, Route, Link } from 'react-router-dom'
import LandingGrid from './components/LandingGrid.jsx'
import ServiceDetailView from './components/ServiceDetailView.jsx'
import NotFound from './components/NotFound.jsx'

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold">
            Bot Hub
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingGrid />} />
          <Route path="/services/:id" element={<ServiceDetailView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} Bot Hub
        </div>
      </footer>
    </div>
  )
}
