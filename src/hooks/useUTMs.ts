'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

/**
 * Hook para capturar UTMs da URL
 *
 * Uso:
 * const utms = useUTMs()
 * utms.utm_source // "instagram"
 * utms.utm_medium // "cpc"
 * utms.utm_campaign // "quiz-biblia"
 */
export function useUTMs() {
  const searchParams = useSearchParams()

  return useMemo(() => ({
    utm_source: searchParams.get('utm_source') || '',
    utm_medium: searchParams.get('utm_medium') || '',
    utm_campaign: searchParams.get('utm_campaign') || '',
    utm_content: searchParams.get('utm_content') || '',
    utm_term: searchParams.get('utm_term') || '',
  }), [searchParams])
}

/**
 * Hook para verificar se é mobile
 */
export function useIsMobile(breakpoint = 768) {
  const searchParams = useSearchParams()

  return useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpoint
  }, [searchParams, breakpoint])
}
