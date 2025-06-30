import { Router } from "express"
import { createWebsite, getWebsiteStatus } from "../controllers/website"

const websiteRouter: Router = Router()

websiteRouter.post("/", createWebsite)

websiteRouter.get("/status/:websiteId", getWebsiteStatus)

export default websiteRouter
