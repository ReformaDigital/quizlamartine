'use client'

import { useEffect } from 'react'
import { clsx } from 'clsx'
import { quizData } from '@/data/quiz'

interface PitchSectionProps {
  className?: string
}

const VTURB_PLAYER_ID = 'vid-6a42d5086c1fb1e13ed957ab'
const VTURB_SCRIPT_SRC =
  'https://scripts.converteai.net/193f16e3-1e1d-49ea-81b7-966a952c2710/players/6a42d5086c1fb1e13ed957ab/v4/player.js'

export default function PitchSection({ className }: PitchSectionProps) {
  const { videoTransition } = quizData

  useEffect(() => {
    if (document.querySelector(`script[src="${VTURB_SCRIPT_SRC}"]`)) return

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = VTURB_SCRIPT_SRC
    script.async = true
    document.head.appendChild(script)
  }, [])

  return (
    <div className={clsx('w-full', className)}>
      <div className="surface-noise relative overflow-hidden rounded-[2rem] border border-[#F1C99A]/15 bg-[#3A0015] shadow-[0_26px_80px_rgba(42,20,12,0.22)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(241,201,154,0.16),transparent_30%),radial-gradient(circle_at_18%_18%,rgba(160,0,52,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_42%)]" />
        <div className="relative">
          <div className="p-6 text-center md:p-8">
            <p className="text-[0.65rem] uppercase tracking-[0.38em] text-[#F1C99A]/85">
              seção final
            </p>
            <h2 className="text-display mb-6 mt-3 text-3xl text-[#FFF7ED] md:text-4xl">
              {videoTransition.headline}
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-7 text-[#FFF7ED]/90 md:text-lg">
              {videoTransition.text}
            </p>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: `<vturb-smartplayer id="${VTURB_PLAYER_ID}" style="display: block; margin: 0 auto; width: 100%; "><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 56.25% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
