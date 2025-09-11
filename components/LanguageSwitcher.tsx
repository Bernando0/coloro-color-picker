'use client'
import { useEffect, useState } from 'react'
import i18n, { setLanguage } from '@/lib/i18n'
import { usePathname, useRouter } from 'next/navigation'

const langs = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'zh', label: '中文' },
  { code: 'hi', label: 'हिन्दी' }
] as const

type LangCode = typeof langs[number]['code']

export default function LanguageSwitcher(){
  const [lang, setLangState] = useState<LangCode>((i18n.language as LangCode) || 'ru')
  const router = useRouter()
  const pathname = usePathname() || '/ru'

  useEffect(()=>{ setLanguage(lang) },[lang])

  const change = (next: LangCode)=>{
    const segments = pathname.split('/').filter(Boolean)
    if(segments.length===0){
      router.push(`/${next}`)
    } else {
      segments[0] = next
      router.push('/' + segments.join('/'))
    }
    setLangState(next)
  }

  return (
    <div style={{marginLeft:'auto'}} className="row">
      {langs.map(l=> (
        <button key={l.code}
          className="btn"
          onClick={()=>change(l.code)}
          aria-pressed={lang===l.code}
          title={`Language: ${l.label}`}
        >{l.label}</button>
      ))}
    </div>
  )
}