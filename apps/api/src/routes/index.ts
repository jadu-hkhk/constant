import { Router } from "express"
import authRouter from "./auth"
import websiteRouter from "./website"

const v1Router: Router = Router()

v1Router.use("/auth", authRouter)
v1Router.use("/website", websiteRouter)

export default v1Router
