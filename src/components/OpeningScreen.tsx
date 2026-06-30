'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { Clock3, CheckCircle2, ShieldCheck, User, ChevronRight } from 'lucide-react'
import CTAButton from './CTAButton'
import { quizData } from '@/data/quiz'

interface OpeningScreenProps {
  onStart: (name: string) => void
  className?: string
}

export default function OpeningScreen({ onStart, className }: OpeningScreenProps) {
  const { opening } = quizData
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleStart = () => {
    if (name.trim().length < 2) {
      setError('Por favor, informe seu nome para começar')
      return
    }
    setError('')
    onStart(name.trim())
  }

  return (
    <div className={clsx('flex items-center justify-center px-0 py-2 sm:px-2 sm:py-4', className)}>
      <div className="w-full max-w-5xl">
        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16 xl:grid-cols-[1fr_480px] xl:gap-20">
          {/* Left Column - Text Content */}
          <div className="animate-float-in space-y-8">
            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-display text-4xl leading-[0.95] text-text-primary sm:text-5xl lg:text-6xl">
                {opening.headline}
              </h1>
              <p className="text-lg leading-8 text-text-secondary sm:text-xl">
                {opening.subheadline}
              </p>
            </div>

            {/* Intro Text */}
            <div className="space-y-4 text-base leading-7 text-text-secondary sm:text-lg lg:max-w-xl">
              {opening.introText.split('\n\n').map((paragraph, index) => (
                <p key={index} className={index === 1 ? 'font-medium text-text-primary' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Meta Bullets */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Clock3, label: '8 minutos' },
                { icon: CheckCircle2, label: '100% gratuito' },
                { icon: ShieldCheck, label: 'resposta confidencial' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#780026]/12 bg-white/80 px-4 py-2 text-sm font-semibold text-text-primary shadow-[0_8px_24px_rgba(42,20,12,0.04)]"
                >
                  <Icon className="h-4 w-4 text-[#780026]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="space-y-4">
              {/* Name Input */}
              <div className="max-w-md">
                <label htmlFor="userName" className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary/80">
                  Para começar, como podemos te chamar?
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#780026]/55 pointer-events-none" />
                  <input
                    id="userName"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (error) setError('')
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleStart()
                    }}
                    placeholder="Seu nome"
                    autoComplete="given-name"
                    className={clsx(
                      'w-full rounded-[1rem] border-2 border-[#780026]/12 bg-white py-3.5 pl-12 pr-4 text-base text-text-primary shadow-[0_8px_20px_rgba(42,20,12,0.03)]',
                      'placeholder:text-text-secondary/45',
                      'focus:outline-none focus:border-[#780026]/35 focus:ring-2 focus:ring-[#F1C99A]/[0.45]',
                      'transition-all duration-200',
                      error ? 'border-[#A00034]/60' : ''
                    )}
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-[#A00034]">{error}</p>
                )}
              </div>

              <div className="flex flex-col gap-4 sm:flex-col sm:items-start">
                <button
                  onClick={handleStart}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-button bg-button-primary px-8 py-4 text-base font-semibold text-button-text shadow-button transition-all duration-200 hover:bg-button-primary-hover hover:shadow-button-hover focus:outline-none focus:ring-2 focus:ring-[#F1C99A]/[0.55] focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto md:text-lg"
                >
                  {opening.buttonText}
                  <ChevronRight className="h-4 w-4" />
                </button>
                <p className="max-w-md text-sm leading-6 text-text-secondary/85">
                  Suas respostas são processadas apenas para gerar seu relatório. Não compartilhamos dados com terceiros.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Report Preview */}
          <div className="animate-float-in hidden lg:block [animation-delay:150ms]">
            <div className="surface-noise relative overflow-hidden rounded-[2rem] border border-[#780026]/40 bg-[#780026] text-[#FFF7ED] shadow-[0_30px_80px_rgba(42,20,12,0.35)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,0,38,0.45),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(241,201,154,0.18),transparent_24%),linear-gradient(180deg,rgba(120,0,38,1),rgba(86,0,26,1))]" />
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#F1C99A]/45 to-transparent" />

              <div className="relative p-6 sm:p-7">
                {/* Header */}
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#F1C99A] animate-pulse" />
                  <p className="text-[0.62rem] uppercase tracking-[0.38em] text-[#F1C99A]">
                    relatório instantâneo
                  </p>
                </div>

                {/* Title */}
                <h3 className="text-display text-xl font-semibold leading-tight text-[#FFF7ED] sm:text-2xl">
                  Avaliação de conhecimento bíblico
                </h3>
                <p className="mt-2 text-sm text-[#FFF7ED]/80">
                  Um resultado visual e objetivo que mostra seu domínio sobre narrativa, conexões entre livros, temas centrais e leitura teológica da Bíblia.
                </p>

                {/* Level Card */}
                <div className="mt-5 rounded-[1.5rem] border border-[#F1C99A]/25 bg-[#F1C99A]/[0.08] p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[#F1C99A]/80">
                    Nível bíblico estimado
                  </p>
                  <p className="mt-2 text-display text-xl font-semibold text-[#F1C99A]">
                    ???
                  </p>
                  <p className="mt-2 text-sm text-[#FFF7ED]/75">
                    Seu nível aparece aqui assim que você terminar de responder.
                  </p>
                </div>

                {/* Progress Bars Preview */}
                <div className="mt-5 space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[#F1C99A]/80">
                      <span>Conhecimento</span>
                      <span>0%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#FFF7ED]/15">
                      <div className="h-full w-0 rounded-full bg-gradient-to-r from-[#F1C99A] to-[#FFF7ED]" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[#F1C99A]/80">
                      <span>Acertos</span>
                      <span>0/15</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#FFF7ED]/15">
                      <div className="h-full w-0 rounded-full bg-gradient-to-r from-[#F1C99A] to-[#FFF7ED]" />
                    </div>
                  </div>
                </div>

                {/* Diagnosis Placeholders */}
                <div className="mt-5 rounded-[1.5rem] border border-[#F1C99A]/20 bg-[#FFF7ED]/[0.04] p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[#F1C99A]/80">
                    Diagnóstico
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[#FFF7ED]/75">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F1C99A]/60" />
                      <span>Pontos fortes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F1C99A]/60" />
                      <span>Pontos de atenção</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F1C99A]/60" />
                      <span>Próximo passo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="mt-10 lg:hidden">
          <div className="surface-noise relative overflow-hidden rounded-[1.5rem] border border-[#780026]/40 bg-[#780026] p-5 text-[#FFF7ED] shadow-[0_22px_60px_rgba(42,20,12,0.30)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(241,201,154,0.18),transparent_26%),linear-gradient(180deg,rgba(120,0,38,1),rgba(86,0,26,1))]" />
            <div className="relative">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#F1C99A] animate-pulse" />
                <p className="text-[0.62rem] uppercase tracking-[0.38em] text-[#F1C99A]">
                  relatório instantâneo
                </p>
              </div>
              <p className="text-display text-lg font-semibold text-[#FFF7ED]">
                Veja seu nível bíblico estimado
              </p>
              <p className="mt-2 text-sm text-[#FFF7ED]/80">
                Após responder as 15 perguntas, você receberá um diagnóstico visual completo do seu conhecimento bíblico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
