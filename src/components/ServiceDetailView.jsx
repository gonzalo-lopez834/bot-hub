import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getColorSchemeForService } from '../utils/colorSchemes'
import Icon from './Icon'
import FormsDetail from './FormsDetail'
import { useServices } from '../hooks/useServices'

export default function ServiceDetailView() {
  const { id } = useParams()
  const { getById, getBySlug, loading, error } = useServices()
  const [activeTab, setActiveTab] = useState('description')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Cargando...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">Error: {error}</div>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            <span aria-hidden="true">&larr;</span>
            Volver
          </Link>
        </div>
      </div>
    )
  }

  const service = getById(id) || getBySlug(id)
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600 mb-4">Servicio no encontrado.</div>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            <span aria-hidden="true">&larr;</span>
            Volver
          </Link>
        </div>
      </div>
    )
  }

  const advantages =
    Array.isArray(service.advantages) && service.advantages.length > 0
      ? service.advantages
      : null

  // Obtener el esquema de colores usando el nuevo sistema centralizado
  const colorScheme = getColorSchemeForService(service.id)

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${colorScheme.gradient} backdrop-blur-sm p-8 shadow-xl mb-8`}>
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
        <div className="relative flex items-center gap-6">
          <div className={`rounded-2xl ${colorScheme.iconBg} p-4 ${colorScheme.iconText}`}>
            <Icon name={service.iconName} className="h-12 w-12" />
          </div>
          <div>
            <h1 className={`font-bold text-4xl tracking-tight ${colorScheme.title}`}>
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('description')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'description' 
                ? `${colorScheme.title} border-b-2 border-current bg-white/50` 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Descripción
          </button>
          <button 
            onClick={() => setActiveTab('advantages')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'advantages' 
                ? `${colorScheme.title} border-b-2 border-current bg-white/50` 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Ventajas
          </button>
          <button 
            onClick={() => setActiveTab('process')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'process' 
                ? `${colorScheme.title} border-b-2 border-current bg-white/50` 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Proceso
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'contact' 
                ? `${colorScheme.title} border-b-2 border-current bg-white/50` 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Contacto
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'description' && (
            <div className="space-y-6">
              <div>
                <h3 className={`font-semibold text-xl ${colorScheme.subtitle} mb-4`}>¿Qué hace este servicio?</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {service.longDescription ?? service.description}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-white/50 rounded-2xl border border-white/60">
                  <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                  <div className="text-gray-600 font-medium">Precisión</div>
                </div>
                <div className="text-center p-6 bg-white/50 rounded-2xl border border-white/60">
                  <div className="text-3xl font-bold text-green-600 mb-2">&lt; 5min</div>
                  <div className="text-gray-600 font-medium">Configuración</div>
                </div>
                <div className="text-center p-6 bg-white/50 rounded-2xl border border-white/60">
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-gray-600 font-medium">Disponibilidad</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advantages' && advantages && (
            <div className="space-y-6">
              <div>
                <h3 className={`font-semibold text-xl ${colorScheme.subtitle} mb-6`}>Ventajas clave de {service.title}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {advantages.map((adv, index) => (
                    <div key={index} className="bg-white/50 rounded-2xl p-6 border border-white/60">
                      <div className="flex items-start gap-4">
                        <div className={`rounded-full ${colorScheme.badge} p-3 flex-shrink-0`}>
                          <Icon name="check" className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Ventaja {index + 1}</h4>
                          <p className="text-gray-700 leading-relaxed">{adv}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-6">
              <div>
                <h3 className={`font-semibold text-xl ${colorScheme.subtitle} mb-6`}>¿Cómo funciona el proceso?</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Configuración inicial",
                      description: "Configuramos los parámetros específicos de tu empresa y validamos los datos de entrada necesarios para el proceso.",
                      icon: "settings"
                    },
                    {
                      step: 2,
                      title: "Extracción automática",
                      description: "Nuestro sistema se conecta automáticamente con AFIP y otras fuentes externas para obtener la información requerida.",
                      icon: "download"
                    },
                    {
                      step: 3,
                      title: "Procesamiento inteligente",
                      description: "Aplicamos reglas de negocio personalizadas y procesamos los datos con algoritmos de validación avanzados.",
                      icon: "cpu"
                    },
                    {
                      step: 4,
                      title: "Entrega de resultados",
                      description: "Generamos reportes detallados con evidencias completas y los entregamos en el formato que necesites.",
                      icon: "document"
                    }
                  ].map((step, index) => (
                    <div key={index} className="bg-white/50 rounded-2xl p-6 border border-white/60">
                      <div className="flex items-start gap-6">
                        <div className={`rounded-full ${colorScheme.stepBg} w-12 h-12 flex items-center justify-center flex-shrink-0`}>
                          <Icon name={step.icon} className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${colorScheme.badge} text-sm font-bold`}>
                              {step.step}
                            </span>
                            <h4 className="font-semibold text-lg text-gray-900">{step.title}</h4>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h3 className={`font-semibold text-2xl ${colorScheme.subtitle} mb-4`}>¿Listo para automatizar tu contabilidad?</h3>
                <p className="text-gray-600 text-lg">
                  Completa el formulario y te contactaremos para coordinar una demostración personalizada de {service.title}
                </p>
              </div>
              <div className="bg-white/50 rounded-2xl p-8 border border-white/60">
                <FormsDetail service={service} className="mt-0" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
