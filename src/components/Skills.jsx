import { motion } from 'framer-motion'
import { FiCpu, FiCode, FiBarChart2, FiZap } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'
import { skills } from '../data/content.js'
import { Reveal, SectionHeading } from './common.jsx'

const icons = { ai: <FiCpu />, code: <FiCode />, data: <FiBarChart2 />, auto: <FiZap /> }

export default function Skills() {
  const { lang } = useLang()
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeading kicker={skills.kicker[lang]} title={skills.title[lang]} subtitle={skills.subtitle[lang]} />
        <div className="skills-grid">
          {skills.groups.map((g, gi) => (
            <Reveal key={gi} delay={gi * 0.08}>
              <motion.div className="skill-card" whileHover={{ y: -8 }}>
                <div className="skill-card-top">
                  <span className={`skill-icon sc-${gi}`}>{icons[g.icon]}</span>
                  <h3>{g[lang]}</h3>
                </div>
                <div className="chips">
                  {g.items.map((it, i) => (
                    <motion.span
                      key={it}
                      className="chip"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.05 + i * 0.04, duration: 0.35 }}
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
