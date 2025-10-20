import { useState, useEffect } from 'react'

/**
 * Hook personalizado para detectar el scroll y cambiar el estado de la navbar
 * @param {number} threshold - Píxeles de scroll necesarios para cambiar estado (default: 50)
 * @returns {boolean} isScrolled - true si se ha hecho scroll más del threshold
 */
export function useScrollDetection(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY
          setIsScrolled(scrollPosition > threshold)
          ticking = false
        })
        ticking = true
      }
    }

    // Configurar el listener con throttling
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Verificar posición inicial
    handleScroll()

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}