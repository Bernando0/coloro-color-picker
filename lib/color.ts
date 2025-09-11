export type RGB = { r:number; g:number; b:number }
export type HSL = { h:number; s:number; l:number }
export type CMYK = { c:number; m:number; y:number; k:number }

export function clamp(v:number,min=0,max=255){return Math.max(min,Math.min(max,v))}

export function hexToRgb(hex:string): RGB {
  const m = hex.replace('#','').trim()
  const full = m.length===3 ? m.split('').map(x=>x+x).join('') : m
  const int = parseInt(full,16)
  return { r:(int>>16)&255, g:(int>>8)&255, b:int&255 }
}

export function rgbToHex({r,g,b}:RGB){
  const to = (n:number)=>clamp(Math.round(n)).toString(16).padStart(2,'0')
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase()
}

export function rgbToHsl({r,g,b}:RGB): HSL {
  r/=255; g/=255; b/=255
  const max=Math.max(r,g,b), min=Math.min(r,g,b)
  let h=0,s=0,l=(max+min)/2
  const d=max-min
  if(d!==0){
    s=l>0.5? d/(2-max-min): d/(max+min)
    switch(max){
      case r: h=(g-b)/d + (g<b?6:0); break
      case g: h=(b-r)/d + 2; break
      case b: h=(r-g)/d + 4; break
    }
    h/=6
  }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) }
}

export function hslToRgb({h,s,l}:HSL): RGB {
  h/=360; s/=100; l/=100
  if(s===0){ const v=Math.round(l*255); return {r:v,g:v,b:v} }
  const hue2rgb=(p:number,q:number,t:number)=>{
    if(t<0)t+=1; if(t>1)t-=1
    if(t<1/6) return p + (q-p)*6*t
    if(t<1/2) return q
    if(t<2/3) return p + (q-p)*(2/3 - t)*6
    return p
  }
  const q = l<0.5? l*(1+s): l + s - l*s
  const p = 2*l - q
  const r = hue2rgb(p,q,h+1/3), g=hue2rgb(p,q,h), b=hue2rgb(p,q,h-1/3)
  return { r: Math.round(r*255), g: Math.round(g*255), b: Math.round(b*255) }
}

export function rgbToCmyk({r,g,b}:RGB): CMYK {
  const R=r/255, G=g/255, B=b/255
  const K = 1 - Math.max(R,G,B)
  if(K===1) return {c:0,m:0,y:0,k:100}
  const C = (1-R-K)/(1-K)
  const M = (1-G-K)/(1-K)
  const Y = (1-B-K)/(1-K)
  return { c: Math.round(C*100), m: Math.round(M*100), y: Math.round(Y*100), k: Math.round(K*100) }
}

export function cmykToRgb({c,m,y,k}:CMYK): RGB {
  const C=c/100, M=m/100, Y=y/100, K=k/100
  const r=255*(1-C)*(1-K), g=255*(1-M)*(1-K), b=255*(1-Y)*(1-K)
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) }
}