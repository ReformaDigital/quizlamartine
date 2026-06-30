'use client'

import { clsx } from 'clsx'
import { quizData, type AlternativeKey } from '@/data/quiz'

interface OptionCardProps {
  questionId: number
  selectedOption: AlternativeKey | null
  onSelect: (key: AlternativeKey) => void
  showFeedback?: boolean
  className?: string
}

export default function OptionCard({
  questionId,
  selectedOption,
  onSelect,
  showFeedback = false,
  className,
}: OptionCardProps) {
  const question = quizData.questions.find((q) => q.id === questionId)

  if (!question) return null

  return (
    <div className={clsx('space-y-3', className)}>
      {question.alternatives.map((alternative) => {
        const isSelected = selectedOption === alternative.key
        const showCorrectness = showFeedback && isSelected
        const isCorrect = alternative.isCorrect

        let borderColor = 'border-[#780026]/12'
        let bgColor = 'bg-option-default'
        let textColor = 'text-[#2A140C]'
        let iconContent: React.ReactNode = null

        if (showFeedback) {
          if (isCorrect) {
            borderColor = 'border-[#7E9B57]/45'
            bgColor = 'bg-[#7E9B57]/10'
            iconContent = (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7E9B57] text-xs font-black text-white">
                ✓
              </span>
            )
          } else if (isSelected && !isCorrect) {
            borderColor = 'border-[#A00034]/45'
            bgColor = 'bg-[#A00034]/10'
            iconContent = (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#A00034] text-xs font-black text-white">
                ✗
              </span>
            )
          }
        } else if (isSelected) {
          borderColor = 'border-[#780026]/45'
          bgColor = 'bg-[#FFF3E7]'
          iconContent = (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#780026] text-xs font-black text-[#FFF7ED]">
              {alternative.key}
            </span>
          )
        } else {
          iconContent = (
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#780026]/15 bg-[#FFFDF8] text-xs font-semibold text-[#780026]/75">
              {alternative.key}
            </span>
          )
        }

        return (
          <button
            key={alternative.key}
            onClick={() => onSelect(alternative.key)}
            disabled={showFeedback}
            className={clsx(
              'group w-full rounded-[1.5rem] border-2 p-4 text-left transition-all duration-200 sm:p-5',
              'hover:-translate-y-0.5 hover:border-[#780026]/25 hover:bg-option-hover hover:shadow-[0_16px_36px_rgba(42,20,12,0.10)]',
              'focus:outline-none focus:ring-2 focus:ring-[#F1C99A]/[0.55] focus:ring-offset-2 focus:ring-offset-transparent',
              'disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-none',
              borderColor,
              bgColor,
              textColor,
              !showFeedback && 'cursor-pointer'
            )}
          >
            <div className="flex items-start gap-3">
              {/* Ícone/Badge */}
              <div className="flex-shrink-0 mt-0.5">
                {iconContent}
              </div>

              {/* Texto da alternativa */}
              <span className="flex-1 text-sm leading-7 text-text-primary sm:text-base">
                {alternative.text}
              </span>
            </div>

            {/* Feedback */}
            {showCorrectness && alternative.feedback && (
              <div className="mt-4 border-t border-[#780026]/10 pt-4">
                <p className="text-sm leading-7 text-text-secondary">
                  {alternative.feedback}
                </p>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
