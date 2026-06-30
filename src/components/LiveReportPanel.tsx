'use client'

import { clsx } from 'clsx'
import { CircleDot } from 'lucide-react'
import type { AlternativeKey } from '@/data/quiz'

interface LiveReportPanelProps {
  currentQuestion: number
  totalQuestions: number
  score: number
  level: string
  userName: string
  answers: Record<number, AlternativeKey>
  isComplete?: boolean
  className?: string
}

export default function LiveReportPanel({
  currentQuestion,
  totalQuestions,
  score,
  level,
  userName,
  answers,
  isComplete = false,
  className,
}: LiveReportPanelProps) {
  const progress = Math.round((currentQuestion / totalQuestions) * 100)
  const correctAnswers = score

  return (
    <aside
      className={clsx(
        'surface-noise relative overflow-hidden rounded-[2rem] border border-[#780026]/30 bg-[#5C0A1F] text-[#FFF7ED] shadow-[0_30px_80px_rgba(42,20,12,0.35)]',
        className
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(241,201,154,0.18),transparent_30%),radial-gradient(circle_at_85%_8%,rgba(241,201,154,0.10),transparent_22%),linear-gradient(180deg,rgba(120,0,38,0.55),rgba(92,10,31,0.85))]" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#F1C99A]/45 to-transparent" />

      <div className="relative p-5 sm:p-6 lg:p-7">
        {/* Status Header */}
        <div className="mb-6 flex items-center gap-2">
          <span className={clsx(
            'flex h-2 w-2 rounded-full',
            isComplete ? 'bg-[#7E9B57] animate-pulse' : 'bg-[#F1C99A] animate-pulse'
          )} />
          <p className="text-[0.62rem] uppercase tracking-[0.38em] text-[#F1C99A]">
            {isComplete ? '✓ relatório gerado' : 'analisando · Lendo suas respostas…'}
          </p>
        </div>

        {/* Title */}
        <h3 className="text-display text-2xl font-semibold leading-tight text-[#FFF7ED] sm:text-[1.75rem]">
          Avaliação de conhecimento bíblico
        </h3>

        {/* Metadata */}
        <div className="mt-5 space-y-2 text-sm text-[#FFF7ED]/80">
          <div className="flex items-center justify-between border-b border-white/8 py-2">
            <span className="text-[0.65rem] uppercase tracking-[0.28em] text-[#F1C99A]/80">Nome</span>
            <span className="text-[#FFF7ED]">{userName || '—'}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/8 py-2">
            <span className="text-[0.65rem] uppercase tracking-[0.28em] text-[#F1C99A]/80">Pontuação</span>
            <span className="text-[#FFF7ED]">{correctAnswers} / {totalQuestions}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/8 py-2">
            <span className="text-[0.65rem] uppercase tracking-[0.28em] text-[#F1C99A]/80">Nível</span>
            <span className="text-[#FFF7ED]">{level || '—'}</span>
          </div>
        </div>

        {/* Level Card */}
        <div className={clsx(
          'mt-5 rounded-[1.5rem] border p-4 transition-all duration-500',
          isComplete
            ? 'border-[#780026]/40 bg-[#780026]/20'
            : 'border-[#780026]/20 bg-[#780026]/10'
        )}>
          <div className="flex items-center gap-3">
            <div className={clsx(
              'flex h-12 w-12 items-center justify-center rounded-full shadow-[0_8px_18px_rgba(42,20,12,0.28)]',
              isComplete ? 'bg-[#780026] text-[#FFF7ED]' : 'bg-[#780026]/30 text-[#F1C99A]'
            )}>
              <CircleDot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#F1C99A]/70">
                Nível
              </p>
              <p className={clsx(
                'mt-1 text-xl font-semibold text-display transition-all duration-500',
                isComplete ? 'text-[#FFF7ED]' : 'text-[#FFF7ED]/50'
              )}>
                {isComplete ? level : '???'}
              </p>
            </div>
          </div>
          <p className={clsx(
            'mt-3 text-sm leading-6 transition-all duration-500',
            isComplete ? 'text-[#FFF7ED]/90' : 'text-[#FFF7ED]/50'
          )}>
            {isComplete
              ? 'Seu nível foi definido com base nas suas respostas.'
              : 'Seu nível aparece aqui assim que você terminar de responder.'
            }
          </p>
        </div>

        {/* Progress Sections */}
        <div className="mt-6 space-y-4">
          {/* Section 01 - Knowledge */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[0.62rem] uppercase tracking-[0.34em] text-[#F1C99A]">01</span>
                <span className="text-sm font-medium text-[#FFF7ED]">Conhecimento</span>
              </div>
              <span className="text-xs font-semibold text-[#F1C99A]">
                {currentQuestion} / {totalQuestions}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#F1C99A] via-[#E5B07A] to-[#FFF7ED] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Section 02 - Correct */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[0.62rem] uppercase tracking-[0.34em] text-[#F1C99A]">02</span>
                <span className="text-sm font-medium text-[#FFF7ED]">Acertos</span>
              </div>
              <span className="text-xs font-semibold text-[#FFF7ED]">
                {correctAnswers} / {totalQuestions}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7E9B57] to-[#A9C67A] transition-all duration-500"
                style={{ width: `${totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Section 03 - Diagnosis */}
          <div className={clsx(
            'rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 transition-all duration-500',
            !isComplete && 'opacity-60'
          )}>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-[0.62rem] uppercase tracking-[0.34em] text-[#F1C99A]">03</span>
              <span className="text-sm font-medium text-[#FFF7ED]">Diagnóstico</span>
            </div>

            <ul className="space-y-3 text-sm text-[#FFF7ED]/70">
              <li className="flex items-center justify-between">
                <span>Pontos fortes</span>
                <span className={clsx(
                  'transition-all',
                  isComplete ? 'text-[#7E9B57]' : 'text-[#FFF7ED]/30'
                )}>
                  {isComplete ? '✔' : '—'}
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Pontos de atenção</span>
                <span className={clsx(
                  'transition-all',
                  isComplete ? 'text-[#F1C99A]' : 'text-[#FFF7ED]/30'
                )}>
                  {isComplete ? '✔' : '—'}
                </span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Próximo passo</span>
                <span className={clsx(
                  'transition-all',
                  isComplete ? 'text-[#780026]' : 'text-[#FFF7ED]/30'
                )}>
                  {isComplete ? '✔' : '—'}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Recomendação</span>
                <span className={clsx(
                  'transition-all',
                  isComplete ? 'text-[#A00034]' : 'text-[#FFF7ED]/30'
                )}>
                  {isComplete ? '✔' : '—'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 rounded-[1rem] border border-[#780026]/20 bg-[#780026]/10 p-3">
          <p className="text-[0.65rem] leading-5 text-[#FFF7ED]/60">
            {isComplete
              ? 'Relatório completo baseado nas suas respostas.'
              : 'Complete todas as perguntas para desbloquear seu relatório completo.'
            }
          </p>
        </div>
      </div>
    </aside>
  )
}
