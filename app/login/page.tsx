'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      window.location.href = '/'
    } else {
      setError('Falsches Passwort. Bitte erneut versuchen.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-beige flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-10 w-full max-w-sm">

        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="Zwerghain Logo"
            width={120}
            height={48}
            className="h-12 w-auto"
          />
        </div>

        <h1 className="text-xl font-bold text-gray-900 text-center mb-2">
          Vorschau-Zugang
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Diese Seite ist passwortgeschützt.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              aria-describedby={error ? 'login-error' : undefined}
              aria-invalid={!!error}
              autoComplete="current-password"
              className={`rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition ${
                error ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {error && (
              <p id="login-error" role="alert" className="text-xs text-red-500 mt-0.5">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-brand-green text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-brand-green/90 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {loading ? 'Wird geprüft…' : 'Zugang öffnen'}
          </button>
        </form>

      </div>
    </div>
  )
}