import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ru','en','es','zh','hi']

export function middleware(req: NextRequest){
  const { pathname } = req.nextUrl

  // 1) Пропустить статику и служебные пути
  if (
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    /\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml|json|webmanifest)$/i.test(pathname)
  ) {
    return NextResponse.next()
  }

  // 2) Корень -> /ru
  if (pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = '/ru'
    return NextResponse.redirect(url)
  }

  // 3) Валидация первого сегмента как локали
  const seg = pathname.split('/').filter(Boolean)[0]
  if (seg && !locales.includes(seg)) {
    const url = req.nextUrl.clone()
    url.pathname = `/ru/${pathname.split('/').slice(1).join('/')}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Исключаем служебные маршруты и статику из матчера на всякий случай
  matcher: ['/((?!_next|favicon.ico|api|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml|json|webmanifest)).*)'],
}
