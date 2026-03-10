import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_OWNER = ['/owner']
const PROTECTED_ADMIN = ['/admin']
const PROTECTED_AUTH  = ['/browse/favorites']
const AUTH_PAGES      = ['/auth/login', '/auth/signup']

function getTokenFromRequest(req: NextRequest): string | undefined {
  // Supabase stores the session in a cookie named sb-<ref>-auth-token
  const cookies = req.cookies
  // Try all cookie names that might hold the supabase token
  for (const [name, value] of cookies) {
    if (name.includes('auth-token') || name.includes('access-token')) {
      return value
    }
  }
  return undefined
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = getTokenFromRequest(req)
  const isLoggedIn = !!token

  // Redirect logged-in users away from auth pages
  if (AUTH_PAGES.some(p => pathname.startsWith(p))) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/browse', req.url))
    }
    return NextResponse.next()
  }

  // Protect routes that require login
  const needsAuth =
    PROTECTED_OWNER.some(p => pathname.startsWith(p)) ||
    PROTECTED_ADMIN.some(p => pathname.startsWith(p)) ||
    PROTECTED_AUTH.some(p => pathname.startsWith(p))

  if (needsAuth && !isLoggedIn) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/owner/:path*',
    '/admin/:path*',
    '/browse/favorites',
    '/auth/login',
    '/auth/signup',
  ],
}
