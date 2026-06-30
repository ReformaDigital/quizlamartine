'use client'

import { clsx } from 'clsx'
import { ArrowUpRight } from 'lucide-react'

type Tone = 'wine' | 'gold' | 'olive'

interface ReportPreviewStat {
  label: string
  value: number
  tone?: Tone
}

interface ReportPreviewProps {
  eyebrow: string
  title: string
  subtitle: string
  badgeTitle: string
  badgeText: string
  scoreLabel: string
  scoreValue: string
  tags: string[]
  stats: ReportPreviewStat[]
  strengths: string[]
  gaps: string[]
  className?: string
}

const toneStyles: Record<Tone, string> = {
  wine: 'from-[#780026] to-[#A00034]',
  gold: 'from-[#F1C99A] to-[#B9854D]',
  olive: 'from-[#7E9B57] to-[#A9C67A]',
}

export default function ReportPreview({
  eyebrow,
  title,
  subtitle,
  badgeTitle,
  badgeText,
  scoreLabel,
  scoreValue,
  tags,
  stats,
  strengths,
  gaps,
  className,
}: ReportPreviewProps) {
  return (
    <div
      className={clsx(
        'surface-noise relative overflow-hidden rounded-[2rem] border border-[#780026]/12 bg-[#FFFDF8] text-text-primary shadow-[0_26px_80px_rgba(42,20,12,0.10)]',
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,0,38,0.08),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(241,201,154,0.48),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,247,237,0.92))]" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#780026]/25 to-transparent" />

      <div className="relative p-5 sm:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.65rem] uppercase tracking-[0.42em] text-text-secondary/75">
              {eyebrow}
            </p>
            <h3 className="mt-3 text-display text-2xl font-semibold leading-none text-text-primary sm:text-3xl lg:text-[2.2rem]">
              {title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
              {subtitle}
            </p>
          </div>

          <div className="hidden shrink-0 rounded-full border border-[#780026]/12 bg-[#FFF3E7] px-3 py-2 text-right sm:block">
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-text-secondary/75">
              {scoreLabel}
            </p>
            <p className="mt-1 text-2xl font-semibold text-[#780026]">
              {scoreValue}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#780026]/12 bg-white px-3 py-1 text-[0.7rem] uppercase tracking-[0.25em] text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.03fr_0.97fr]">
          <div className="rounded-[1.5rem] border border-[#780026]/12 bg-white p-4 shadow-[0_14px_30px_rgba(42,20,12,0.06)] sm:p-5">
            <div className="flex items-center justify-between">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-text-secondary/75">
                {scoreLabel}
              </p>
              <p className="text-sm font-medium text-[#780026]">{scoreValue}</p>
            </div>

            <div className="mt-4 grid grid-cols-[minmax(88px,120px)_1fr] gap-4">
              <div className="relative aspect-square rounded-full border border-[#780026]/12 bg-[#FFF3E7] p-3">
                <div className="absolute inset-3 rounded-full border border-[#780026]/12" />
                <div
                  className="absolute inset-0 rounded-full opacity-90"
                  style={{
                    background:
                      'conic-gradient(#780026 0 26%, #F1C99A 26% 48%, #A00034 48% 74%, #B9854D 74% 100%)',
                  }}
                />
                <div className="absolute inset-6 rounded-full bg-[#FFFDF8]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[0.62rem] uppercase tracking-[0.35em] text-text-secondary/75">
                      score
                    </p>
                    <p className="mt-1 text-4xl font-semibold text-text-primary text-display">
                      {scoreValue.replace(/[^\d]/g, '') || scoreValue}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-text-secondary/80">
                      <span>{stat.label}</span>
                      <span className="text-text-primary">{stat.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#780026]/10">
                      <div
                        className={clsx('h-full rounded-full bg-gradient-to-r', toneStyles[stat.tone ?? 'wine'])}
                        style={{ width: `${Math.min(stat.value, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-[#780026]/12 bg-[#FFF3E7] p-4 sm:p-5">
              <p className="text-[0.65rem] uppercase tracking-[0.32em] text-text-secondary/75">
                {badgeTitle}
              </p>
              <p className="mt-2 text-display text-xl font-semibold leading-tight text-text-primary sm:text-2xl">
                {badgeText}
              </p>
              <p className="mt-3 text-sm leading-7 text-text-secondary">
                {subtitle}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#780026]">
                <span>Ver insight</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[#780026]/12 bg-white p-4 sm:p-5">
                <p className="text-[0.65rem] uppercase tracking-[0.32em] text-text-secondary/75">
                  forças
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-secondary">
                  {strengths.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#780026]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-[#780026]/12 bg-white p-4 sm:p-5">
                <p className="text-[0.65rem] uppercase tracking-[0.32em] text-text-secondary/75">
                  lacunas
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-secondary">
                  {gaps.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F1C99A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
