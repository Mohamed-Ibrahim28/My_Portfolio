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
        <span className="fb-left">© {year} {contact.name[lang]} — {footer.rights[lang]}</span>
        <button className="to-top" onClick={scrollToTop}>
          <FiArrowUp /> {footer.backTop[lang]}
        </button>
        <span className="fb-right">{footer.built[lang]}</span>
      </div>
    </footer>
  )
}
