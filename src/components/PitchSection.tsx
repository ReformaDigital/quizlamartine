'use client'

import { clsx } from 'clsx'
import { Play } from 'lucide-react'
import { quizData } from '@/data/quiz'

// PLACEHOLDER - Substituir pelo embed do vídeo real
const VIDEO_PLACEHOLDER = {
  youtube: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
  vimeo: 'https://player.vimeo.com/video/YOUR_VIDEO_ID',
}

// Para usar, substitua VIDEO_PLACEHOLDER pelo URL real do vídeo
// Exemplo YouTube: https://www.youtube.com/embed/dQw4w9WgXcQ
// Exemplo Vimeo: https://player.vimeo.com/video/123456789

interface PitchSectionProps {
  className?: string
}

export default function PitchSection({ className }: PitchSectionProps) {
  const { videoTransition } = quizData

  return (
    <div className={clsx('w-full', className)}>
      {/* Container do pitch */}
      <div className="surface-noise relative overflow-hidden rounded-[2rem] border border-[#F1C99A]/15 bg-[#3A0015] shadow-[0_26px_80px_rgba(42,20,12,0.22)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(241,201,154,0.16),transparent_30%),radial-gradient(circle_at_18%_18%,rgba(160,0,52,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_42%)]" />
        <div className="relative">
          {/* Headline e texto */}
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

          {/* Vídeo placeholder - substituir pelo embed real */}
          <div className="relative aspect-video bg-[#050505]">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Placeholder visual */}
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full border border-[#F1C99A]/30 bg-[#F1C99A]/10 flex items-center justify-center">
                  <Play className="w-10 h-10 text-[#F1C99A]" />
                </div>
                <p className="font-sans text-[#FFF7ED]/85">
                  Vídeo do pitch
                </p>
                <p className="font-sans text-sm text-[#FFF7ED]/55 mt-2">
                  Insira o embed do YouTube/Vimeo em src/components/PitchSection.tsx
                </p>
              </div>
            </div>

            {/* Para adicionar o vídeo real, substitua o conteúdo acima por: */}
            {/*
          <iframe
            src={VIDEO_PLACEHOLDER.youtube}
            title="Pitch Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          */}
          </div>
        </div>
      </div>
    </div>
  )
}
