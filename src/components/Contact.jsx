import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiPhone, FiMapPin, FiCopy, FiCheck, FiGithub, FiLinkedin, FiMessageCircle } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'
import { contactSection as t, contact } from '../data/content.js'
import { Reveal, SectionHeading } from './common.jsx'

const FORMSPREE_ENDPOINT = ''

export default function Contact() {
  const { lang } = useLang()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [copied, setCopied] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const copy = (text, key) => {
    navigator.clipboard?.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1800)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(form.subject || (lang === 'ar' ? 'رسالة من البورتفوليو' : 'Message from portfolio'))
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
      setStatus('success')
      return
    }
    try {
      setStatus('sending')
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('bad')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const infoRows = [
    { icon: <FiMail />, label: t.emailLabel[lang], value: contact.email, href: `mailto:${contact.email}`, key: 'email' },
    { icon: <FiPhone />, label: lang === 'ar' ? 'الهاتف' : 'Phone', value: contact.phoneLabel, href: `tel:${contact.phone}`, key: 'phone' },
    { icon: <FiMapPin />, label: lang === 'ar' ? 'الموقع' : 'Location', value: contact.location[lang], href: null, key: 'loc' },
  ]

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading kicker={t.kicker[lang]} title={t.title[lang]} subtitle={t.subtitle[lang]} />
        <div className="contact-grid">
          <Reveal>
            <div className="contact-info">
              {infoRows.map((row) => (
                <div className="info-row" key={row.key}>
                  <span className="info-icon">{row.icon}</span>
                  <div className="info-text">
                    <span className="info-label">{row.label}</span>
                    {row.href ? (
                      <a href={row.href}>{row.value}</a>
                    ) : (
                      <span>{row.value}</span>
                    )}
                  </div>
                  {row.key !== 'loc' && (
                    <button className="copy-btn" onClick={() => copy(row.value, row.key)} aria-label="copy">
                      {copied === row.key ? <FiCheck /> : <FiCopy />}
                    </button>
                  )}
                </div>
              ))}

              <div className="social-row">
                <a className="social-btn" href={`https://wa.me/${contact.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer">
                  <FiMessageCircle /> WhatsApp
                </a>
                <a className="social-btn" href={contact.github} target="_blank" rel="noreferrer">
                  <FiGithub /> GitHub
                </a>
                <a className="social-btn" href={contact.linkedin} target="_blank" rel="noreferrer">
                  <FiLinkedin /> LinkedIn
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <label>
                  <span>{t.nameLabel[lang]}</span>
                  <input required value={form.name} onChange={set('name')} placeholder={lang === 'ar' ? 'اسمك' : 'Your name'} />
                </label>
                <label>
                  <span>{t.emailLabel[lang]}</span>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" />
                </label>
              </div>
              <label>
                <span>{t.subjectLabel[lang]}</span>
                <input value={form.subject} onChange={set('subject')} placeholder={lang === 'ar' ? 'موضوع الرسالة' : 'Subject'} />
              </label>
              <label>
                <span>{t.messageLabel[lang]}</span>
                <textarea required rows={5} value={form.message} onChange={set('message')} placeholder={lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'} />
              </label>
              <motion.button
                className="btn btn-primary btn-block"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? t.sending[lang] : t.send[lang]} <FiSend />
              </motion.button>
              {status === 'success' && <p className="form-msg ok">{t.success[lang]}</p>}
              {status === 'error' && <p className="form-msg err">{t.error[lang]}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
