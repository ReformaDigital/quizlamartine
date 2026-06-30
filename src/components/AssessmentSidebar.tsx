'use client'

import { clsx } from 'clsx'
import { CircleUserRound, ClipboardList, Sparkles, Target } from 'lucide-react'

interface AssessmentSidebarProps {
  currentQuestion: number
  totalQuestions: number
  className?: string
}

const skillRows = [
  { label: 'Gestão', value: 0, accent: 'bg-[#7CA457]' },
  { label: 'Growth', value: 0, accent: 'bg-[#A2C96D]' },
  { label: 'Branding', value: 0, accent: 'bg-[#5B8A42]' },
  { label: 'Dados', value: 0, accent: 'bg-[#D0B16C]' },
]

const badgeItems = [
  'ICP Whisperer',
  'Paid Media Master',
  'Storyteller Mestre',
  'Dashboard Slayer',
]

export default function AssessmentSidebar({
  currentQuestion,
  totalQuestions,
  className,
}: AssessmentSidebarProps) {
  const progress = Math.max(0, Math.min(100, Math.round(((currentQuestion + 1) / totalQuestions) * 100)))

  return (
    <aside
      className={clsx(
        'surface-noise relative overflow-hidden rounded-[2rem] border border-[#1B351A] bg-[#08160D] text-[#EEF3E7] shadow-[0_30px_80px_rgba(8,22,13,0.28)]',
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,183,86,0.22),transparent_28%),radial-gradient(circle_at_85%_8%,rgba(241,201,154,0.10),transparent_20%),linear-gradient(180deg,rgba(12,32,18,0.98),rgba(5,15,9,1))]" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#A2C96D]/30 to-transparent" />

      <div className="relative p-5 sm:p-6 lg:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.38em] text-[#A2C96D]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A2C96D]" />
              self-assessment
            </p>
            <h3 className="mt-3 text-display text-2xl leading-tight text-[#F5F2EA] sm:text-[2rem]">
              Seu relatório em construção
            </h3>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-right">
            <p className="text-[0.6rem] uppercase tracking-[0.32em] text-[#A2C96D]/75">
              Progresso
            </p>
            <p className="mt-1 text-xl font-semibold text-[#EEF3E7]">{progress}%</p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.28em] text-[#A2C96D]/80">
            <span>Junho · 2026</span>
            <span>Relatório instantâneo</span>
          </div>
          <h4 className="mt-4 max-w-xs text-[1.8rem] font-semibold leading-[1.05] text-[#F5F2EA] text-display">
            Avaliação de senioridade em marketing
          </h4>

          <div className="mt-5 space-y-3 text-sm text-[#C9D2C0]/85">
            {[
              ['Nome', '—'],
              ['Cargo', '—'],
              ['Segmento', '—'],
              ['Objetivo', '—'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="flex items-center gap-2 uppercase tracking-[0.28em] text-[0.66rem] text-[#9CB08F]">
                  <ClipboardList className="h-3.5 w-3.5" />
                  {label}
                </span>
                <span className="text-[#EEF3E7]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-[#A2C96D]/20 bg-[#A2C96D] p-4 text-[#0D1C10] shadow-[0_20px_40px_rgba(162,201,109,0.18)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#08160D] text-[#A2C96D] shadow-[0_8px_18px_rgba(8,22,13,0.28)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#19311D]/70">
                Persona
              </p>
              <p className="mt-1 text-2xl font-semibold text-display">???</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-7 text-[#17301B]/80">
            Sua persona aparece aqui assim que você terminar de responder.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[#A2C96D]">Skills</p>
            <p className="mt-2 text-xl font-semibold text-[#F5F2EA] text-display">4 funções</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.24em] text-[#C9D2C0]/80">
            <Target className="h-4 w-4 text-[#A2C96D]" />
            {currentQuestion + 1}/{totalQuestions}
          </div>
        </div>

        <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-[#0C1C11] p-4">
          <div className="grid aspect-square place-items-center rounded-[1.25rem] border border-white/5 bg-[radial-gradient(circle_at_center,rgba(162,201,109,0.12),transparent_60%)] p-4">
            <div className="relative h-44 w-44">
              <div className="absolute inset-0 rounded-full border border-white/5" />
              <div className="absolute inset-4 rounded-full border border-white/5" />
              <div className="absolute inset-8 rounded-full border border-white/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[0.6rem] uppercase tracking-[0.34em] text-[#9CB08F]">Radar</p>
                  <p className="mt-2 text-4xl font-semibold text-[#F5F2EA] text-display">0</p>
                </div>
              </div>
              <div className="absolute left-1/2 top-4 h-[calc(50%-1rem)] w-px -translate-x-1/2 bg-white/10" />
              <div className="absolute bottom-4 left-1/2 h-[calc(50%-1rem)] w-px -translate-x-1/2 bg-white/10" />
              <div className="absolute left-4 top-1/2 h-px w-[calc(50%-1rem)] -translate-y-1/2 bg-white/10" />
              <div className="absolute right-4 top-1/2 h-px w-[calc(50%-1rem)] -translate-y-1/2 bg-white/10" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A2C96D] shadow-[0_0_0_8px_rgba(162,201,109,0.12)]" />
              <span className="absolute left-1/2 top-2 -translate-x-1/2 text-[0.62rem] uppercase tracking-[0.3em] text-[#EEF3E7]">Gestão</span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[0.62rem] uppercase tracking-[0.3em] text-[#EEF3E7]">Growth</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[0.62rem] uppercase tracking-[0.3em] text-[#EEF3E7]">Dados</span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[0.62rem] uppercase tracking-[0.3em] text-[#EEF3E7]">Branding</span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {skillRows.map((item, index) => (
              <div key={item.label} className="rounded-[1rem] border border-white/5 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={clsx('h-2.5 w-2.5 rounded-full', item.accent)} />
                    <span className="text-sm font-medium text-[#EEF3E7]">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#A2C96D]">{item.value}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div className={clsx('h-full rounded-full', item.accent)} style={{ width: `${Math.max(14, 24 + index * 8)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[#A2C96D]">Badges</p>
              <p className="mt-1 text-sm text-[#C9D2C0]/80">0 conquistadas</p>
            </div>
            <span className="rounded-full border border-[#A2C96D]/20 bg-[#A2C96D]/10 px-3 py-1 text-xs font-semibold text-[#A2C96D]">
              0 / 22
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {badgeItems.map((badge) => (
              <div key={badge} className="rounded-[1rem] border border-white/5 bg-[#0C1C11] px-3 py-2 text-xs text-[#EEF3E7]/85">
                {badge}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[#A2C96D]">SWOT</p>
            <ul className="mt-3 space-y-2 text-sm text-[#C9D2C0]/80">
              <li className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Forças</span>
                <span>—</span>
              </li>
              <li className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Fraquezas</span>
                <span>—</span>
              </li>
            </ul>
          </div>
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[0.62rem] uppercase tracking-[0.34em] text-[#A2C96D]">Ações</p>
            <p className="mt-3 text-sm leading-7 text-[#C9D2C0]/80">
              Complete a conversa para ver a leitura visual do seu perfil e as próximas recomendações.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
