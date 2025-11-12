import { useCallback, useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'

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

  /** Envía el formulario usando EmailJS */
  const submit = useCallback(async () => {
    const errs = validate(values, isCustomBot)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    try {
      setStatus('loading')
      
      // Configuración de EmailJS
      const SERVICE_ID = 'service_6rce20y'
      const TEMPLATE_ID_CONSULTATION = 'template_to8jewa'
      const TEMPLATE_ID_BOT = 'template_3bm957d'
      const PUBLIC_KEY = '9dwB7eVTdTxVk9nX-'
      
      const TEMPLATE_ID = isCustomBot ? TEMPLATE_ID_BOT : TEMPLATE_ID_CONSULTATION
      
      // Preparar los datos para el template
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        phone: values.phone || 'No proporcionado',
        message: values.message || '',
        service_id: values.serviceId || 'N/A',
        // Campos específicos para bot personalizado
        process_type: values.processType || '',
        process_description: values.processDescription || '',
        data_volume: values.dataVolume || 'No especificado',
        timeline: values.timeline || '',
      }

      // Enviar email usando EmailJS
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      
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
