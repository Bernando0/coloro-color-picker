'use client'
import ColorPicker from '@/components/ColorPicker'
import AdSlot from '@/components/AdSlot'
import { useTranslation } from 'react-i18next'

export default function Page(){
  const { t } = useTranslation()
  return (
    <main className="grid">
      <section className="panel">
        <div className="section-title">{t('image')}</div>
        <ColorPicker />
      </section>
      <aside className="panel" style={{display:'grid',gap:12}}>
        <div className="section-title">{t('ads')}</div>
        <AdSlot slotId="rabusta-top" format="horizontal" />
        <AdSlot slotId="rabusta-side-1" format="rectangle" />
        <AdSlot slotId="rabusta-side-2" format="rectangle" />
        <div className="footer">{t('tip')}</div>
      </aside>
    </main>
  )
}