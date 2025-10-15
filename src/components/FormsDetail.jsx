import { useEffect, useRef } from 'react'
import { useContactForm } from '../hooks/useContactForm'
import { useAppConfig } from '../provider/Provider'

export default function FormsDetail({ service }) {
  const alertRef = useRef(null)
  const { contact } = useAppConfig()

  const { values, errors, status, isSubmitting, onChange, onBlur, canSubmit, submit, reset, setValues } =
    useContactForm({ serviceId: service?.id || '' })

  // Sincroniza serviceId si cambia el servicio
  useEffect(() => {
    setValues((v) => ({ ...v, serviceId: service?.id || '' }))
  }, [service?.id, setValues])

  // Enfoque en feedback cuando cambia status (A11y)
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      alertRef.current?.focus()
    }
  }, [status])

  const onSubmit = async (e) => {
    e.preventDefault()
    // Futuro: si contact.mode === 'webhook' y contact.url, acá hacemos POST real.
    await submit()
  }

  return (
    <section className="mt-8 rounded-lg border p-4" aria-labelledby="contact-title">
      <h2 id="contact-title" className="text-lg font-medium">Contacto</h2>
      <p className="text-sm text-[var(--muted-foreground)] mb-4">
        Enviá tu consulta sobre <span className="font-medium">{service?.title}</span>.
      </p>

      {/* Feedback accesible */}
      <div
        ref={alertRef}
        tabIndex={-1}
        aria-live="polite"
        className={`mb-3 outline-none ${status === 'success' ? 'text-green-700' : status === 'error' ? 'text-red-700' : ''}`}
      >
        {status === 'success' && '¡Mensaje enviado (simulado)! Pronto integraremos el endpoint real.'}
        {status === 'error' && 'Ocurrió un error al enviar (simulado). Reintentá.'}
      </div>

      <form onSubmit={onSubmit} noValidate className="grid gap-4 max-w-xl">
        <input type="hidden" name="serviceId" value={values.serviceId} readOnly />

        <div>
          <label htmlFor="name" className="block text-sm font-medium">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1 w-full rounded-md border px-3 py-2"
            value={values.name}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-err' : undefined}
          />
          {errors.name && <p id="name-err" className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1 w-full rounded-md border px-3 py-2"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-err' : undefined}
          />
          {errors.email && <p id="email-err" className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">Mensaje</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 w-full rounded-md border px-3 py-2"
            value={values.message}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-err' : undefined}
          />
          {errors.message && <p id="message-err" className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting || !canSubmit}
            className="rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando…' : 'Enviar'}
          </button>

          <button
            type="button"
            onClick={reset}
            disabled={isSubmitting}
            className="rounded-md border px-4 py-2 disabled:opacity-50"
          >
            Limpiar
          </button>

          {/* Hint temporal sobre modo de envío */}
          <span className="ml-auto text-xs text-[var(--muted-foreground)]">
            modo: {contact.mode}{contact.url ? ` → ${contact.url}` : ''}
          </span>
        </div>
      </form>
    </section>
  )
}
