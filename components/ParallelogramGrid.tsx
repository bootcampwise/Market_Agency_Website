interface ParallelogramGridProps {
  className?: string
  variant?: 'outlined' | 'filled'
  color?: string
}

export default function ParallelogramGrid({
  className = '',
  variant = 'outlined',
  color,
}: ParallelogramGridProps) {
  const isFilled = variant === 'filled'
  const strokeColor = color || '#88B5BF'
  const fillColor = color || '#191A23'

  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 50 L50 10 H90 L50 50 Z"
        stroke={isFilled ? 'none' : strokeColor}
        fill={isFilled ? fillColor : 'none'}
        strokeWidth={isFilled ? '0' : '2'}
      />
      <path
        d="M70 50 L110 10 H150 L110 50 Z"
        stroke={isFilled ? 'none' : strokeColor}
        fill={isFilled ? fillColor : 'none'}
        strokeWidth={isFilled ? '0' : '2'}
      />
      <path
        d="M130 50 L170 10 H210 L170 50 Z"
        stroke={isFilled ? 'none' : strokeColor}
        fill={isFilled ? fillColor : 'none'}
        strokeWidth={isFilled ? '0' : '2'}
      />
      <path
        d="M10 110 L50 70 H90 L50 110 Z"
        stroke={isFilled ? 'none' : strokeColor}
        fill={isFilled ? fillColor : 'none'}
        strokeWidth={isFilled ? '0' : '2'}
      />
      <path
        d="M70 110 L110 70 H150 L110 110 Z"
        stroke={isFilled ? 'none' : strokeColor}
        fill={isFilled ? fillColor : 'none'}
        strokeWidth={isFilled ? '0' : '2'}
      />
      <path
        d="M130 110 L170 70 H210 L170 110 Z"
        stroke={isFilled ? 'none' : strokeColor}
        fill={isFilled ? fillColor : 'none'}
        strokeWidth={isFilled ? '0' : '2'}
      />
      <path
        d="M10 170 L50 130 H90 L50 170 Z"
        stroke={isFilled ? 'none' : strokeColor}
        fill={isFilled ? fillColor : 'none'}
        strokeWidth={isFilled ? '0' : '2'}
      />
      <path
        d="M70 170 L110 130 H150 L110 170 Z"
        stroke={isFilled ? 'none' : strokeColor}
        fill={isFilled ? fillColor : 'none'}
        strokeWidth={isFilled ? '0' : '2'}
      />
      <path
        d="M130 170 L170 130 H210 L170 170 Z"
        stroke={isFilled ? 'none' : strokeColor}
        fill={isFilled ? fillColor : 'none'}
        strokeWidth={isFilled ? '0' : '2'}
      />
    </svg>
  )
}
