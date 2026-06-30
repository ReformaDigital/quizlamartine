'use client'

import { useEffect } from 'react'
import { clsx } from 'clsx'

/**
 * Componente de Toast/Notificação
 * Usado para mostrar mensagens de feedback
 */

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  message: string
  type?: ToastType
  isVisible: boolean
  onClose: () => void
  duration?: number
}

const toastStyles: Record<ToastType, string> = {
  success: 'bg-success text-white',
  error: 'bg-error text-white',
  info: 'bg-accent-primary text-white',
  warning: 'bg-accent-secondary text-white',
}

const toastIcons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
}

export default function Toast({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (!isVisible || duration <= 0) return
    const timer = window.setTimeout(onClose, duration)
    return () => window.clearTimeout(timer)
  }, [duration, isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up md:left-auto md:right-4 md:w-96">
      <div
        className={clsx(
          'flex items-center gap-3 rounded-card border border-white/10 p-4 shadow-lg',
          toastStyles[type]
        )}
      >
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold flex-shrink-0">
          {toastIcons[type]}
        </span>
        <p className="font-sans text-sm flex-1">{message}</p>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
          aria-label="Fechar"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
