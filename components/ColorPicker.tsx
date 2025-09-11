'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { rgbToHex, rgbToHsl, type RGB, type HSL } from '@/lib/color'
import { useTranslation } from 'react-i18next'

export default function ColorPicker(){
  const { t } = useTranslation()
  const fileInput = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imgEl] = useState(()=>new Image())
  const [loaded, setLoaded] = useState(false)
  const [hoverRGB, setHoverRGB] = useState<RGB|null>(null)
  const [pickedRGB, setPickedRGB] = useState<RGB|null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [selecting, setSelecting] = useState(true)

  const drawImage = useCallback((src: string)=>{
    setLoaded(false)
    imgEl.onload = () => {
      const c = canvasRef.current!
      const ctx = c.getContext('2d')!
      const maxW = 1400
      const scale = imgEl.width>maxW ? maxW/imgEl.width : 1
      c.width = Math.round(imgEl.width*scale)
      c.height = Math.round(imgEl.height*scale)
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(imgEl, 0, 0, c.width, c.height)
      setLoaded(true)
      setSelecting(true)
      setHoverRGB(null)
    }
    imgEl.src = src
  }, [imgEl])

  const getPointRGB = (e: React.MouseEvent<HTMLCanvasElement>): RGB => {
    const c = canvasRef.current!
    const rect = c.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) * (c.width / rect.width))
    const y = Math.floor((e.clientY - rect.top) * (c.height / rect.height))
    const ctx = c.getContext('2d')!
    const d = ctx.getImageData(x,y,1,1).data
    return { r:d[0], g:d[1], b:d[2] }
  }

  const onClickCanvas = useCallback((e: React.MouseEvent<HTMLCanvasElement>)=>{
    if(!loaded) return
    if(selecting){
      const rgb = getPointRGB(e)
      setPickedRGB(rgb)
      setSelecting(false)
    } else {
      setSelecting(true)
    }
  },[loaded, selecting])

  const onMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>)=>{
    if(!selecting || !loaded) return
    setHoverRGB(getPointRGB(e))
  },[selecting, loaded])

  const openFile = () => fileInput.current?.click()
  const onFile = (f?: File) => {
    const file = f ?? fileInput.current?.files?.[0]
    if(!file) return
    const reader = new FileReader()
    reader.onload = () => drawImage(String(reader.result))
    reader.readAsDataURL(file)
  }

  const onPaste = useCallback((e: ClipboardEvent)=>{
    const items = e.clipboardData?.items
    if(!items) return
    for(const it of items){
      if(it.type.startsWith('image/')){ onFile(it.getAsFile()!); break }
    }
  },[])

  useEffect(()=>{
    window.addEventListener('paste', onPaste)
    return ()=> window.removeEventListener('paste', onPaste)
  },[onPaste])

  const onDrop = (e: React.DragEvent<HTMLDivElement>)=>{
    e.preventDefault(); e.stopPropagation(); setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if(file) onFile(file)
  }

  const toHex = (rgb:RGB)=> rgbToHex(rgb)
  const toHsl = (rgb:RGB)=> rgbToHsl(rgb)

  const current = selecting ? (hoverRGB ?? pickedRGB) : (pickedRGB ?? hoverRGB)
  const hex = current ? toHex(current) : '#000000'
  const hsl = current ? toHsl(current) : null

  const copy = (text:string)=> navigator.clipboard.writeText(text)
  const cursorStyle: React.CSSProperties['cursor'] = !loaded ? 'not-allowed' : (selecting ? 'crosshair' : 'default')

  return (
    <div style={{display:'grid',gap:12}}>
      <div className="drop" onClick={openFile}
        onDragOver={(e)=>{e.preventDefault(); setDragOver(true)}}
        onDragLeave={()=>setDragOver(false)} onDrop={onDrop}
        style={{outline: dragOver? '2px solid var(--accent)':'none'}}
      >
        <input ref={fileInput} type="file" accept="image/*" hidden onChange={()=>onFile()} />
        <div className="hint">{t('dropHint')}</div>
      </div>

      <div className="canvasWrap">
        <canvas ref={canvasRef} onMouseMove={onMove} onClick={onClickCanvas} style={{ cursor: cursorStyle }} />
      </div>

      <div className="info">
        <div className="card">
          <div className="section-title">{t('currentColor')}</div>
          <div className="swatch" style={{background:hex}} />
          <div className="kv">
            <span>{t('mode')}</span>
            <span className="hint">{!loaded ? t('mode_none') : selecting ? t('mode_pick') : t('mode_locked')}</span>
          </div>
          <div className="kv">
            <span>{t('source')}</span>
            <span className="hint">{pickedRGB? t('src_selected') : hoverRGB? t('src_hover'):'—'}</span>
          </div>
        </div>
        <div className="card">
          <div className="section-title">{t('hex')}</div>
          <div className="code"><span>{hex}</span><button className="btn" onClick={()=>copy(hex)}>{t('copy')}</button></div>
        </div>
        <div className="card">
          <div className="section-title">{t('rgb')}</div>
          <div className="code">
            <span>{current? `rgb(${current.r}, ${current.g}, ${current.b})`:'—'}</span>
            {current && <button className="btn" onClick={()=>copy(`rgb(${current.r}, ${current.g}, ${current.b})`)}>{t('copy')}</button>}
          </div>
        </div>
        <div className="card">
          <div className="section-title">{t('hsl')}</div>
          <div className="code">
            <span>{hsl? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`:'—'}</span>
            {hsl && <button className="btn" onClick={()=>copy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}>{t('copy')}</button>}
          </div>
        </div>
      </div>
    </div>
  )
}