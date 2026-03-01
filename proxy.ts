import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'zwerghain_auth'
const PASSWORD = process.env.PREVIEW_PASSWORD ?? ''

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ Ausnahmen: Login, API, Next intern, Assets
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api') ||          // <— WICHTIG
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  const cookie = request.cookies.get(COOKIE_NAME)

  if (cookie?.value === PASSWORD && PASSWORD) {
    return NextResponse.next()
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/login'
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}