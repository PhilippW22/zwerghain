'use client'

import { useState } from 'react'

interface TickerProps {
  items: string[]
}

export default function Ticker({ items }: TickerProps) {
  const [paused, setPaused] = useState(false)

  // 6x wiederholen statt 2x – garantiert nahtlos auf allen Screengrößen
  const repeated = [...items, ...items, ...items, ...items, ...items, ...items]

  return (
    <div
      className="bg-brand-beige overflow-hidden py-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Aktuelle Informationen"
      role="marquee"
    >
      <div
        className="flex whitespace-nowrap w-max"
        style={{
          animation: 'ticker 30s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {repeated.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center text-sm text-gray-800"
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
        @media (prefers-reduced-motion: reduce) {
          div { animation: none !important; }
        }
      `}</style>
    </div>
  )
}