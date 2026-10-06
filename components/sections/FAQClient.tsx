'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { FaqItem } from '@/lib/sanity'

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const id = question.replace(/\s+/g, '-').toLowerCase()

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-green rounded-lg"
      >
        <span className="text-sm sm:text-base font-medium text-white group-hover:text-white/80 transition-colors">
          {question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white transition-transform motion-reduce:transition-none ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${id}`}
        role="region"
        hidden={!open}
        className="pb-5"
      >
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQClient({ items }: { items: FaqItem[] }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-6 sm:px-8 py-2">
      {items.map((faq) => (
        <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  )
}