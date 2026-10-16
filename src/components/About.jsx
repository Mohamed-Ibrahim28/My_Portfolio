import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'
import { about, contact } from '../data/content.js'
import { Reveal, SectionHeading } from './common.jsx'

export default function About() {
  const { lang } = useLang()
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading kicker={about.kicker[lang]} title={about.title[lang]} />
        <div className="about-grid">
          <div className="about-text">
            {about.paragraphs[lang].map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="about-p">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <a className="link-arrow" href={contact.github} target="_blank" rel="noreferrer">
                {lang === 'ar' ? 'تابع مشاريعي على GitHub' : 'Explore my projects on GitHub'} <FiArrowUpRight />
              </a>
            </Reveal>
          </div>

          <div className="about-side">
            {about.highlights[lang].map((h, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <motion.div className="about-card" whileHover={{ x: lang === 'ar' ? -6 : 6 }}>
                  <span className="about-card-k">{h.k}</span>
                  <span className="about-card-v">{h.v}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
