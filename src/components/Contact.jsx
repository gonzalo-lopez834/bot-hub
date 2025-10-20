import Container from './Container.jsx'
import FormsDetail from './FormsDetail.jsx'

export default function Contact() {
  return (
    <Container>
      <div className="min-h-screen p-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contacto</h1>
          <p className="text-gray-600">Completa el formulario y nos pondremos en contacto contigo.</p>
        </div>

        <div className="bg-white/50 rounded-2xl p-8 border border-white/60">
          <FormsDetail service={null} className="mt-0" />
        </div>
      </div>
    </Container>
  )
}
