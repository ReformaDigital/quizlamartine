'use client'

import { clsx } from 'clsx'
import { ArrowRight } from 'lucide-react'

interface CTAButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'highlight'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
}

export default function CTAButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  disabled = false,
  loading = false,
}: CTAButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-sans font-semibold
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-[#F1C99A]/[0.55] focus:ring-offset-2 focus:ring-offset-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variants = {
    primary: `
      bg-button-primary text-button-text
      hover:bg-button-primary-hover
      shadow-button hover:shadow-button-hover
      rounded-button
      border border-[#F1C99A]/20
    `,
    secondary: `
      bg-button-secondary text-button-secondary-text
      hover:bg-[#780026]/5
      border border-[#780026]/20
      rounded-button
    `,
    outline: `
      bg-transparent border-2 border-button-secondary-border text-button-secondary-text
      hover:bg-button-secondary-border hover:text-button-text
      rounded-button
    `,
    highlight: `
      bg-[#F1C99A] text-[#1A0A0F]
      hover:bg-[#FFD9A8]
      shadow-[0_8px_28px_rgba(241,201,154,0.45),0_0_0_2px_rgba(241,201,154,0.25)]
      hover:shadow-[0_12px_36px_rgba(241,201,154,0.6),0_0_0_2px_rgba(241,201,154,0.35)]
      rounded-button
      border-2 border-[#F1C99A]
    `,
  }

  const sizes = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-8 py-4 text-base md:text-lg',
  }

  const classes = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <ArrowRight className="w-4 h-4" />
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Carregando...
        </span>
      ) : (
        <>
          {children}
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  )
}
