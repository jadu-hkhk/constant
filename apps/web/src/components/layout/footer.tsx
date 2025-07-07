"use client"

import { motion } from "framer-motion"
import { Activity } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-4 px-4 sm:px-6 lg:px-8 border-t border-rose/20 mt-auto">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 gradient-rose rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Constant</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400">© 2025 Constant. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
