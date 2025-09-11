'use client'
import Image from 'next/image'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export default function Header(){
  const { t } = useTranslation()
  return (
    <header className="header">
      <Image src="/logo.svg" alt="Coloro" width={28} height={28} className="logo" />
      <div className="brand">Coloro</div>
      <LanguageSwitcher />
    </header>
  )
}