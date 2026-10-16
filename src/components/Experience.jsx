import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'
import { experience } from '../data/content.js'
import { Reveal, SectionHeading } from './common.jsx'

export default function Experience() {
  const { lang } = useLang()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading kicker={experience.kicker[lang]} title={experience.title[lang]} subtitle={experience.subtitle[lang]} />
        <div className="timeline" ref={ref}>
          <div className="tl-rail">
            <motion.div className="tl-rail-fill" style={{ scaleY }} />
          </div>
          {experience.items.map((it, i) => (
            <div key={i} className="tl-item">
              <motion.span
                className="tl-node"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              >
                <FiBriefcase />
              </motion.span>
              <Reveal delay={0.05}>
                <div className="tl-card">
                  <div className="tl-head">
                    <span className="tl-period">{it.period[lang]}</span>
                    <span className="tl-type">{it.type[lang]}</span>
                  </div>
                  <h3 className="tl-role">{it.role[lang]}</h3>
                  <p className="tl-org">{typeof it.org === 'string' ? it.org : it.org[lang]}</p>
                  <p className="tl-desc">{it.desc[lang]}</p>
                  <div className="chips small">
                    {it.tags.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
