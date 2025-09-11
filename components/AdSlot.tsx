'use client'
import { useEffect, useRef } from 'react'


type Props = { slotId: string; format?: 'horizontal'|'rectangle'|'auto' }


export default function AdSlot({ slotId, format = 'auto' }: Props){
const ref = useRef<HTMLDivElement>(null)
const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT


useEffect(()=>{
// Инициализация AdSense, если подключен клиентский ключ
if (client && (window as any).adsbygoogle && ref.current) {
try { (window as any).adsbygoogle.push({}) } catch {}
}
},[client])


if(!client){
// Плейсхолдер до подключения AdSense
return <div className="ad">Ad placeholder: {slotId} ({format})</div>
}


// Пример блока AdSense — после модерации аккаунта замените data-ad-slot на свой
return (
<ins
className="adsbygoogle"
style={{ display: 'block', minHeight: format==='horizontal'?90:250 }}
data-ad-client={client}
data-ad-slot="0000000000"
data-ad-format={format==='horizontal' ? 'horizontal' : 'rectangle'}
data-full-width-responsive="true"
ref={ref}
/>
)
}