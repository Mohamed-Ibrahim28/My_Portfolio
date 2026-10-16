import { useLang } from '../context/LanguageContext.jsx'
import { stats } from '../data/content.js'
import { Reveal, Counter } from './common.jsx'

export default function Stats() {
  const { lang } = useLang()
  return (
    <section className="stats-band">
      <div className="container stats-grid">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="stat">
              <div className="stat-value">
                {s.text ? (
                  <span className="stat-text">{s.text[lang]}</span>
                ) : (
                  <Counter value={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
                )}
              </div>
              <div className="stat-label">{s[lang]}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
