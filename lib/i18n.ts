'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: { t: {
    appTitle: 'Coloro', mvp: 'MVP', image: 'Image', ads: 'Ads',
    dropHint: 'Drag & drop an image, click to select a file, or paste from clipboard (Ctrl/Cmd+V)',
    currentColor: 'Current color', mode: 'Mode',
    mode_none: 'no image', mode_pick: 'pick color', mode_locked: 'locked (click to pick again)',
    source: 'Source', src_selected: 'picked', src_hover: 'under cursor',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL', copy: 'Copy',
    tip: 'Tip: everything runs in your browser. No uploads.'
  }},
  ru: { t: {
    appTitle: 'Coloro', mvp: 'MVP', image: 'Изображение', ads: 'Реклама',
    dropHint: 'Перетащите изображение, кликните чтобы выбрать файл или вставьте из буфера (Ctrl/Cmd+V)',
    currentColor: 'Текущий цвет', mode: 'Режим',
    mode_none: 'нет изображения', mode_pick: 'выбор цвета', mode_locked: 'зафиксировано (клик — снова выбрать)',
    source: 'Источник', src_selected: 'выбран', src_hover: 'под курсором',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL', copy: 'Копировать',
    tip: 'Совет: всё считается в браузере. Файлы не отправляются.'
  }},
  es: { t: {
    appTitle: 'Coloro', mvp: 'MVP', image: 'Imagen', ads: 'Anuncios',
    dropHint: 'Arrastra y suelta una imagen, haz clic para elegir archivo o pega desde el portapapeles (Ctrl/Cmd+V)',
    currentColor: 'Color actual', mode: 'Modo',
    mode_none: 'sin imagen', mode_pick: 'seleccionar color', mode_locked: 'bloqueado (clic para seleccionar de nuevo)',
    source: 'Fuente', src_selected: 'elegido', src_hover: 'bajo el cursor',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL', copy: 'Copiar',
    tip: 'Consejo: todo se ejecuta en tu navegador. Sin cargas.'
  }},
  zh: { t: {
    appTitle: 'Coloro', mvp: 'MVP', image: '图片', ads: '广告',
    dropHint: '拖拽图片、点击选择文件或从剪贴板粘贴（Ctrl/Cmd+V）',
    currentColor: '当前颜色', mode: '模式',
    mode_none: '无图片', mode_pick: '取色', mode_locked: '已锁定（点击重新取色）',
    source: '来源', src_selected: '已选', src_hover: '光标下',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL', copy: '复制',
    tip: '提示：一切在浏览器中完成，不会上传文件。'
  }},
  hi: { t: {
    appTitle: 'Coloro', mvp: 'MVP', image: 'छवि', ads: 'विज्ञापन',
    dropHint: 'छवि खींचें-छोड़ें, फ़ाइल चुनने के लिए क्लिक करें या क्लिपबोर्ड से पेस्ट करें (Ctrl/Cmd+V)',
    currentColor: 'वर्तमान रंग', mode: 'मोड',
    mode_none: 'कोई छवि नहीं', mode_pick: 'रंग चुनें', mode_locked: 'लॉक (दोबारा चुनने के लिए क्लिक करें)',
    source: 'स्रोत', src_selected: 'चुना हुआ', src_hover: 'कर्सर के नीचे',
    hex: 'HEX', rgb: 'RGB', hsl: 'HSL', copy: 'कॉपी',
    tip: 'टिप: सब कुछ ब्राउज़र में चलता है। अपलोड नहीं।'
  }}
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    ns: ['t'],
    defaultNS: 't'
  })
}

export function setLanguage(lang: 'en'|'ru'|'es'|'zh'|'hi'){
  if (i18n.language !== lang) {
    void i18n.changeLanguage(lang)
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }
}

export default i18n