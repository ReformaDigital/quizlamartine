'use client'

import { clsx } from 'clsx'
import { CheckCircle2 } from 'lucide-react'

/**
 * Componente de Badge/Medalha para resultado
 */

interface ResultBadgeProps {
  level: string
  score: number
  total: number
  className?: string
}

export function ResultBadge({ level, score, total, className }: ResultBadgeProps) {
  // Determina o emoji baseado no nível
  const getEmoji = () => {
    if (level.includes('Especialista')) return '🏆'
    if (level.includes('Avançado')) return '⭐'
    if (level.includes('Desenvolvimento')) return '📚'
    return '🌱'
  }

  return (
    <div className={clsx('text-center', className)}>
      {/* Badge circular */}
      <div className="inline-flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full border border-[#A8D94A]/25 bg-[#A8D94A]/10 mb-4">
        <span className="text-5xl md:text-6xl">{getEmoji()}</span>
      </div>

      {/* Título do nível */}
      <h1 className="text-display text-3xl md:text-4xl text-text-primary mb-2">
        {level}
      </h1>

      {/* Score */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#A8D94A]/10 text-[#0C0F0D] rounded-full">
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-sans font-semibold">
          Você acertou {score} de {total}
        </span>
      </div>
    </div>
  )
}
