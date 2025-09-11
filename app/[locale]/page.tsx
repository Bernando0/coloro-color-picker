'use client'
import ColorPicker from '@/components/ColorPicker'
import AdSlot from '@/components/AdSlot'
import { useTranslation } from 'react-i18next'
import Header from '@/components/Header'

export default function Page(){
  const { t } = useTranslation()
  return (
    <>
      <Header />
      <main className="grid">
        <section className="panel">
          <div className="section-title">{t('image')}</div>
          <ColorPicker />
        </section>
        <aside className="panel" style={{display:'grid',gap:12}}>
          <div className="section-title">{t('ads')}</div>
          <AdSlot slotId="coloro-top" format="horizontal" />
          <AdSlot slotId="coloro-side-1" format="rectangle" />
          <AdSlot slotId="coloro-side-2" format="rectangle" />
          <div className="footer">{t('tip')}</div>
        </aside>
      </main>
    </>
  )
}