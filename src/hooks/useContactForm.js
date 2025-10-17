import { useCallback, useMemo, useState } from 'react'

/** Valida email simple */
function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

/** Valida payload y devuelve { name?:string, email?:string, message?:string } */
function validate(values) {
  const errs = {}
  if (!values.name?.trim()) errs.name = 'Nombre requerido'
  if (!values.email?.trim()) errs.email = 'Email requerido'
  else if (!isEmail(values.email)) errs.email = 'Email inválido'
  if (!values.message?.trim()) errs.message = 'Mensaje requerido'
  return errs
}

/** Hook UI-only para manejar el formulario de contacto */
export function useContactForm(initial = {}) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    serviceId: '',
    ...initial,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'

  const isSubmitting = status === 'loading'

  const onChange = useCallback((e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }, [])

  const onBlur = useCallback(() => {
    setErrors(validate(values))
  }, [values])

  const canSubmit = useMemo(() => {
    const errs = validate(values)
    return Object.keys(errs).length === 0
  }, [values])

  /** Simula un envío UI-only (sin backend). Reemplazar cuando tengamos contact.url */
  const submit = useCallback(async () => {
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    try {
      setStatus('loading')
      // Simulación de red
      await new Promise((r) => setTimeout(r, 700))
      // Si en el futuro tenemos endpoint:
      // await fetch(contact.url, { method:'POST', body: JSON.stringify(values) ... })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }, [values])

  const reset = useCallback(() => {
    setValues({ name: '', email: '', message: '', serviceId: initial.serviceId || '' })
    setErrors({})
    setStatus('idle')
  }, [initial.serviceId])

  return { values, errors, status, isSubmitting, onChange, onBlur, canSubmit, submit, reset, setValues, setStatus }
}
