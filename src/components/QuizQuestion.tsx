'use client'

import { clsx } from 'clsx'
import { ChevronLeft, MessageCircle, BarChart3 } from 'lucide-react'
import ProgressBar from './ProgressBar'
import OptionCard from './OptionCard'
import CTAButton from './CTAButton'
import AssessmentSidebar from './AssessmentSidebar'
import { quizData, type AlternativeKey } from '@/data/quiz'

interface QuizQuestionProps {
  currentQuestion: number
  totalQuestions: number
  selectedOption: AlternativeKey | null
  onSelectOption: (key: AlternativeKey) => void
  onNext: () => void
  onPrevious: () => void
  className?: string
}

export default function QuizQuestion({
  currentQuestion,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNext,
  onPrevious,
  className,
}: QuizQuestionProps) {
  const question = quizData.questions[currentQuestion]
  const isFirstQuestion = currentQuestion === 0
  const isLastQuestion = currentQuestion === totalQuestions - 1
  const canProceed = selectedOption !== null

  return (
    <div className={clsx('w-full animate-float-in', className)}>
      <div className="mb-4 flex rounded-full border border-[#780026]/10 bg-white/80 p-1 shadow-[0_10px_30px_rgba(42,20,12,0.06)] backdrop-blur-sm md:hidden">
        <div className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#050505] px-4 py-3 text-sm font-semibold text-[#FFF7ED]">
          <MessageCircle className="h-4 w-4" />
          Conversa
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-text-secondary">
          <BarChart3 className="h-4 w-4" />
          Resultado
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-8">
        <section className="space-y-6">
          <ProgressBar current={currentQuestion + 1} total={totalQuestions} />

          <div className="surface-noise relative overflow-hidden rounded-[2rem] border border-[#780026]/12 bg-card-background p-5 shadow-[0_18px_50px_rgba(42,20,12,0.08)] sm:p-6 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,0,38,0.05),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.78),transparent_42%)]" />

            <div className="relative">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-[#780026]/12 bg-[#FFF3E7] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-text-secondary">
                  Pergunta {currentQuestion + 1}
                </span>
                <span className="inline-flex items-center rounded-full border border-[#780026]/15 bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-[#780026]">
                  {Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% concluído
                </span>
              </div>

              <div className="mb-6 flex items-start gap-3 md:items-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#780026]/10 bg-white shadow-[0_10px_24px_rgba(42,20,12,0.05)]">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#780026]">PB</span>
                </div>
                <div className="rounded-[1.3rem] rounded-tl-sm border border-[#780026]/10 bg-white px-4 py-3 shadow-[0_12px_26px_rgba(42,20,12,0.05)]">
                  <p className="text-sm leading-7 text-text-primary sm:text-base">
                    Oi. Sou o Arthur e vou guiar você durante esse assessment.
                  </p>
                </div>
              </div>

              <div className="mb-7 space-y-2">
                <p className="text-xs uppercase tracking-[0.34em] text-text-secondary/80">
                  Vamos nessa
                </p>
                <h2 className="text-display max-w-3xl text-2xl leading-[1.05] text-text-primary sm:text-3xl md:text-4xl">
                  {question.text}
                </h2>
              </div>

              <OptionCard
                questionId={question.id}
                selectedOption={selectedOption}
                onSelect={onSelectOption}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={onPrevious}
              disabled={isFirstQuestion}
              className={clsx(
                'flex items-center gap-2 rounded-button border border-[#780026]/12 bg-white px-4 py-3 text-sm font-semibold transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-[#F1C99A]/[0.55] focus:ring-offset-2 focus:ring-offset-transparent',
                isFirstQuestion
                  ? 'cursor-not-allowed text-text-secondary/40'
                  : 'text-text-primary hover:border-[#780026]/20 hover:bg-[#FFF3E7]'
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </button>

            <CTAButton
              onClick={onNext}
              disabled={!canProceed}
              size="md"
            >
              {isLastQuestion ? 'Ver resultado' : 'Próxima'}
            </CTAButton>
          </div>
        </section>

        <div className="hidden lg:block lg:sticky lg:top-6 lg:self-start">
          <AssessmentSidebar
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
          />
        </div>
      </div>
    </div>
  )
}
