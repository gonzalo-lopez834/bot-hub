import Container from './Container.jsx'
import FormsDetail from './FormsDetail.jsx'
import Icon from './Icon.jsx'

export default function Contact() {
  return (
    <Container>
      <div className="min-h-screen p-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/60 shadow-xl">
          <div className="inline-block p-4 bg-blue-100 rounded-2xl mb-4">
            <Icon name="robot" className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Solicita tu Agente Personalizado
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Necesitas automatizar un proceso específico? Cuéntanos sobre tu bot ideal y nosotros nos encargamos de crearlo. Nuestros agentes están diseñados para adaptarse a cualquier flujo contable o administrativo.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="lightning" className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Automatización Rápida</h3>
            </div>
            <p className="text-sm text-gray-700">Procesos automáticos desde el primer día</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="check" className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">Totalmente Adaptado</h3>
            </div>
            <p className="text-sm text-gray-700">Personalizado a tus necesidades específicas</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="shield" className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Seguridad Integrada</h3>
            </div>
            <p className="text-sm text-gray-700">Credenciales y datos protegidos</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white/50 rounded-2xl p-8 border border-white/60">
          <FormsDetail service={null} isCustomBot={true} className="mt-0" />
        </div>
      </div>
    </Container>
  )
}
