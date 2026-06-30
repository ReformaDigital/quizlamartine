'use client'

import { clsx } from 'clsx'
import { ChevronLeft, User } from 'lucide-react'
import { quizData, type AlternativeKey } from '@/data/quiz'
import CTAButton from './CTAButton'

interface ConversationPanelProps {
  currentQuestion: number
  totalQuestions: number
  selectedOption: AlternativeKey | null
  userName: string
  onSelectOption: (key: AlternativeKey) => void
  onNext: () => void
  onPrevious: () => void
  className?: string
}

export default function ConversationPanel({
  currentQuestion,
  totalQuestions,
  selectedOption,
  userName,
  onSelectOption,
  onNext,
  onPrevious,
  className,
}: ConversationPanelProps) {
  const question = quizData.questions[currentQuestion]
  const isFirstQuestion = currentQuestion === 0
  const isLastQuestion = currentQuestion === totalQuestions - 1
  const canProceed = selectedOption !== null

  // Formatar número da pergunta
  const formatQuestionNumber = (num: number) => {
    return String(num + 1).padStart(2, '0')
  }

  return (
    <div className={clsx('space-y-6', className)}>
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <span className="text-[0.68rem] uppercase tracking-[0.34em] text-text-secondary/75">
          Pergunta {formatQuestionNumber(currentQuestion)} de {totalQuestions}
        </span>
        <span className="rounded-full border border-[#780026]/15 bg-[#FFF3E7] px-3 py-1 text-[0.68rem] font-semibold text-[#780026]">
          {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%
        </span>
      </div>

      {/* Question Card */}
      <div className="surface-noise relative overflow-hidden rounded-[2rem] border border-[#780026]/12 bg-card-background p-6 shadow-[0_18px_50px_rgba(42,20,12,0.08)] sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,0,38,0.05),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.88),transparent_48%)]" />

        <div className="relative">
          {/* Avatar & Chat Bubble */}
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#780026]/15 bg-white shadow-[0_10px_24px_rgba(120,0,38,0.25)]">
              <img
                src="/logopanorama.png"
                alt="Panorama da Bíblia"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-[1.3rem] rounded-tl-sm border border-[#780026]/10 bg-white px-4 py-3 shadow-[0_12px_26px_rgba(42,20,12,0.05)]">
              <p className="text-sm leading-7 text-text-primary">
                Oi{userName ? `, ${userName}` : ''}. Vamos nessa!
              </p>
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-7 space-y-2">
            <p className="text-xs uppercase tracking-[0.34em] text-text-secondary/80">
              {formatQuestionNumber(currentQuestion)} / {totalQuestions}
            </p>
            <h2 className="text-display max-w-3xl text-3xl leading-[1.05] text-text-primary sm:text-4xl md:text-5xl">
              {question.text}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {question.alternatives.map((alternative) => {
              const isSelected = selectedOption === alternative.key

              return (
                <button
                  key={alternative.key}
                  onClick={() => onSelectOption(alternative.key)}
                  className={clsx(
                    'group w-full rounded-[1.25rem] border-2 p-4 text-left transition-all duration-200 sm:p-5',
                    'hover:-translate-y-0.5',
                    'focus:outline-none focus:ring-2 focus:ring-[#F1C99A]/[0.55] focus:ring-offset-2 focus:ring-offset-transparent',
                    isSelected
                      ? 'border-[#780026] bg-[#FFF3E7] shadow-[0_12px_32px_rgba(120,0,38,0.15)]'
                      : 'border-[#780026]/12 bg-white hover:border-[#780026]/25 hover:bg-[#FFF3E7]/50 hover:shadow-[0_12px_28px_rgba(42,20,12,0.08)]'
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Selection Indicator */}
                    <div className={clsx(
                      'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-200',
                      isSelected
                        ? 'bg-[#780026] text-[#FFF7ED]'
                        : 'border border-[#780026]/15 bg-[#FFFDF8] text-[#780026]/60 group-hover:border-[#780026]/30'
                    )}>
                      {alternative.key}
                    </div>

                    {/* Option Text */}
                    <span className={clsx(
                      'flex-1 text-sm leading-6 transition-all duration-200 sm:text-base',
                      isSelected ? 'text-[#780026]' : 'text-text-primary group-hover:text-[#780026]'
                    )}>
                      {alternative.text}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={clsx(
            'flex items-center gap-2 rounded-full border border-[#780026]/12 bg-white px-4 py-3 text-sm font-semibold transition-all duration-200',
            'hover:border-[#780026]/20 hover:bg-[#FFF3E7]',
            'focus:outline-none focus:ring-2 focus:ring-[#F1C99A]/[0.55] focus:ring-offset-2 focus:ring-offset-transparent',
            isFirstQuestion
              ? 'cursor-not-allowed text-text-secondary/40'
              : 'text-text-primary'
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </button>

        <CTAButton
          onClick={onNext}
          disabled={!canProceed}
          size="md"
        >
          {isLastQuestion ? 'Continuar' : 'Próxima'}
        </CTAButton>
      </div>
    </div>
  )
}
