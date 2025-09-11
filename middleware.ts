import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ru', 'es', 'zh', 'ar'],
  defaultLocale: 'en'
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}