import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiLink,
} from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'
import { projects } from '../data/content.js'
import { SectionHeading } from './common.jsx'

function FilterRow({ label, items, value, onChange, layoutId }) {
  const { lang } = useLang()
  return (
    <div className="filter-row">
      <span className="filter-row-label">{label}</span>
      <div className="filter-bar">
        {items.map((f) => (
          <button
            key={f.id}
            className={`filter-btn ${value === f.id ? 'is-active' : ''}`}
            onClick={() => onChange(f.id)}
          >
            {value === f.id && (
              <motion.span
                layoutId={layoutId}
                className="filter-pill"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            )}
            <span className="filter-label">{f[lang]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ p, layout = false, onPreview }) {
  const { lang } = useLang()
  const MotionTag = layout ? motion.article : 'article'
  const motionProps = layout
    ? {
        layout: true,
        initial: { opacity: 0, scale: 0.94 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.94 },
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }
    : {}

  return (
    <MotionTag className={`project-card ${p.featured ? 'is-featured' : ''}`} {...motionProps}>
      <div className={`project-banner accent-${p.accent}`}>
        <span className="project-emoji">{p.emoji}</span>
        <div className="project-banner-glow" />
        <span className="project-org-badge">
          <i className="org-dot" />
          {p.org?.[lang]}
        </span>
        {p.featured && (
          <span className="project-featured-badge">
            <FiStar /> {projects.featuredLabel[lang]}
          </span>
        )}
        {p.images?.length > 0 && (
          <button
            className="project-preview"
            onClick={() => onPreview({ images: p.images, index: 0, title: p.title[lang] })}
          >
            <img src={p.images[0]} alt={p.title[lang]} loading="lazy" />
            <span className="preview-hint">
              {lang === 'ar' ? 'اضغط للمعاينة' : 'Click to preview'}
            </span>
          </button>
        )}
      </div>

      <div className="project-body">
        <span className="project-sub">{p.subtitle[lang]}</span>
        <h3 className="project-title">{p.title[lang]}</h3>
        <p className="project-desc">{p.desc[lang]}</p>
        <div className="chips small">
          {p.tech.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>

        <div className="project-actions">
          {p.links?.code && (
            <a className="btn btn-mini" href={p.links.code} target="_blank" rel="noreferrer">
              <FiGithub /> {projects.viewCode[lang]}
            </a>
          )}
          {p.links?.live && (
            <a className="btn btn-mini btn-mini-primary" href={p.links.live} target="_blank" rel="noreferrer">
              <FiExternalLink /> {projects.viewLive[lang]}
            </a>
          )}
          {p.linkList &&
            p.linkList[lang].map((l) => (
              <a
                key={l.href}
                className="btn btn-mini btn-mini-primary"
                href={l.href}
                target="_blank"
                rel="noreferrer"
              >
                {l.external ? <FiExternalLink /> : <FiLink />} {l.label}
              </a>
            ))}
        </div>
      </div>
    </MotionTag>
  )
}

export default function Projects() {
  const { lang } = useLang()
  const [cat, setCat] = useState('all')
  const [org, setOrg] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const featured = projects.items.find((p) => p.featured)
  const rest = projects.items.filter((p) => !p.featured)
  const list = rest.filter(
    (p) => (cat === 'all' || p.cat === cat) && (org === 'all' || p.orgKey === org)
  )

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading kicker={projects.kicker[lang]} title={projects.title[lang]} subtitle={projects.subtitle[lang]} />

        {featured && (
          <motion.div
            className="featured-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectCard p={featured} onPreview={setLightbox} />
          </motion.div>
        )}

        <div className="filters-stack">
          <FilterRow
            label={projects.filterByOrg[lang]}
            items={projects.orgFilters}
            value={org}
            onChange={setOrg}
            layoutId="projOrgPill"
          />
          <FilterRow
            label={projects.filterByCat[lang]}
            items={projects.catFilters}
            value={cat}
            onChange={setCat}
            layoutId="projCatPill"
          />
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <ProjectCard key={p.id} p={p} layout onPreview={setLightbox} />
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && <p className="no-results">{projects.noResults[lang]}</p>}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            {...lightbox}
            onClose={() => setLightbox(null)}
            onChange={(index) => setLightbox((s) => ({ ...s, index }))}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function Lightbox({ images, index, title, onClose, onChange }) {
  const { lang } = useLang()
  const prev = () => onChange((index - 1 + images.length) % images.length)
  const next = () => onChange((index + 1) % images.length)
  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox-inner"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lightbox-head">
          <span>{title}</span>
          <button className="icon-btn" onClick={onClose} aria-label="close">
            <FiX />
          </button>
        </div>
        <div className="lightbox-stage">
          <img src={images[index]} alt={title} />
          {images.length > 1 && (
            <>
              <button className="lb-nav lb-prev" onClick={prev} aria-label="prev">
                <FiChevronLeft />
              </button>
              <button className="lb-nav lb-next" onClick={next} aria-label="next">
                <FiChevronRight />
              </button>
              <div className="lb-dots">
                {images.map((_, i) => (
                  <span key={i} className={i === index ? 'is-active' : ''} />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="lightbox-count">
          {lang === 'ar' ? `صورة ${index + 1} من ${images.length}` : `Image ${index + 1} of ${images.length}`}
        </div>
      </motion.div>
    </motion.div>
  )
}
