import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiArrowDown,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiCpu,
  FiZap,
  FiBarChart2,
} from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'
import { hero, contact } from '../data/content.js'
import { smoothScrollTo } from '../utils/scroll.js'

function Typewriter({ words }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    const speed = deleting ? 45 : 85
    const timer = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) setText(current.slice(0, text.length + 1))
        else setTimeout(() => setDeleting(true), 1400)
      } else {
        if (text.length > 0) setText(current.slice(0, text.length - 1))
        else {
          setDeleting(false)
          setIndex((i) => i + 1)
        }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [text, deleting, index, words])

  return (
    <span className="typewriter">
      {text}
      <span className="caret" />
    </span>
  )
}

const floatCards = [
  { icon: <FiCpu />, ar: 'AI & LLM', en: 'AI & LLM', pos: 'c1' },
  { icon: <FiZap />, ar: 'أتمتة', en: 'Automation', pos: 'c2' },
  { icon: <FiBarChart2 />, ar: 'تحليل بيانات', en: 'Data', pos: 'c3' },
]

export default function Hero() {
  const { lang } = useLang()

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="pulse" />
            {lang === 'ar' ? 'متاح للفرص والعمل الحر' : 'Available for opportunities'}
          </motion.div>

          <motion.p
            className="hero-greet"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            {hero.greeting[lang]}
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {contact.name[lang]}
          </motion.h1>

          <motion.h2
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            <Typewriter words={hero.roles[lang]} />
          </motion.h2>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
          >
            {hero.tagline[lang]}
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
          >
            <button
              className="btn btn-primary"
              onClick={() => smoothScrollTo('projects')}
            >
              {hero.ctaProjects[lang]} <FiSend />
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => smoothScrollTo('contact')}
            >
              {hero.ctaContact[lang]}
            </button>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span><FiMapPin /> {contact.location[lang]}</span>
            <a href={`mailto:${contact.email}`}><FiMail /> {contact.email}</a>
            <a href={contact.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
          </motion.div>
        </div>

        <div className="hero-visual">
          <motion.div
            className="hero-orb"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            <span className="orb-ring r1" />
            <span className="orb-ring r2" />
            <span className="orb-ring r3" />
          </motion.div>

          <motion.div
            className="code-card"
            initial={{ opacity: 0, scale: 0.9, rotateX: 12 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="code-dots">
              <i /> <i /> <i />
            </div>
            <pre className="code-body">
              <code>
                <span className="c-key">const</span> <span className="c-var">dev</span> = {'{'}
                {'\n'}  name: <span className="c-str">'Mohamed Ibrahim'</span>,
                {'\n'}  role: <span className="c-str">'Software Developer & AI'</span>,
                {'\n'}  stack: [<span className="c-str">'Python'</span>, <span className="c-str">'React'</span>, <span className="c-str">'AI'</span>],
                {'\n'}  focus: <span className="c-str">'building smart systems'</span>,
                {'\n'}{'}'};
                {'\n'}
                <span className="c-fn">while</span>(alive) {'{'} <span className="c-var">learn</span>(); <span className="c-var">build</span>(); {'}'}
              </code>
            </pre>
          </motion.div>

          {floatCards.map((c, i) => (
            <motion.div
              key={c.pos}
              className={`float-chip ${c.pos}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -12, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.6 + i * 0.15 },
                y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
              }}
            >
              {c.icon}
              <span>{c[lang]}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        className="hero-scroll"
        onClick={() => smoothScrollTo('about')}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <FiArrowDown />
        <span>{hero.scroll[lang]}</span>
      </motion.button>
    </section>
  )
}
