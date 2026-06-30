'use client'

import { clsx } from 'clsx'
import { ReactNode } from 'react'

interface QuizLayoutProps {
  children?: ReactNode
  className?: string
}

export default function QuizLayout({ children, className }: QuizLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-[#F1C99A]/[0.25] blur-3xl" />
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-[#780026]/[0.08] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#780026]/[0.05] blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 pt-4 sm:pt-6">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center rounded-[1.5rem] border border-[#780026]/30 bg-[#780026] px-6 py-3 shadow-[0_14px_40px_rgba(42,20,12,0.28)] sm:px-8 sm:py-4">
          <div className="flex items-center gap-4">
            <img
              src="/logopanorama.png"
              alt="Panorama da Bíblia"
              className="h-14 w-auto object-contain sm:h-16"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={clsx('relative z-10 flex-1 px-4 pb-10 pt-6 sm:pt-8', className)}>
        <div className="mx-auto w-full max-w-7xl">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 pb-6">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs text-text-secondary/70 sm:text-sm">
            © {new Date().getFullYear()} • Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  )
}
