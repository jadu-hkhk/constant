import { signInSchema, signUpSchema } from "@repo/shared"
import { Router } from "express"
import { signIn, signOut, signUp } from "../controllers/auth"
import { validate } from "../middlewares/validate"

const authRouter: Router = Router()

authRouter.post("/signup", validate(signUpSchema), signUp)
authRouter.post("/signin", validate(signInSchema), signIn)
authRouter.post("/signout", signOut)

export default authRouter
