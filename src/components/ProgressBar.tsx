'use client'

import { clsx } from 'clsx'

interface ProgressBarProps {
  current: number
  total: number
  className?: string
}

export default function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className={clsx('w-full', className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary/85">
          Avanço da avaliação
        </span>
        <span className="rounded-full border border-[#780026]/15 bg-white/80 px-3 py-1 text-xs font-semibold text-text-primary">
          {current}/{total}
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-progress-bar-bg">
        {/* Preenchimento animado */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#780026] via-[#A00034] to-[#F1C99A] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-50" />
      </div>

      {/* Texto do progresso */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-text-secondary font-sans">
          Pergunta {current} de {total}
        </span>
        <span className="text-sm font-semibold text-[#780026]">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  )
}
