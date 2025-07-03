import { createWebsiteSchema, getWebsiteStatusSchema } from "@repo/shared"
import { Router } from "express"
import { createWebsite, getWebsiteStatus } from "../controllers/website"
import { verifyToken } from "../middlewares/authenticate"
import { validateBody, validateParams } from "../middlewares/validate"

const websiteRouter: Router = Router()

websiteRouter.post("/", verifyToken, validateBody(createWebsiteSchema), createWebsite)

websiteRouter.get(
  "/status/:websiteId",
  verifyToken,
  validateParams(getWebsiteStatusSchema),
  getWebsiteStatus,
)

export default websiteRouter
