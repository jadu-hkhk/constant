import type { NextFunction, Request, Response } from "express"
import type { ZodSchema } from "zod"

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = schema.safeParse(req.body)

    if (!parsedBody.success) {
      res.status(400).json({
        message: "Validation error",
        errors: parsedBody.error.flatten().fieldErrors,
      })
      return
    }

    req.body = parsedBody.data
    next()
  }
}
