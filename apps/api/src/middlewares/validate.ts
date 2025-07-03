import type { NextFunction, Request, Response } from "express"
import type { ZodSchema } from "zod"

const createValidator = (target: "body" | "params" | "query") => {
  return (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const parsedData = schema.safeParse(req[target])

      if (!parsedData.success) {
        res.status(400).json({
          message: "Validation error",
          errors: parsedData.error.flatten().fieldErrors,
        })
        return
      }

      req[target] = parsedData.data
      next()
    }
  }
}

export const validateBody = createValidator("body")
export const validateParams = createValidator("params")
export const validateQuery = createValidator("query")
