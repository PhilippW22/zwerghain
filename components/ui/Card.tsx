import { ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
  className?: string
  quote?: string
  variant?: 'default' | 'glass' | 'green' | 'cream' | 'outline'}

export default function Card({ title, children, className = '', quote, variant = 'default' }: CardProps) {
  const base: Record<string, string> = {
    default: 'bg-white rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col gap-4',
    glass:   'bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col gap-4',
    green:   'bg-[#83A17D] rounded-3xl p-6 sm:p-8 flex flex-col gap-4',
    cream:   'bg-[#fff8f2] rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col gap-4',
  }

  const titleColor: Record<string, string> = {
    default: 'text-brand-green',
    glass:   'text-white',
    green:   'text-white',
    cream:   'text-brand-green',
  }

  const textColor: Record<string, string> = {
    default: 'text-gray-700',
    glass:   'text-white/90',
    green:   'text-white/90',
    cream:   'text-gray-700',
  }

  const quoteColor: Record<string, string> = {
    default: 'border-brand-green text-brand-green',
    glass:   'border-white/60 text-white/80',
    green:   'border-white/60 text-white/80',
    cream:   'border-brand-green text-brand-green',
  }

  return (
    <article className={`${base[variant]} ${className}`}>
      <h3 className={`text-xl font-bold ${titleColor[variant]}`}>
        {title}
      </h3>
      <div className={`text-sm sm:text-base leading-relaxed flex flex-col gap-3 ${textColor[variant]}`}>
        {children}
      </div>
      {quote && (
        <blockquote className={`mt-2 border-l-4 pl-4 italic font-medium text-sm ${quoteColor[variant]}`}>
          {quote}
        </blockquote>
      )}
    </article>
  )
}