'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import CTAButton from './CTAButton'
import { quizData, getResultByScore } from '@/data/quiz'
import { useUTMs } from '@/hooks/useUTMs'
import { User, Mail, Phone, CheckCircle, AlertCircle, Lock, ChevronRight } from 'lucide-react'

interface LeadGateProps {
  score: number
  onSubmitSuccess: () => void
  userName: string
  onNameChange: (name: string) => void
  className?: string
}

interface FormData {
  name: string
  email: string
  phone: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
}

export default function LeadGate({
  score,
  onSubmitSuccess,
  userName,
  onNameChange,
  className,
}: LeadGateProps) {
  const [formData, setFormData] = useState<FormData>({
    name: userName || '',
    email: '',
    phone: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Hook para capturar UTMs da URL
  const utms = useUTMs()
  const level = getResultByScore(score)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email: formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor, informe seu e-mail'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    // Telefone: pelo menos 10 dígitos (DDD + número)
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!phoneDigits) {
      newErrors.phone = 'Por favor, informe seu WhatsApp'
    } else if (phoneDigits.length < 10) {
      newErrors.phone = 'Número de WhatsApp inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Formata telefone brasileiro: (XX) XXXXX-XXXX
  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '')

    if (digits.length === 0) return ''
    if (digits.length <= 2) return `(${digits}`
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: formatPhone(e.target.value) })
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData({ ...formData, name })
    onNameChange(name)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          score,
          level: level.title,
          utms: {
            utm_source: utms.utm_source || '',
            utm_medium: utms.utm_medium || '',
            utm_campaign: utms.utm_campaign || '',
            utm_content: utms.utm_content || '',
            utm_term: utms.utm_term || '',
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to submit')
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Failed to submit')
      }

      setSubmitStatus('success')
      setTimeout(onSubmitSuccess, 1500)
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setSubmitStatus('error')
      // NAO redireciona em caso de erro - deixa o usuario tentar de novo
    } finally {
      setIsLoading(false)
    }
  }

  const { form } = quizData

  return (
    <div className={clsx('w-full', className)}>
      <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-10 xl:grid-cols-[1fr_480px]">
        {/* Left - Form Card */}
        <div className="surface-noise relative overflow-hidden rounded-[2rem] border border-[#780026]/12 bg-card-background p-6 shadow-[0_18px_50px_rgba(42,20,12,0.10)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,0,38,0.05),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.88),transparent_48%)]" />

          <div className="relative">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-[0.65rem] uppercase tracking-[0.38em] text-text-secondary/75">
                  — último passo
                </span>
              </div>
              <h2 className="text-display text-3xl text-text-primary sm:text-4xl">
                Acesso ao seu relatório
              </h2>
              <p className="mt-3 text-base text-text-secondary sm:text-lg">
                Última coisa antes de você ver o resultado: deixe seu e-mail e WhatsApp.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Nome já capturado (read-only) */}
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary/80">
                  Nome
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#780026]/55 pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    readOnly
                    className="w-full rounded-[1rem] border-2 border-[#780026]/8 bg-[#FFF3E7]/50 py-3.5 pl-12 pr-4 text-base text-text-secondary shadow-[0_8px_20px_rgba(42,20,12,0.03)] cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary/80">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#780026]/55 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={form.emailPlaceholder}
                    autoComplete="email"
                    inputMode="email"
                    className={clsx(
                      'w-full rounded-[1rem] border-2 border-[#780026]/12 bg-white py-3.5 pl-12 pr-4 text-base text-text-primary shadow-[0_8px_20px_rgba(42,20,12,0.03)]',
                      'placeholder:text-text-secondary/45',
                      'focus:outline-none focus:border-[#780026]/35 focus:ring-2 focus:ring-[#F1C99A]/[0.45]',
                      'transition-all duration-200',
                      'touch-manipulation',
                      errors.email ? 'border-[#A00034]/60' : ''
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-[#A00034]">{errors.email}</p>
                )}
              </div>

              {/* Campo WhatsApp */}
              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary/80">
                  WhatsApp
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#780026]/55 pointer-events-none" />
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder={form.phonePlaceholder}
                    autoComplete="tel"
                    inputMode="tel"
                    className={clsx(
                      'w-full rounded-[1rem] border-2 border-[#780026]/12 bg-white py-3.5 pl-12 pr-4 text-base text-text-primary shadow-[0_8px_20px_rgba(42,20,12,0.03)]',
                      'placeholder:text-text-secondary/45',
                      'focus:outline-none focus:border-[#780026]/35 focus:ring-2 focus:ring-[#F1C99A]/[0.45]',
                      'transition-all duration-200',
                      'touch-manipulation',
                      errors.phone ? 'border-[#A00034]/60' : ''
                    )}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-[#A00034]">{errors.phone}</p>
                )}
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 rounded-[1rem] border border-[#7E9B57]/30 bg-[#7E9B57]/[0.10] p-4 text-[#5E7D39] animate-fade-in">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{form.successMessage}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-3 rounded-[1rem] border border-[#A00034]/30 bg-[#A00034]/[0.08] p-4 text-[#A00034] animate-fade-in">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{form.errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <CTAButton
                type="submit"
                size="lg"
                loading={isLoading}
                disabled={isLoading}
                className="w-full mt-6"
              >
                {form.submitButtonText}
                <ChevronRight className="h-4 w-4" />
              </CTAButton>

              {/* Privacy Note */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <Lock className="h-4 w-4 text-text-secondary/50" />
                <p className="text-xs text-text-secondary/70 text-center">
                  Seus dados estão protegidos. Não compartilhamos com terceiros.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right - Report Preview Card */}
        <div className="hidden lg:block">
          <div className="surface-noise relative overflow-hidden rounded-[2rem] border border-[#780026]/20 bg-[#1A0A0F] shadow-[0_26px_80px_rgba(42,20,12,0.25)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,0,38,0.35),transparent_30%),radial-gradient(circle_at_85%_8%,rgba(241,201,154,0.12),transparent_22%),linear-gradient(180deg,rgba(26,10,15,1),rgba(16,6,10,1))]" />
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#780026]/40 to-transparent" />

            <div className="relative p-6 sm:p-7">
              {/* Status */}
              <div className="mb-6 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#F1C99A] animate-pulse" />
                <p className="text-[0.62rem] uppercase tracking-[0.38em] text-[#F1C99A]">
                  quase lá · Respondendo…
                </p>
              </div>

              {/* Title */}
              <h3 className="text-display text-xl font-semibold leading-tight text-[#FFF7ED]">
                Avaliação de conhecimento bíblico
              </h3>

              {/* Progress */}
              <div className="mt-5 rounded-[1.5rem] border border-[#780026]/20 bg-[#780026]/10 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[0.62rem] uppercase tracking-[0.34em] text-[#F1C99A]">Progresso</span>
                  <span className="text-xs font-semibold text-[#FFF7ED]">15 / 15</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-[#780026] via-[#A00034] to-[#F1C99A]" />
                </div>
              </div>

              {/* Level Preview */}
              <div className="mt-5 rounded-[1.5rem] border border-[#780026]/20 bg-[#780026]/10 p-4">
                <p className="text-[0.62rem] uppercase tracking-[0.32em] text-[#F1C99A]/80">
                  Seu nível
                </p>
                <p className="mt-2 text-display text-2xl font-semibold text-[#FFF7ED]">
                  {level.title}
                </p>
                <p className="mt-2 text-sm text-[#FFF7ED]/70">
                  {score} de 15 acertos
                </p>
              </div>

              {/* Message */}
              <div className="mt-5 rounded-[1rem] border border-[#780026]/20 bg-[#780026]/10 p-3">
                <p className="text-sm leading-5 text-[#FFF7ED]/60">
                  Preencha seus dados ao lado para desbloquear seu relatório completo com análise detalhada e próximos passos.
                </p>
              </div>

              {/* Arrow Indicator */}
              <div className="mt-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#780026]/30 bg-[#780026]/20 text-[#F1C99A]">
                  <ChevronRight className="h-5 w-5 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
