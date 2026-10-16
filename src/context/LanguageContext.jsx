import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'ar'
    return window.localStorage.getItem('mi-lang') || 'ar'
  })

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.classList.toggle('is-rtl', dir === 'rtl')
    window.localStorage.setItem('mi-lang', lang)
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      isRTL: lang === 'ar',
      toggle: () => setLang((v) => (v === 'ar' ? 'en' : 'ar')),
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
