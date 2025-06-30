import { Router } from "express"
import websiteRouter from "./website"

const v1Router: Router = Router()

v1Router.use("/website", websiteRouter)

export default v1Router
