import { signInSchema, signUpSchema } from "@repo/shared"
import { Router } from "express"
import { checkAuth, signIn, signOut, signUp } from "../controllers/auth"
import { verifyToken } from "../middlewares/authenticate"
import { validateBody } from "../middlewares/validate"

const authRouter: Router = Router()

authRouter.post("/signup", validateBody(signUpSchema), signUp)
authRouter.post("/signin", validateBody(signInSchema), signIn)
authRouter.post("/signout", signOut)
authRouter.get("/check", verifyToken, checkAuth)

export default authRouter
