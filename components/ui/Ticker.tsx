'use client'
import { useState, useEffect } from 'react'

interface TickerProps {
  items: string[]
}

export default function Ticker({ items }: TickerProps) {
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const repeated = [...items, ...items, ...items, ...items, ...items, ...items]

  return (
    <div
      className="bg-brand-mint overflow-hidden py-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Aktuelle Informationen"
    >
      <div
        className="flex whitespace-nowrap w-max"
        style={{
          animation: reducedMotion ? 'none' : 'ticker 30s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {repeated.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center text-sm font-bold text-white"
          >
            {item}
            <span className="mx-6 text-white/40" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-16.666%); }
        }
      `}</style>
    </div>
  )
}