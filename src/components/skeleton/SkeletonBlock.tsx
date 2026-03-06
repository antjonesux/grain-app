import type { CSSProperties } from 'react'

const SHIMMER_KEYFRAMES = `
@keyframes grain-skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
`

export interface SkeletonBlockProps {
  width?: string | number
  height: string | number
  borderRadius?: string | number
  style?: CSSProperties
}

export function SkeletonBlock ({
  width,
  height,
  borderRadius = 8,
  style,
}: SkeletonBlockProps) {
  const baseStyle: CSSProperties = {
    width: width ?? '100%',
    height,
    borderRadius: typeof borderRadius === 'number' ? borderRadius : borderRadius,
    background: `linear-gradient(90deg, var(--bg-card) 0%, var(--bg-elevated) 50%, var(--bg-card) 100%)`,
    backgroundSize: '200% 100%',
    animation: 'grain-skeleton-shimmer 1.2s ease-in-out infinite',
  }

  return (
    <>
      <style>{SHIMMER_KEYFRAMES}</style>
      <div
        style={{ ...baseStyle, ...style }}
        role="presentation"
        aria-hidden="true"
      />
    </>
  )
}
