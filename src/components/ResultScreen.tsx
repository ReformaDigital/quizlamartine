'use client'

import { clsx } from 'clsx'
import { Award, Target, CheckCircle2 } from 'lucide-react'
import { getResultByScore, formatScore, quizData } from '@/data/quiz'
import CTAButton from './CTAButton'
import PitchSection from './PitchSection'

interface ResultScreenProps {
  score: number
  userName: string
  className?: string
}

export default function ResultScreen({ score, userName, className }: ResultScreenProps) {
  const result = getResultByScore(score)
  const formattedScore = formatScore(score)

  return (
    <div className={clsx('w-full space-y-10', className)}>
      {/* Main Result Grid */}
      <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-10 xl:grid-cols-[1fr_480px]">
        {/* Left Column - Result Summary */}
        <div className="surface-noise relative overflow-hidden rounded-[2rem] border border-[#780026]/20 bg-[#1A0A0F] p-6 shadow-[0_26px_80px_rgba(42,20,12,0.25)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,0,38,0.35),transparent_30%),radial-gradient(circle_at_85%_8%,rgba(241,201,154,0.15),transparent_22%),linear-gradient(180deg,rgba(26,10,15,1),rgba(16,6,10,1))]" />
          <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#780026]/40 to-transparent" />

          <div className="relative">
            {/* Status Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7E9B57]/30 bg-[#7E9B57]/15 px-4 py-2">
              <CheckCircle2 className="h-4 w-4 text-[#7E9B57]" />
              <span className="text-[0.65rem] uppercase tracking-[0.26em] text-[#7E9B57] font-semibold">
                relatório gerado
              </span>
            </div>

            {/* Title */}
            <h1 className="text-display text-4xl font-semibold leading-[0.95] text-[#FFF7ED] sm:text-5xl">
              {userName ? `${userName}, ` : ''}seu nível bíblico
            </h1>

            {/* Score Badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#F1C99A]/25 bg-[#F1C99A]/10 px-5 py-3">
              <Target className="h-5 w-5 text-[#F1C99A]" />
              <span className="text-base font-semibold text-[#F1C99A]">
                Você acertou {formattedScore}
              </span>
            </div>

            {/* Level Badge */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#780026]/40 bg-[#780026]/20 shadow-[0_12px 32px rgba(120,0,38,0.3)]">
                <Award className="h-8 w-8 text-[#F1C99A]" />
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#F1C99A]/70">
                  Seu nível
                </p>
                <p className="mt-1 text-display text-2xl font-semibold text-[#FFF7ED] sm:text-3xl">
                  {result.title}
                </p>
              </div>
            </div>

            {/* Result Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-[#FFF7ED]/80">
              {result.description}
            </p>

            {/* CTA */}
            <div className="mt-8">
              <CTAButton href={quizData.cta.url} variant="highlight" size="lg" className="w-full sm:w-auto">
                {quizData.cta.buttonText}
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Right Column - Full Report */}
        <div className="hidden lg:block">
          <div className="surface-noise relative overflow-hidden rounded-[2rem] border border-[#780026]/12 bg-[#FFFDF8] shadow-[0_26px 80px_rgba(42,20,12,0.12)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,0,38,0.06),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(241,201,154,0.35),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,247,237,0.92))]" />
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#780026]/20 to-transparent" />

            <div className="relative p-6 sm:p-7">
              {/* Header */}
              <div className="mb-5 flex items-center justify-between">
                <p className="text-[0.62rem] uppercase tracking-[0.42em] text-text-secondary/75">
                  Seu relatório
                </p>
                <span className="rounded-full border border-[#780026]/12 bg-[#FFF3E7] px-3 py-1 text-[0.62rem] font-semibold text-[#780026]">
                  {formattedScore}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-display text-xl font-semibold leading-tight text-text-primary sm:text-2xl">
                Leitura bíblica e contexto
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                A composição abaixo resume seu desempenho, com sinais claros do que já está forte e onde há margem para evoluir.
              </p>

              {/* Level Card */}
              <div className="mt-5 rounded-[1.5rem] border border-[#780026]/12 bg-[#FFF3E7] p-4">
                <p className="text-[0.65rem] uppercase tracking-[0.32em] text-text-secondary/75">
                  Nível estimado
                </p>
                <p className="mt-2 text-display text-xl font-semibold text-[#780026]">
                  {result.title}
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  {score} de 15 acertos
                </p>
              </div>

              {/* Stats */}
              <div className="mt-5 space-y-3">
                {[
                  { label: 'Contexto', value: Math.min(score * 7, 100), tone: 'wine' },
                  { label: 'Narrativa', value: Math.min(score * 6 + 10, 100), tone: 'gold' },
                  { label: 'Conexões', value: Math.min(score * 5 + 15, 100), tone: 'olive' },
                  { label: 'Teologia', value: Math.min(score * 6, 100), tone: 'wine' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="mb-1.5 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-text-secondary/80">
                      <span>{stat.label}</span>
                      <span className="text-text-primary">{stat.value}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#780026]/10">
                      <div
                        className={clsx(
                          'h-full rounded-full',
                          stat.tone === 'wine' ? 'bg-gradient-to-r from-[#780026] to-[#A00034]' :
                          stat.tone === 'gold' ? 'bg-gradient-to-r from-[#F1C99A] to-[#B9854D]' :
                          'bg-gradient-to-r from-[#7E9B57] to-[#A9C67A]'
                        )}
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Diagnosis */}
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-[1.5rem] border border-[#780026]/12 bg-white p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-text-secondary/75">
                    Forças
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7E9B57]" />
                      <span>Visão de conjunto</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7E9B57]" />
                      <span>Diagnóstico rápido</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-[1.5rem] border border-[#780026]/12 bg-white p-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-text-secondary/75">
                    Pontos de atenção
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F1C99A]" />
                      <span>Livros menos conhecidos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F1C99A]" />
                      <span>Conexões AT/NT</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Report Preview */}
      <div className="lg:hidden">
        <div className="surface-noise relative overflow-hidden rounded-[2rem] border border-[#780026]/12 bg-[#FFFDF8] p-6 shadow-[0_18px 50px_rgba(42,20,12,0.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,0,38,0.06),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(241,201,154,0.35),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,247,237,0.92))]" />

          <div className="relative">
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-text-secondary/75">
              Seu relatório
            </p>
            <h3 className="mt-2 text-display text-xl font-semibold text-text-primary">
              {result.title}
            </h3>

            <div className="mt-4 space-y-3">
              {[
                { label: 'Contexto', value: Math.min(score * 7, 100) },
                { label: 'Narrativa', value: Math.min(score * 6 + 10, 100) },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-text-secondary/80">
                    <span>{stat.label}</span>
                    <span className="text-text-primary">{stat.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#780026]/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#780026] to-[#F1C99A]"
                      style={{ width: `${stat.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PitchSection />
    </div>
  )
}
