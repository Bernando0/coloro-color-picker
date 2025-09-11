'use client'
import { useEffect, useRef } from 'react'

type Props = { slotId: string; format?: 'horizontal'|'rectangle'|'auto' }

// Без any:
declare global {
  interface Window {
    adsbygoogle?: unknown[]; // раньше было any[]
  }
}

export default function AdSlot({ slotId, format = 'auto' }: Props){
  const ref = useRef<HTMLModElement | null>(null)
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  useEffect(()=> {
    if (!client) return
    try {
      // тип push известен у массива; unknown[] ок
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch { /* ignore */ }
  }, [client, slotId, format])

  if(!client){
    return <div className="ad">Ad placeholder: {slotId} ({format})</div>
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', minHeight: format==='horizontal' ? 90 : 250 }}
      data-ad-client={client}
      data-ad-slot="0000000000"
      data-ad-format={format==='horizontal' ? 'horizontal' : 'rectangle'}
      data-full-width-responsive="true"
      ref={ref}
    />
  )
}
