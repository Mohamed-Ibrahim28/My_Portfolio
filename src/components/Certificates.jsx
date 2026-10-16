import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX, FiAward, FiFileText, FiExternalLink, FiCheckCircle } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'
import { certificates } from '../data/content.js'
import { Reveal, SectionHeading } from './common.jsx'

function CertVisual({ c, lang, big = false }) {
  if (c.type === 'image') {
    return <img src={c.file} alt={c[lang]} loading="lazy" />
  }
  return (
    <div className={`cert-placeholder cat-${c.cat} ${big ? 'is-big' : ''}`}>
      <span className="cp-glow" />
      <span className="cp-ribbon">
        {c.type === 'pdf' ? <FiFileText /> : <FiAward />}
      </span>
      <span className="cp-org">{c.org}</span>
      <span className="cp-title">{c[lang]}</span>
      <span className="cp-tag">
        {c.type === 'pdf' ? 'PDF' : lang === 'ar' ? 'شهادة' : 'Certificate'}
      </span>
    </div>
  )
}

export default function Certificates() {
  const { lang } = useLang()
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  const counts = useMemo(() => {
    const c = { all: certificates.items.length }
    certificates.items.forEach((it) => {
      c[it.cat] = (c[it.cat] || 0) + 1
    })
    return c
  }, [])

  const list = filter === 'all' ? certificates.items : certificates.items.filter((c) => c.cat === filter)

  return (
    <section id="certificates" className="section">
      <div className="container">
        <SectionHeading kicker={certificates.kicker[lang]} title={certificates.title[lang]} subtitle={certificates.subtitle[lang]} />

        <div className="filter-bar">
          {certificates.filters.map((f) => (
            <button
              key={f.id}
              className={`filter-btn ${filter === f.id ? 'is-active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              <span className="filter-label">
                {f[lang]}
                <em className="filter-count">{counts[f.id] || 0}</em>
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="certs-grid">
          <AnimatePresence mode="popLayout">
            {list.map((c, i) => (
              <motion.button
                key={c.id || c.file}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                className="cert-card"
                onClick={() => setActive(c)}
              >
                <div className={`cert-thumb cat-${c.cat}`}>
                  <CertVisual c={c} lang={lang} />
                  <span className="cert-badge">{c.org}</span>
                </div>
                <div className="cert-info">
                  <h3>{c[lang]}</h3>
                  <div className="cert-meta">
                    <span>{c.org}</span>
                    {c.year && <span className="cert-year">{c.year}</span>}
                  </div>
                </div>
                <span className="cert-open"><FiAward /></span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <CertModal cert={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}

function CertModal({ cert, onClose }) {
  const { lang } = useLang()
  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox-inner cert-modal"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lightbox-head">
          <span>{cert[lang]}</span>
          <button className="icon-btn" onClick={onClose} aria-label="close">
            <FiX />
          </button>
        </div>
        <div className="lightbox-stage cert-stage">
          {cert.type === 'pdf' ? (
            <iframe src={cert.file} title={cert[lang]} className="cert-frame" />
          ) : cert.type === 'image' ? (
            <img src={cert.file} alt={cert[lang]} />
          ) : (
            <div className="cert-modal-visual">
              <CertVisual c={cert} lang={lang} big />
            </div>
          )}
        </div>
        <div className="cert-modal-foot">
          <div>
            <FiCheckCircle className="cmf-icon" /> <strong>{cert.org}</strong>
            {cert.year && <span> · {cert.year}</span>}
          </div>
          {cert.file && (
            <a className="btn btn-mini" href={cert.file} target="_blank" rel="noreferrer">
              <FiExternalLink /> {lang === 'ar' ? 'فتح في نافذة جديدة' : 'Open in new tab'}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
