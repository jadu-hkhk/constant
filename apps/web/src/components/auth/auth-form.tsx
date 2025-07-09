"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { BACKEND_URL } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export function AuthForm({ type }: { type: "signin" | "signup" }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${BACKEND_URL}/auth/${type}`,
        {
          email,
          password,
        },
        { withCredentials: true },
      )

      toast.success(response.data.message)
      if (type === "signin") router.push("/app/dashboard")
      else router.push("/signin")
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message)
      } else {
        toast.error("Internal server error")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-300">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="bg-white/5 border-gray-600 text-white placeholder:text-gray-500 focus:border-brand-primary focus:ring-brand-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-300">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={type === "signin" ? "Enter your password" : "Create a password"}
            className="bg-white/5 border-gray-600 text-white placeholder:text-gray-500 focus:border-brand-primary focus:ring-brand-primary/20 pr-10"
          />
        </div>
      </div>

      <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white transition-colors duration-200 py-6">
        {type === "signin" ? "Sign In" : "Create Account"}
      </Button>
    </form>
  )
}
