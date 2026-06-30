'use client'

import { clsx } from 'clsx'
import { ReactNode, useState } from 'react'
import { MessageCircle, BarChart3 } from 'lucide-react'

interface AssessmentShellProps {
  leftContent: ReactNode
  rightContent: ReactNode
  className?: string
}

export default function AssessmentShell({
  leftContent,
  rightContent,
  className,
}: AssessmentShellProps) {
  const [activeTab, setActiveTab] = useState<'conversation' | 'result'>('conversation')

  return (
    <div className={clsx('w-full', className)}>
      {/* Mobile Tabs */}
      <div className="mb-6 flex rounded-full border border-[#780026]/10 bg-white/80 p-1 shadow-[0_8px_24px_rgba(42,20,12,0.06)] lg:hidden">
        <button
          onClick={() => setActiveTab('conversation')}
          className={clsx(
            'flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all duration-200',
            activeTab === 'conversation'
              ? 'bg-[#050505] text-[#FFF7ED]'
              : 'text-text-secondary'
          )}
        >
          <MessageCircle className="h-4 w-4" />
          Conversa
        </button>
        <button
          onClick={() => setActiveTab('result')}
          className={clsx(
            'flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all duration-200',
            activeTab === 'result'
              ? 'bg-[#050505] text-[#FFF7ED]'
              : 'text-text-secondary'
          )}
        >
          <BarChart3 className="h-4 w-4" />
          Resultado
        </button>
      </div>

      {/* Desktop Layout - 2 Columns */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_480px]">
        {/* Left Column - Conversation */}
        <div className="animate-fade-in">
          {leftContent}
        </div>

        {/* Right Column - Live Report (sticky) */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          {rightContent}
        </div>
      </div>

      {/* Mobile Layout - Single Column with Tab Switch */}
      <div className="lg:hidden">
        <div className={clsx('animate-fade-in', activeTab === 'conversation' ? 'block' : 'hidden')}>
          {leftContent}
        </div>
        <div className={clsx(activeTab === 'result' ? 'block' : 'hidden')}>
          {rightContent}
        </div>
      </div>
    </div>
  )
}
