import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'zwerghain_auth'
const PASSWORD = (process.env.PREVIEW_PASSWORD ?? '').trim()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const incoming = String(body?.password ?? '').trim()

    if (!PASSWORD) {
      console.error('PREVIEW_PASSWORD ist nicht gesetzt!')
      return NextResponse.json(
        { error: 'Server-Konfiguration fehlt' },
        { status: 500 }
      )
    }

    if (incoming !== PASSWORD) {
      return NextResponse.json(
        { error: 'Falsches Passwort' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ ok: true })

    response.cookies.set(COOKIE_NAME, PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Ungültige Anfrage' },
      { status: 400 }
    )
  }
}