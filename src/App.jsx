import { Routes, Route } from 'react-router-dom'
import LandingGrid from './components/LandingGrid.jsx'
import ServiceDetailView from './components/ServiceDetailView.jsx'
import NotFound from './components/NotFound.jsx'
import SkipLink from './components/SkipLink.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-slate-900 text-white">
      <SkipLink />
      <Navbar />

      <main id="main" className="flex-1" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<LandingGrid />} />
          <Route path="/services/:id" element={<ServiceDetailView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Bot Hub
        </div>
      </footer>
    </div>
  )
}

