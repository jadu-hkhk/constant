import type { Response } from "express"
import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  })

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    domain: process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : undefined,
    maxAge: 1000 * 60 * 60 * 24,
  })
}
