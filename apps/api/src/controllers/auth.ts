import { type Prisma, prisma } from "@repo/db"
import bcrypt from "bcrypt"
import type { Request, Response } from "express"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie"

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    res.status(201).json({
      message: "Sign up successful",
      id: user.id,
    })
  } catch (e) {
    if ((e as Prisma.PrismaClientKnownRequestError).code === "P2002") {
      res.status(409).json({
        message: "User already exists",
      })
    } else {
      res.status(500).json({
        message: "Internal server error",
      })
    }
  }
}

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({
        message: "Invalid credentials",
      })
      return
    }

    generateTokenAndSetCookie(res, user.id)

    res.status(200).json({
      message: "Sign in successful",
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: "Internal server error",
    })
  }
}

export const signOut = async (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    domain: process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : undefined,
  })
  res.status(200).json({
    message: "Sign out successful",
  })
}

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      select: {
        id: true,
        email: true,
      },
    })

    if (!user) {
      res.status(401).json({
        message: "User not found",
      })
      return
    }

    res.status(200).json({
      message: "User is authenticated",
      user,
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      message: "Internal server error",
    })
  }
}
