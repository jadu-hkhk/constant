import axios from "axios"
import { create } from "zustand"
import { BACKEND_URL } from "@/lib/utils"

type User = {
  id: string
  email: string
}

type AuthStore = {
  user: User | null
  isAuthenticated: boolean | null
  checkAuth: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isAuthenticated: null,

  checkAuth: async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/auth/check`, {
        withCredentials: true,
      })
      set({ user: data.user, isAuthenticated: !!data.user })
    } catch {
      set({ user: null, isAuthenticated: false })
    }
  },

  signOut: async () => {
    await axios.post(
      `${BACKEND_URL}/auth/signout`,
      {},
      {
        withCredentials: true,
      },
    )
    set({ user: null, isAuthenticated: false })
  },
}))
