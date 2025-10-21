import { Routes, Route, useLocation } from 'react-router-dom'
import LandingGrid from './components/LandingGrid.jsx'
import ServiceDetailView from './components/ServiceDetailView.jsx'
import NotFound from './components/NotFound.jsx'
import Contact from './components/Contact.jsx'
import SkipLink from './components/SkipLink.jsx'
import Navbar from './components/Navbar.jsx'
import Container from './components/Container.jsx'
import Squares from './components/Squares.jsx'

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-dvh flex flex-col bg-slate-50 relative">
      {/* Fondo animado */}
      <div className="fixed inset-0 z-0">
        <Squares 
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(148, 163, 184, 0.2)"
          hoverFillColor="rgba(14, 165, 233, 0.15)"
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-dvh flex flex-col">
        <SkipLink />
        <Navbar />

        <main id="main" className={`flex-1 pb-8 ${isHomePage ? 'pt-32' : 'pt-8'}`} tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Container><LandingGrid /></Container>} />
            <Route path="/services/:id" element={<Container><ServiceDetailView /></Container>} />
            <Route path="/contact" element={<Container><Contact /></Container>} />
            <Route path="*" element={<Container><NotFound /></Container>} />
          </Routes>
        </main>

        <footer className="border-t border-white/20 bg-white/60 backdrop-blur-md shadow-xl shadow-black/5">
          <Container className="py-6 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Bot Hub
          </Container>
        </footer>
      </div>
    </div>
  )
}
