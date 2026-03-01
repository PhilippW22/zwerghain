interface WaveDividerProps {
  fromColor: string
  toColor: string
  className?: string
}

export default function WaveDivider({ fromColor, toColor, className = '' }: WaveDividerProps) {
  const toIsBeige = toColor === '#F5F5DC'
  const fromIsBeige = fromColor === '#F5F5DC' || fromColor === 'transparent'

  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      aria-hidden="true"
      style={{ backgroundColor: fromIsBeige ? 'transparent' : toIsBeige ? 'transparent' : toColor }}
    >
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-20"
        style={{ display: 'block' }}
      >
        {fromIsBeige ? (
          // Übergang von beige/transparent → grün
          // Grüne Fläche füllt von unten, Welle schneidet oben heraus
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill={toColor}
          />
        ) : (
          // Übergang von grün → beige/transparent
          // Grüne Fläche endet oben mit Wellenkante
          <path
            d="M0,0 L1440,0 L1440,40 C1200,80 960,0 720,40 C480,80 240,0 0,40 Z"
            fill={fromColor}
          />
        )}
      </svg>
    </div>
  )
}