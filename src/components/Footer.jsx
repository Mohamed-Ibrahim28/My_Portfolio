import { FiArrowUp } from 'react-icons/fi'
import { useLang } from '../context/LanguageContext.jsx'
import { contact, footer } from '../data/content.js'
import { scrollToTop } from '../utils/scroll.js'

export default function Footer() {
  const { lang } = useLang()
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-bottom container">
        <span>© {year} {contact.name[lang]} — {footer.rights[lang]}</span>
        <span>{footer.built[lang]}</span>
        <button className="to-top" onClick={scrollToTop}>
          <FiArrowUp /> {footer.backTop[lang]}
        </button>
      </div>
    </footer>
  )
}
