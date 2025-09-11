'use client'
import { useEffect, useState } from 'react'
import i18n, { setLanguage } from '@/lib/i18n'

const langs = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'zh', label: '中文' },
  { code: 'hi', label: 'हिन्दी' }
] as const

type LangCode = typeof langs[number]['code']

export default function LanguageSwitcher(){
  const [lang, setLang] = useState<LangCode>((i18n.language as LangCode) || 'ru')
  useEffect(()=>{ setLanguage(lang) },[lang])
  return (
    <div style={{marginLeft:'auto'}} className="row">
      {langs.map(l=> (
        <button key={l.code}
          className="btn"
          onClick={()=>setLang(l.code)}
          aria-pressed={lang===l.code}
          title={`Language: ${l.label}`}
        >{l.label}</button>
      ))}
    </div>
  )
}