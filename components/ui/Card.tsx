import { ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
  className?: string
  quote?: string
  variant?: 'default' | 'glass'
}

export default function Card({ title, children, className = '', quote, variant = 'default' }: CardProps) {
  const base = variant === 'glass'
    ? 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col gap-4'
    : 'bg-white rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col gap-4'

  return (
    <article className={`${base} ${className}`}>
      <h3 className={`text-xl font-bold ${variant === 'glass' ? 'text-white' : 'text-brand-green'}`}>
        {title}
      </h3>
      <div className={`text-sm sm:text-base leading-relaxed flex flex-col gap-3 ${variant === 'glass' ? 'text-white/90' : 'text-gray-700'}`}>
        {children}
      </div>
      {quote && (
        <blockquote className={`mt-2 border-l-4 pl-4 italic font-medium text-sm ${variant === 'glass' ? 'border-white/60 text-white/80' : 'border-brand-green text-brand-green'}`}>
          {quote}
        </blockquote>
      )}
    </article>
  )
}