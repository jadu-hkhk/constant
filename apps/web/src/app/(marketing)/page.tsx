import { Hero } from "@/components/landing/hero/hero"
import { HowItWorks } from "@/components/landing/how-it-works/how-it-works"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <HowItWorks />
    </main>
  )
}
