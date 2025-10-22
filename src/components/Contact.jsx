import Container from './Container.jsx'
import FormsDetail from './FormsDetail.jsx'

export default function Contact() {
  return (
    <Container>
      <div className="min-h-screen p-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
        </div>

        <div className="bg-white/50 rounded-2xl p-8 border border-white/60">
          <FormsDetail service={null} className="mt-0" />
        </div>
      </div>
    </Container>
  )
}
