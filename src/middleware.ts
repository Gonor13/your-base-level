import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Добавляем header для кэширования
  response.headers.set('Cache-Control', 'no-store, must-revalidate')
  
  return response
}

export const config = {
  matcher: '/',
}
