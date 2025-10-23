import { useEffect, useRef } from 'react'
import { useContactForm } from '../hooks/useContactForm'
import { getColorSchemeForService } from '../utils/colorSchemes'

export default function FormsDetail({ service, colorScheme = null, className = 'mt-8', isCustomBot = false }) {
  const alertRef = useRef(null)

  // Usar el colorScheme proporcionado o generar uno basado en el service ID
  const activeColorScheme = colorScheme || getColorSchemeForService(service?.id || '')

  const {
    values,
    errors,
    status,
    isSubmitting,
    onChange,
    onBlur,
    canSubmit,
    submit,
    reset,
    setValues,
  } = useContactForm({ serviceId: service?.id || '', isCustomBot })

  // Sync serviceId when the selected service changes
  useEffect(() => {
    setValues((prev) => ({ ...prev, serviceId: service?.id || '' }))
  }, [service?.id, setValues])

  // Move focus to the feedback region for assistive tech
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      alertRef.current?.focus()
    }
  }, [status])

  const onSubmit = async (event) => {
    event.preventDefault()
    // Future: if contact mode is 'webhook' and url is set, perform a real POST.
    await submit()
  }

  const rootClass = `bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg p-8 ${className}`.trim()

  // Mapear colores del esquema a estilos CSS para inputs
  const getInputFocusColor = () => {
    const colorMap = {
      'text-blue-600': 'focus:ring-blue-500',
      'text-purple-600': 'focus:ring-purple-500',
      'text-emerald-600': 'focus:ring-emerald-500',
      'text-orange-600': 'focus:ring-orange-500',
      'text-rose-600': 'focus:ring-rose-500',
      'text-indigo-600': 'focus:ring-indigo-500',
      'text-green-600': 'focus:ring-green-500',
      'text-yellow-600': 'focus:ring-yellow-500',
      'text-cyan-600': 'focus:ring-cyan-500',
      'text-violet-600': 'focus:ring-violet-500',
      'text-fuchsia-600': 'focus:ring-fuchsia-500',
      'text-lime-600': 'focus:ring-lime-500',
      'text-teal-600': 'focus:ring-teal-500',
      'text-sky-600': 'focus:ring-sky-500'
    }
    return colorMap[activeColorScheme.badge] || 'focus:ring-blue-500'
  }

  const inputFocusClass = getInputFocusColor()

  return (
    <section className={rootClass} aria-labelledby="contact-title">
      <div className="text-center mb-8">
        <h2 id="contact-title" className={`text-2xl font-bold ${activeColorScheme.title} mb-3`}>
          {isCustomBot ? 'Solicita tu Agente Personalizado' : 'Realiza una consulta sobre nuestro Agente'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isCustomBot
            ? 'Completa el formulario con los detalles de lo que necesitas automatizar'
            : `Completa el formulario para recibir más detalles sobre ${service?.title || 'nuestros servicios'}`}
        </p>
      </div>

      {(status === 'success' || status === 'error') && (
        <div
          ref={alertRef}
          tabIndex={-1}
          aria-live="polite"
          className={`mb-6 p-4 rounded-xl border-0 outline-none ${
            status === 'success'
              ? 'bg-green-50 text-green-700 ring-1 ring-green-200'
              : 'bg-red-50 text-red-700 ring-1 ring-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {status === 'success' ? '✅' : '❌'}
            </span>
            <div>
              {status === 'success' && (
                <div>
                  <div className="font-semibold">¡Mensaje enviado correctamente!</div>
                  <div className="text-sm">Te enviaremos la información solicitada.</div>
                </div>
              )}
              {status === 'error' && (
                <div>
                  <div className="font-semibold">Error al enviar el mensaje</div>
                  <div className="text-sm">Por favor, verifica los datos e intenta nuevamente.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <form onSubmit={onSubmit} noValidate className="grid gap-4">
        <input type="hidden" name="serviceId" value={values.serviceId} readOnly />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ingresa tu nombre"
            className={`w-full rounded-xl border-0 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm ring-1 ring-gray-200 focus:ring-2 ${inputFocusClass} focus:bg-white/90 transition-all duration-200`}
            value={values.name}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-err' : undefined}
          />
          {errors.name && (
            <p id="name-err" className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <span className="text-red-500">⚠</span>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="email@ejemplo.com"
            className={`w-full rounded-xl border-0 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm ring-1 ring-gray-200 focus:ring-2 ${inputFocusClass} focus:bg-white/90 transition-all duration-200`}
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-err' : undefined}
          />
          {errors.email && (
            <p id="email-err" className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <span className="text-red-500">⚠</span>
              {errors.email}
            </p>
          )}
        </div>

        {isCustomBot && (
          <>
            <div>
              <label htmlFor="processType" className="block text-sm font-semibold text-gray-800 mb-2">
                Tipo de Proceso
              </label>
              <select
                id="processType"
                name="processType"
                className={`w-full rounded-xl border-0 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-900 shadow-sm ring-1 ring-gray-200 focus:ring-2 ${inputFocusClass} focus:bg-white/90 transition-all duration-200`}
                value={values.processType}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(errors.processType)}
                aria-describedby={errors.processType ? 'processType-err' : undefined}
              >
                <option value="">Selecciona el tipo de proceso...</option>
                <option value="afip">Trámites AFIP</option>
                <option value="onvio">Gestión Onvio</option>
                <option value="nomina">Nómina y Sueldos</option>
                <option value="facturas">Lectura/Gestión de Facturas</option>
                <option value="reportes">Reportes y Consolidación</option>
                <option value="otro">Otro</option>
              </select>
              {errors.processType && (
                <p id="processType-err" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="text-red-500">⚠</span>
                  {errors.processType}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="processDescription" className="block text-sm font-semibold text-gray-800 mb-2">
                Descripción del Proceso
              </label>
              <textarea
                id="processDescription"
                name="processDescription"
                rows={4}
                placeholder="Cuéntanos qué necesitas automatizar: sistema de origen, qué datos procesar, formato de salida esperado, etc."
                className={`w-full rounded-xl border-0 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm ring-1 ring-gray-200 focus:ring-2 ${inputFocusClass} focus:bg-white/90 transition-all duration-200 resize-none`}
                value={values.processDescription}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={Boolean(errors.processDescription)}
                aria-describedby={errors.processDescription ? 'processDescription-err' : undefined}
              />
              {errors.processDescription && (
                <p id="processDescription-err" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="text-red-500">⚠</span>
                  {errors.processDescription}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dataVolume" className="block text-sm font-semibold text-gray-800 mb-2">
                  Volumen de Datos (opcional)
                </label>
                <select
                  id="dataVolume"
                  name="dataVolume"
                  className={`w-full rounded-xl border-0 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-900 shadow-sm ring-1 ring-gray-200 focus:ring-2 ${inputFocusClass} focus:bg-white/90 transition-all duration-200`}
                  value={values.dataVolume}
                  onChange={onChange}
                  onBlur={onBlur}
                >
                  <option value="">Selecciona volumen...</option>
                  <option value="bajo">Bajo (&lt; 100 registros)</option>
                  <option value="medio">Medio (100 - 1000 registros)</option>
                  <option value="alto">Alto (1000 - 10000 registros)</option>
                  <option value="muy-alto">Muy Alto (&gt; 10000 registros)</option>
                </select>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-semibold text-gray-800 mb-2">
                  Timeline Deseado
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  className={`w-full rounded-xl border-0 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-900 shadow-sm ring-1 ring-gray-200 focus:ring-2 ${inputFocusClass} focus:bg-white/90 transition-all duration-200`}
                  value={values.timeline}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(errors.timeline)}
                  aria-describedby={errors.timeline ? 'timeline-err' : undefined}
                >
                  <option value="">Selecciona timeline...</option>
                  <option value="urgente">Urgente (1-2 semanas)</option>
                  <option value="corto">Corto Plazo (2-4 semanas)</option>
                  <option value="medio">Medio Plazo (1-2 meses)</option>
                  <option value="flexible">Flexible</option>
                </select>
                {errors.timeline && (
                  <p id="timeline-err" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="text-red-500">⚠</span>
                    {errors.timeline}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {!isCustomBot && (
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
              ¿En qué podemos ayudarte?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Describe tu consulta sobre nuestro Agente..."
              className={`w-full rounded-xl border-0 bg-white/70 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm ring-1 ring-gray-200 focus:ring-2 ${inputFocusClass} focus:bg-white/90 transition-all duration-200 resize-none`}
              value={values.message}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-err' : undefined}
            />
            {errors.message && (
              <p id="message-err" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {errors.message}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !canSubmit}
            className={`flex-1 rounded-xl bg-gradient-to-r ${activeColorScheme.buttonGradient} px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </span>
            ) : (
              isCustomBot ? 'Solicitar Propuesta' : 'Solicitar Información'
            )}
          </button>

          <button
            type="button"
            onClick={reset}
            disabled={isSubmitting}
            className="px-4 py-3 text-sm font-medium text-gray-600 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl transition-all duration-200 hover:bg-white/90 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50"
          >
            Limpiar
          </button>
        </div>
      </form>
    </section>
  )
}
