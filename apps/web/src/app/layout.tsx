import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./styles/globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Constant - Monitor your websites",
  description: "Monitor your websites with Constant",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white flex flex-col min-h-screen overflow-y-scroll`}
      >
        {children}
      </body>
    </html>
  )
}
