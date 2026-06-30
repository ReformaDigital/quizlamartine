'use client'

import { clsx } from 'clsx'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

export default function LoadingSpinner({
  size = 'md',
  className,
  text,
}: LoadingSpinnerProps) {
  return (
    <div className={clsx('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={clsx(
          'border-2 border-[#0C0F0D]/15 border-t-[#0C0F0D] rounded-full animate-spin',
          sizes[size]
        )}
      />
      {text && (
        <p className="text-text-secondary font-sans text-sm animate-pulse-subtle">
          {text}
        </p>
      )}
    </div>
  )
}

// ============================================
// TELA DE LOADING FULLSCREEN
// ============================================

export function LoadingScreen({ text = 'Carregando...' }: { text?: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <LoadingSpinner size="lg" text={text} />
    </div>
  )
}

// ============================================
// SKELETON PARA CARDS
// ============================================

export function CardSkeleton() {
  return (
    <div className="bg-card-background rounded-card p-6 border border-card-border animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-card-border rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-4 bg-card-border rounded w-full" />
          <div className="h-4 bg-card-border rounded w-3/4" />
        </div>
      </div>
    </div>
  )
}
