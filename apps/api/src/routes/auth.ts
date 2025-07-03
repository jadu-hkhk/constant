import { signInSchema, signUpSchema } from "@repo/shared"
import { Router } from "express"
import { signIn, signOut, signUp } from "../controllers/auth"
import { validateBody } from "../middlewares/validate"

const authRouter: Router = Router()

authRouter.post("/signup", validateBody(signUpSchema), signUp)
authRouter.post("/signin", validateBody(signInSchema), signIn)
authRouter.post("/signout", signOut)

export default authRouter
