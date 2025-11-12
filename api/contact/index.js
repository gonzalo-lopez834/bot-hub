import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

// Validar email simple
function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

// Validar datos del formulario
function validateContactForm(data, isCustomBot = false) {
  const errors = {}

  if (!data.name?.trim()) {
    errors.name = 'Nombre requerido'
  }

  if (!data.email?.trim()) {
    errors.email = 'Email requerido'
  } else if (!isEmail(data.email)) {
    errors.email = 'Email inválido'
  }

  if (isCustomBot) {
    if (!data.processType?.trim()) {
      errors.processType = 'Tipo de proceso requerido'
    }
    if (!data.processDescription?.trim()) {
      errors.processDescription = 'Descripción del proceso requerida'
    }
    if (!data.timeline?.trim()) {
      errors.timeline = 'Timeline requerido'
    }
  } else {
    if (!data.message?.trim()) {
      errors.message = 'Mensaje requerido'
    }
  }

  return errors
}

// Crear transporter SMTP
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // Permitir certificados autofirmados o con dominio diferente
    },
  })
}

// Generar HTML del email para solicitud de bot personalizado
function generateCustomBotEmailHTML(data) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            border: 1px solid #ddd;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
          }
          .content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .field {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
          }
          .field:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .value {
            color: #333;
            font-size: 14px;
            word-break: break-word;
          }
          .footer {
            text-align: center;
            color: #999;
            font-size: 12px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🤖 Nueva Solicitud de Bot Personalizado</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nombre</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value">${escapeHtml(data.email)}</div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Teléfono</div>
              <div class="value">${escapeHtml(data.phone)}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Tipo de Proceso</div>
              <div class="value">${escapeHtml(data.processType)}</div>
            </div>
            <div class="field">
              <div class="label">Descripción del Proceso</div>
              <div class="value">${escapeHtml(data.processDescription).replace(/\n/g, '<br>')}</div>
            </div>
            ${data.dataVolume ? `
            <div class="field">
              <div class="label">Volumen de Datos</div>
              <div class="value">${escapeHtml(data.dataVolume)}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Timeline Deseado</div>
              <div class="value">${escapeHtml(data.timeline)}</div>
            </div>
            ${data.serviceId ? `
            <div class="field">
              <div class="label">Service ID</div>
              <div class="value">${escapeHtml(data.serviceId)}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Este mensaje fue enviado automáticamente desde el formulario de solicitud de Bot Hub.</p>
            <p>Por favor, revisa la información y contacta al usuario lo antes posible.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Generar HTML del email para consulta genérica
function generateConsultationEmailHTML(data) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            border: 1px solid #ddd;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
          }
          .content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          .field {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
          }
          .field:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .value {
            color: #333;
            font-size: 14px;
            word-break: break-word;
          }
          .footer {
            text-align: center;
            color: #999;
            font-size: 12px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nueva Consulta</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nombre</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value">${escapeHtml(data.email)}</div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">Teléfono</div>
              <div class="value">${escapeHtml(data.phone)}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Mensaje</div>
              <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
            </div>
            ${data.serviceId ? `
            <div class="field">
              <div class="label">Service ID</div>
              <div class="value">${escapeHtml(data.serviceId)}</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Este mensaje fue enviado automáticamente desde el formulario de Bot Hub.</p>
            <p>Por favor, responde al correo del usuario lo antes posible.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Función auxiliar para escapar HTML
function escapeHtml(text) {
  if (!text) return ''
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// POST /api/contact - Recibir y procesar formulario de contacto
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, processType, processDescription, dataVolume, timeline, serviceId, isCustomBot } = req.body

    // Validar datos
    const errors = validateContactForm(
      { name, email, phone, message, processType, processDescription, dataVolume, timeline, serviceId },
      isCustomBot
    )

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors })
    }

    // Validar que las variables de entorno estén configuradas
    if (!process.env.EMAIL_SENDER || !process.env.EMAIL_PASSWORD || !process.env.SMTP_SERVER || !process.env.SMTP_PORT) {
      console.error('❌ Falta configurar variables de entorno')
      return res.status(500).json({ error: 'Email service not properly configured' })
    }

    // Crear transporter
    const transporter = createTransporter()

    // Preparar contenido del email
    const emailHTML = isCustomBot
      ? generateCustomBotEmailHTML({ name, email, phone, processType, processDescription, dataVolume, timeline, serviceId })
      : generateConsultationEmailHTML({ name, email, phone, message, serviceId })

    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_SENDER, // Enviar al buzón de Bot Hub
      cc: 'gonzalo@smartbpo.ar', // Copia a Gonzalo
      replyTo: email, // El usuario puede responder
      subject: isCustomBot ? `[SOLICITUD BOT] ${name} - ${processType}` : `[CONSULTA] ${name}`,
      html: emailHTML,
    }

    // Enviar email
    await transporter.sendMail(mailOptions)

    // Enviar email de confirmación al usuario
    const confirmationMailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: '✅ Hemos recibido tu solicitud - Bot Hub',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 10px;
                border: 1px solid #ddd;
              }
              .header {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
                text-align: center;
              }
              .content {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .footer {
                text-align: center;
                color: #999;
                font-size: 12px;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ ¡Gracias por tu solicitud!</h1>
              </div>
              <div class="content">
                <p>Hola <strong>${escapeHtml(name)}</strong>,</p>
                <p>Hemos recibido correctamente tu ${isCustomBot ? 'solicitud de bot personalizado' : 'consulta'}.</p>
                <p>Nuestro equipo revisará tu información y nos pondremos en contacto contigo lo antes posible.</p>
                <p><strong>Datos registrados:</strong></p>
                <ul>
                  <li><strong>Email:</strong> ${escapeHtml(email)}</li>
                  ${phone ? `<li><strong>Teléfono:</strong> ${escapeHtml(phone)}</li>` : ''}
                </ul>
                <p>Si tienes alguna pregunta adicional, no dudes en responder a este correo.</p>
                <p>¡Nos vemos pronto!</p>
                <p><strong>El equipo de Bot Hub</strong></p>
              </div>
              <div class="footer">
                <p>Este es un correo de confirmación automático. Por favor, no lo respondas directamente.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }

    await transporter.sendMail(confirmationMailOptions)

    res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ error: 'Failed to send email', message: error.message })
  }
})

// GET /api/contact/health - Health check para el endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Contact endpoint is running' })
})

export default router
