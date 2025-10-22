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

  // Obtener el esquema de colores usando el nuevo sistema centralizado
  const colorScheme = getColorSchemeForService(service.id)

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className={`relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md border border-white/20 p-8 shadow-xl ${colorScheme.shadow} mb-8 transition-all duration-300`}>
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
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl shadow-black/5 overflow-hidden transition-all duration-300">
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
            onClick={() => setActiveTab('result')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'result' 
                ? `${colorScheme.title} border-b-2 border-current bg-white/50` 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Resultado
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
                <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {service.longDescription ?? service.description}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'result' && (
            <div className="space-y-6">
              <div>
                <h3 className={`font-semibold text-xl ${colorScheme.subtitle} mb-6`}>Archivos generados</h3>
                {service.output && service.output.length > 0 ? (
                  <div className="space-y-4">
                    {service.output.map((item, index) => (
                      <div key={index} className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        <div className="flex items-center gap-4">
                          <div className={`rounded-full ${colorScheme.badge} p-3 flex-shrink-0`}>
                            <Icon name="document" className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 leading-relaxed font-medium">{item}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
                    <Icon name="document" className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">El bot genera archivos según los parámetros configurados.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h3 className={`font-semibold text-2xl ${colorScheme.subtitle} mb-4`}>¿Te gustaria recibir informacion sobre {service.title}?</h3>
                <p className="text-gray-600 text-lg">
                  Completa el formulario y te contactaremos para enviarte más detalles.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg transition-all duration-300">
                <FormsDetail service={service} colorScheme={colorScheme} className="mt-0" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
