import { useEffect, useRef } from 'react'
import { useContactForm } from '../hooks/useContactForm'
import { useAppConfig } from '../hooks/useLinkHandler'

export default function FormsDetail({ service, className = 'mt-8' }) {
  const alertRef = useRef(null)
  const { contact } = useAppConfig()

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
  } = useContactForm({ serviceId: service?.id || '' })

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
    // Future: if contact.mode === 'webhook' and contact.url, perform a real POST.
    await submit()
  }

  const rootClass = `rounded-xl border border-slate-200 bg-white/90 p-6 shadow-md ${className}`.trim()

  return (
    <section className={rootClass} aria-labelledby="contact-title">
      <h2 id="contact-title" className="text-lg font-semibold text-slate-900">
        Contactanos
      </h2>
      <p className="mb-4 text-sm text-[var(--muted-foreground)]">
        Envianos tu consulta sobre{' '}
        <span className="font-medium text-slate-900">{service?.title}</span>.
      </p>

      <div
        ref={alertRef}
        tabIndex={-1}
        aria-live="polite"
        className={`mb-3 outline-none ${
          status === 'success'
            ? 'text-emerald-600'
            : status === 'error'
              ? 'text-red-600'
              : ''
        }`}
      >
        {status === 'success' &&
          'Mensaje enviado (simulado). Pronto integraremos el endpoint real.'}
        {status === 'error' &&
          'Ocurrio un error al enviar (simulado). Reintentalo.'}
      </div>
      <form onSubmit={onSubmit} noValidate className="grid gap-4">
        <input type="hidden" name="serviceId" value={values.serviceId} readOnly />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-900">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
            value={values.name}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-err' : undefined}
          />
          {errors.name && (
            <p id="name-err" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-900">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-err' : undefined}
          />
          {errors.email && (
            <p id="email-err" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-900">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
            value={values.message}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-err' : undefined}
          />
          {errors.message && (
            <p id="message-err" className="mt-1 text-sm text-red-600">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting || !canSubmit}
            className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
          </button>

          <button
            type="button"
            onClick={reset}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:opacity-50"
          >
            Limpiar
          </button>

          {/* Temporary hint about contact mode */}
          <span className="ml-auto text-xs text-[var(--muted-foreground)]">
            modo: {contact.mode}
            {contact.url ? ` - ${contact.url}` : ''}
          </span>
        </div>
      </form>
    </section>
  )
}
