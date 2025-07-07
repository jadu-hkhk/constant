"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [dots, setDots] = useState<
    Array<{
      id: number
      left: number
      top: number
      duration: number
      delay: number
    }>
  >([])

  useEffect(() => {
    // only generate dots on client side to avoid hydration errors
    const generatedDots = [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    setDots(generatedDots)
  }, [])

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(226,115,150,0.1),transparent_50%)]" />
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      {dots.map(dot => (
        <motion.div
          key={dot.id}
          className="absolute w-1 h-1 bg-brand-primary rounded-full"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  )
}
