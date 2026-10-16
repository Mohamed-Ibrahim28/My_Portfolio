import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiGlobe, FiGithub, FiLinkedin } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'
import { nav, contact } from '../data/content.js'
import { smoothScrollTo } from '../utils/scroll.js'

export default function Navbar() {
  const { lang, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = nav.map((n) => n.id)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id) => {
    setOpen(false)
    smoothScrollTo(id)
  }

  return (
    <motion.header
      className={`nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner container">
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); go('home') }}>
          <span className="brand-mark">MI</span>
          <span className="brand-text">
            <strong>{contact.name[lang]}</strong>
            <small>{contact.title[lang]}</small>
          </span>
        </a>

        <nav className="nav-links">
          {nav.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${active === item.id ? 'is-active' : ''}`}
              onClick={() => go(item.id)}
            >
              {item[lang]}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="icon-btn" href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a className="icon-btn" href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <button className="lang-btn" onClick={toggle} aria-label="Toggle language">
            <FiGlobe />
            <span>{lang === 'ar' ? 'EN' : 'ع'}</span>
          </button>
          <button className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            {nav.map((item) => (
              <button key={item.id} className="mobile-link" onClick={() => go(item.id)}>
                {item[lang]}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
