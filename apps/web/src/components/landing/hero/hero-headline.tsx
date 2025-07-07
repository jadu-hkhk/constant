import { motion } from "framer-motion"

export function HeroHeadline() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
    >
      Monitor Your Sites,
      <br />
      <span className="text-brand-primary">Never Miss Downtime</span>
    </motion.h1>
  )
}
