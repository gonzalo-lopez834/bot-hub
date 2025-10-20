import { motion, LayoutGroup } from 'motion/react'
import RotatingText from './RotatingText'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 py-11 sm:py-14 lg:py-17">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Badge/Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#40ffaa]/10 to-[#4079ff]/10 border border-[#4079ff]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#40ffaa] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4079ff]"></span>
            </span>
            <span className="text-sm font-medium text-gray-700">
              Automatización inteligente para contadores
            </span>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <LayoutGroup>
              <motion.h1 
                layout
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
                transition={{ layout: { duration: 0.6, ease: [0, 0, 0.58, 1] } }}
              >
                <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2">
                  <motion.span layout transition={{ layout: { duration: 0.6, ease: [0, 0, 0.58, 1] } }}>
                    Agentes
                  </motion.span>
                  <motion.span layout transition={{ layout: { duration: 0.6, ease: [0, 0, 0.58, 1] } }}>
                    <RotatingText
                      texts={['automáticos', 'confiables', 'eficientes']}
                      mainClassName="px-2 sm:px-2 md:px-3 bg-gradient-to-r from-[#40ffaa] to-[#4079ff] text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-flex"
                      staggerFrom="last"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={2500}
                    />
                  </motion.span>
                </div>
              </motion.h1>
            </LayoutGroup>
            
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
              Soluciones automatizadas creadas por <span className="font-semibold text-gray-900">SmartIA</span> para 
              descargas y procesamiento de <span className="font-semibold text-gray-900">ARCA</span> y{' '}
              <span className="font-semibold text-gray-900">ONVIO</span>. Ahorrá tiempo, eliminá errores 
              y enfocate en lo que realmente importa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
