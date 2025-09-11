'use client'
import './globals.css'
import Script from 'next/script'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n' // импорт только инициализирует i18n
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  return (
    <html lang="ru">
      <head>
        {adsClient && (
          <Script id="adsbygoogle-init" async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`} crossOrigin="anonymous" />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{t('appTitle')} — {t('mvp')}</title>
        <meta name="description" content="Color picker from image. HEX/RGB/HSL in your browser." />
      </head>
      <body>
        <div className="container">
          <header className="header">
            <Image src="/logo.svg" alt="Rabusta" width={28} height={28} className="logo" />
            <div className="brand">{t('appTitle')}</div>
            <LanguageSwitcher  />
          </header>
          {children}
        </div>
      </body>
    </html>
  )}