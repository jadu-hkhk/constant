import { motion } from "framer-motion"

export function HeroSubheading() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
    >
      Get instant alerts when your websites go down. We check every 30 seconds from multiple regions
      worldwide, so you know before your users do.
    </motion.p>
  )
}
