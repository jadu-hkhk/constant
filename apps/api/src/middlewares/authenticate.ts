import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token

  if (!token) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }
    req.userId = decoded.userId
  } catch (_e) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  next()
}
