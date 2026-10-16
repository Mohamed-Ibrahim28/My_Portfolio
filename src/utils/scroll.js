const HEADER_OFFSET = 82

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function smoothScrollTo(id, duration = 950) {
  const el = document.getElementById(id)
  if (!el) return

  const startY = window.scrollY
  const targetY = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  const distance = targetY - startY
  let startTime

  cancelAnimationFrame(smoothScrollTo._raf)

  const step = (now) => {
    if (startTime === undefined) startTime = now
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo({ top: startY + distance * easeInOutCubic(progress), behavior: 'auto' })
    if (progress < 1) {
      smoothScrollTo._raf = requestAnimationFrame(step)
    }
  }
  smoothScrollTo._raf = requestAnimationFrame(step)

  el.classList.remove('section-pulse')
  void el.offsetWidth
  el.classList.add('section-pulse')
  window.setTimeout(() => el.classList.remove('section-pulse'), 1150)
}

export function scrollToTop() {
  const startY = window.scrollY
  let startTime
  const duration = 900
  const step = (now) => {
    if (startTime === undefined) startTime = now
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo({ top: startY * (1 - easeInOutCubic(progress)), behavior: 'auto' })
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
