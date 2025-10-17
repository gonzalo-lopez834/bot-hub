export default function GradientText({
  children,
  className = '',
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
  animationSpeed = 8,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  }

  return (
    <span
      className={`relative inline-block bg-cover text-transparent animate-gradient ${className}`}
      style={{
        ...gradientStyle,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        backgroundSize: '300% 100%',
      }}
    >
      {children}
    </span>
  )
}
