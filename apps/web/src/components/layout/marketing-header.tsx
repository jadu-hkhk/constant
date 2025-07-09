"use client"

import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/authStore"

interface MobileMenuButtonProps {
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
}

interface MobileMenuProps {
  navItems: { label: string; path: string }[]
  setIsMenuOpen: (isOpen: boolean) => void
}

interface DesktopMenuProps {
  navItems: { label: string; path: string }[]
}

export function MarketingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems: { label: string; path: string }[] = [
    // { name: "Home", href: "/" },
    // { name: "Dashboard", href: "/dashboard" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-brand-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <DesktopMenu navItems={navItems} />

          <MobileMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>

        {isMenuOpen && <MobileMenu navItems={navItems} setIsMenuOpen={setIsMenuOpen} />}
      </div>
    </header>
  )
}

function DesktopAuthButtons() {
  const { isAuthenticated, signOut, checkAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      {isAuthenticated === null ? (
        <>
          <Skeleton className="w-[5.5rem] h-9 mr-6 border-1 border-white/20 rounded-md animate-pulse" />
          <Skeleton className="w-[5.5rem] h-9 border-1 border-white/40 rounded-md animate-pulse" />
        </>
      ) : isAuthenticated ? (
        <>
          <div className="relative">
            <Button
              asChild
              className={cn("hover:text-white text-white/80", {
                "text-white": pathname.includes("/app/dashboard"),
              })}
            >
              <Link href="/app/dashboard">Dashboard</Link>
            </Button>
            {pathname === "/app/dashboard" && (
              <motion.div
                layoutId="header-active-link"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={cn(
                  "bg-white/20 h-1 w-full absolute bottom-0 transition-all duration-200 rounded-full",
                  pathname.includes("/app/dashboard") &&
                    "bg-gradient-to-b from-brand-primary/5 to-pink-300/30",
                )}
              ></motion.div>
            )}
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="cursor-pointer hover:text-white text-white/80"
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button
            asChild
            className="text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
          >
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button
            asChild
            className="bg-brand-primary hover:bg-brand-primary/90 text-white transition-colors duration-200"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  )
}

function DesktopMenu({ navItems }: DesktopMenuProps) {
  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map(item => (
          <Link
            key={item.label}
            href={item.path}
            className="text-gray-300 hover:text-brand-primary transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <DesktopAuthButtons />
    </>
  )
}

function MobileMenuButton({ isMenuOpen, setIsMenuOpen }: MobileMenuButtonProps) {
  return (
    <button
      className="md:hidden p-2 text-gray-300 hover:text-white"
      type="button"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  )
}

function MobileMenu({ navItems, setIsMenuOpen }: MobileMenuProps) {
  const { isAuthenticated, checkAuth, signOut } = useAuthStore()
  const router = useRouter()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="md:hidden py-4 border-t border-brand-primary/20"
    >
      <nav className="flex flex-col space-y-4">
        {navItems.map(item => (
          <Link
            key={item.label}
            href={item.path}
            className="text-gray-300 hover:text-brand-primary transition-colors duration-200 px-2 py-1"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        {isAuthenticated === null ? (
          <Skeleton className="w-full h-10" />
        ) : isAuthenticated ? (
          <div className="flex flex-col space-y-2 pt-4 border-t border-brand-primary/20">
            <Link href="/app/dashboard" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full text-gray-300 hover:text-white hover:bg-white/10"
              >
                Dashboard
              </Button>
            </Link>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="cursor-pointer hover:text-white text-white/80"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-2 pt-4 border-t border-brand-primary/20">
            <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white transition-colors duration-200"
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full text-gray-300 hover:text-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </motion.div>
  )
}
