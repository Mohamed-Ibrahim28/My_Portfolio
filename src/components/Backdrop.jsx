import { motion, useScroll, useSpring } from 'framer-motion'

export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="bd-grid" />
      <div className="bd-blob bd-blob-1" />
      <div className="bd-blob bd-blob-2" />
      <div className="bd-blob bd-blob-3" />
      <div className="bd-noise" />
    </div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}
