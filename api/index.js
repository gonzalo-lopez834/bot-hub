import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './contact/index.js'

console.log('📦 Iniciando Bot Hub API...')

try {
  console.log('⚙️ Cargando variables de entorno...')
  dotenv.config()
  console.log('✅ Variables cargadas')
  console.log(`   - EMAIL_SENDER: ${process.env.EMAIL_SENDER ? '✓ configurado' : '✗ FALTA'}`)
  console.log(`   - SMTP_SERVER: ${process.env.SMTP_SERVER ? '✓ configurado' : '✗ FALTA'}`)
  console.log(`   - SMTP_PORT: ${process.env.SMTP_PORT ? '✓ configurado' : '✗ FALTA'}`)
  console.log(`   - EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD ? '✓ configurado' : '✗ FALTA'}`)
} catch (err) {
  console.error('❌ Error al cargar .env:', err.message)
}

const app = express()
const PORT = process.env.PORT || 3000

console.log('🔧 Configurando middleware...')
app.use(cors())
app.use(express.json())
console.log('✅ Middleware configurado')

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Bot Hub API Backend is running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact'
    }
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Backend is running' })
})

console.log('📨 Registrando rutas de contacto...')
try {
  app.use('/api/contact', contactRoutes)
  console.log('✅ Rutas de contacto registradas correctamente')
} catch (err) {
  console.error('❌ Error al registrar rutas de contacto:', err.message)
  console.error(err)
  process.exit(1)
}

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('⚠️ Error capturado en middleware:', err.message)
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong', message: err.message })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada', path: req.path })
})

// Start server
console.log(`\n🚀 Iniciando servidor en puerto ${PORT}...`)
const server = app.listen(PORT, () => {
  console.log(`\n✅ ════════════════════════════════════`)
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`)
  console.log(`📧 Email: ${process.env.EMAIL_SENDER || 'Not configured'}`)
  console.log(`📨 SMTP: ${process.env.SMTP_SERVER || 'Not configured'}:${process.env.SMTP_PORT || 'Not configured'}`)
  console.log(`✅ ════════════════════════════════════\n`)
})

// Manejo de errores del servidor
server.on('error', (err) => {
  console.error('❌ Error del servidor:', err.message)
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ El puerto ${PORT} ya está en uso. Intenta con otro puerto.`)
  }
  process.exit(1)
})

// Manejo de excepciones no capturadas
process.on('uncaughtException', (err) => {
  console.error('💥 Excepción no capturada:', err.message)
  console.error(err.stack)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Rechazo de promesa no manejado:')
  console.error('Razón:', reason)
  console.error('Promise:', promise)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📛 SIGTERM recibido. Cerrando servidor...')
  server.close(() => {
    console.log('✅ Servidor cerrado')
    process.exit(0)
  })
})
