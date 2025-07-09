"use client"

import { AnimatedBackground } from "./animated-background"
import { CTAButtons } from "./cta-buttons"
import { HeroHeadline } from "./hero-headline"
import { HeroSubheading } from "./hero-subheading"
import { Stats } from "./stats"
import { StatusBadge } from "./status-badge"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <StatusBadge />
        <HeroHeadline />
        <HeroSubheading />
        <CTAButtons />
        {/* <Stats /> */}
      </div>
    </section>
  )
}
