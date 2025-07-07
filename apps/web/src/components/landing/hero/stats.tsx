import { motion } from "framer-motion"

export function Stats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
    >
      {[
        { number: "99.9%", label: "Uptime SLA" },
        { number: "30s", label: "Check Interval" },
        { number: "10+", label: "Global Regions" },
      ].map(stat => (
        <div key={stat.number} className="text-center">
          <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
          <div className="text-gray-400">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  )
}
