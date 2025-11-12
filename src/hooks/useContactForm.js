import { useCallback, useMemo, useState } from 'react'

/** Valida email simple */
function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

/** Valida payload y devuelve { name?:string, email?:string, message?:string, ... } */
function validate(values, isCustomBot = false) {
  const errs = {}
  if (!values.name?.trim()) errs.name = 'Nombre requerido'
  if (!values.email?.trim()) errs.email = 'Email requerido'
  else if (!isEmail(values.email)) errs.email = 'Email inválido'
  
  if (isCustomBot) {
    // Campos adicionales para solicitud de bot personalizado
    if (!values.processType?.trim()) errs.processType = 'Tipo de proceso requerido'
    if (!values.processDescription?.trim()) errs.processDescription = 'Descripción del proceso requerida'
    if (!values.timeline?.trim()) errs.timeline = 'Timeline requerido'
  } else {
    // Para formulario genérico: solo mensaje
    if (!values.message?.trim()) errs.message = 'Mensaje requerido'
  }
  
  return errs
}

/** Hook UI-only para manejar el formulario de contacto */
export function useContactForm(initial = {}) {
  const isCustomBot = initial.isCustomBot || false
  
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    processType: '',
    processDescription: '',
    dataVolume: '',
    timeline: '',
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
    // No validar al hacer blur, solo al intentar enviar
  }, [])

  const canSubmit = useMemo(() => {
    const errs = validate(values, isCustomBot)
    return Object.keys(errs).length === 0
  }, [values, isCustomBot])

  /** Envía el formulario al backend API */
  const submit = useCallback(async () => {
    const errs = validate(values, isCustomBot)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    try {
      setStatus('loading')
      
      // Determinar la URL del API (desarrollo o producción)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, isCustomBot }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al enviar el formulario')
      }

      setStatus('success')
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }, [values, isCustomBot])

  const reset = useCallback(() => {
    const resetValues = isCustomBot
      ? {
          name: '',
          email: '',
          phone: '',
          processType: '',
          processDescription: '',
          dataVolume: '',
          timeline: '',
          serviceId: initial.serviceId || '',
        }
      : {
          name: '',
          email: '',
          message: '',
          serviceId: initial.serviceId || '',
        }
    setValues(resetValues)
    setErrors({})
    setStatus('idle')
  }, [initial.serviceId, isCustomBot])

  return { values, errors, status, isSubmitting, onChange, onBlur, canSubmit, submit, reset, setValues, setStatus }
}
