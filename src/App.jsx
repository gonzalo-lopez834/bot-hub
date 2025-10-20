import { Routes, Route } from 'react-router-dom'
import LandingGrid from './components/LandingGrid.jsx'
import ServiceDetailView from './components/ServiceDetailView.jsx'
import NotFound from './components/NotFound.jsx'
import SkipLink from './components/SkipLink.jsx'
import Navbar from './components/Navbar.jsx'
import Container from './components/Container.jsx'

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-slate-50">
      <SkipLink />
      <Navbar />

      <main id="main" className="flex-1 py-8" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Container><LandingGrid /></Container>} />
          <Route path="/services/:id" element={<Container><ServiceDetailView /></Container>} />
          <Route path="*" element={<Container><NotFound /></Container>} />
        </Routes>
      </main>

      <footer className="border-t bg-white">
        <Container className="py-6 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Bot Hub
        </Container>
      </footer>
    </div>
  )
}
