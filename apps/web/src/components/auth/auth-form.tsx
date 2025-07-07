import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export function AuthForm({ type }: { type: "signin" | "signup" }) {
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-300">
          Email
        </Label>
        <Input
          id="email"
          type="email"
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
