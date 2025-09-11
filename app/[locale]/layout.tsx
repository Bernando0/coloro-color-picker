import type { Metadata } from 'next'
import '../globals.css'

const supportedLocales = ['ru','en','es','zh','hi'] as const
type Locale = typeof supportedLocales[number]

const titles: Record<Locale,string> = {
  ru: 'Coloro — определить цвет по фото',
  en: 'Coloro — pick a color from image',
  es: 'Coloro — obtener color desde imagen',
  zh: 'Coloro — 从图片取色',
  hi: 'Coloro — फोटो से रंग चुनें'
}

const descriptions: Record<Locale,string> = {
  ru: 'Определяй цвет с картинки: пипетка, HEX/RGB/HSL, всё в браузере, без загрузок.',
  en: 'Pick colors from any image: eyedropper, HEX/RGB/HSL, all in your browser.',
  es: 'Obtén colores de cualquier imagen: cuentagotas, HEX/RGB/HSL, todo en el navegador.',
  zh: '从任意图片取色：取色器，HEX/RGB/HSL，全程在浏览器内完成。',
  hi: 'किसी भी छवि से रंग चुनें: आयड्रॉपर, HEX/RGB/HSL, सब कुछ ब्राउज़र में।'
}

const keywords: Record<Locale,string[]> = {
  ru: ['пипетка','цвет с фото','HEX','RGB','HSL'],
  en: ['color picker','from image','HEX','RGB','HSL'],
  es: ['selector de color','desde imagen','HEX','RGB','HSL'],
  zh: ['取色器','图片取色','HEX','RGB','HSL'],
  hi: ['color picker','फोटो से रंग','HEX','RGB','HSL']
}

const ogLocale: Record<Locale,string> = {
  ru: 'ru_RU', en: 'en_US', es: 'es_ES', zh: 'zh_CN', hi: 'hi_IN'
}

const BASE_URL = 'https://coloro.app' // поменяй на свой домен

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = (supportedLocales as readonly string[]).includes(raw) ? (raw as Locale) : 'ru'
  const title = titles[locale]
  const desc = descriptions[locale]

  return {
    metadataBase: new URL(BASE_URL),
    applicationName: 'Coloro',
    title,
    description: desc,
    keywords: keywords[locale],
    alternates: {
      languages: {
        ru: `${BASE_URL}/ru`, en: `${BASE_URL}/en`, es: `${BASE_URL}/es`, zh: `${BASE_URL}/zh`, hi: `${BASE_URL}/hi`
      }
    },
    openGraph: {
      title, description: desc, url: `/${locale}`, siteName: 'Coloro',
      locale: ogLocale[locale], type: 'website'
    },
    twitter: { card: 'summary', title, description: desc }
  }
}

// 👇 тоже делаем async и ждём params
export default async function LocaleLayout(
  { children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }
) {
  const { locale: raw } = await params
  const locale = (supportedLocales as readonly string[]).includes(raw) ? raw : 'ru'
  return (
    <html lang={locale}>
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  )
}
