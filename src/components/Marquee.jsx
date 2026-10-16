const items = [
  'Python', 'React', 'JavaScript', 'Flask', 'SQLite', 'SQL', 'Machine Learning',
  'Prompt Engineering', 'LLM Evaluation', 'RAG', 'Pandas', 'NumPy', 'n8n',
  'HTML5', 'CSS3', 'Git', 'GitHub', 'xlsxwriter', 'PyQt', 'Wolfram',
  'Data Analysis', 'QA Testing', 'Automation', 'Dashboards',
]

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="marquee-item">
            {it}
            <i className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
