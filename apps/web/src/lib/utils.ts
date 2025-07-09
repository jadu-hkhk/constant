import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const ENV_BACKEND_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL ?? "http://localhost:5000"
export const BACKEND_URL = `${ENV_BACKEND_URL}/api/v1`
