interface DiagonalPatternProps {
  variant?: 'light' | 'dark'
  className?: string
}

export default function DiagonalPattern({
  variant = 'light',
  className = '',
}: DiagonalPatternProps) {
  const strokeColor = variant === 'light' ? '#E5E5E5' : '#333333'

  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <line
            key={`${row}-${col}`}
            x1={col * 70 + 10}
            y1={row * 70 + 10}
            x2={col * 70 + 50}
            y2={row * 70 + 50}
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))
      )}
    </svg>
  )
}
