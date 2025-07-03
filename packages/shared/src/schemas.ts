import { z } from "zod"

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

export const createWebsiteSchema = z.object({
  url: z.string().url("Invalid URL"),
})

export const getWebsiteStatusSchema = z.object({
  websiteId: z.string().cuid("Invalid website ID"),
})
