import { motion } from "framer-motion"

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(226,115,150,0.1),transparent_50%)]" />
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Floating Dots */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={Math.random()}
          className="absolute w-1 h-1 bg-brand-primary rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
