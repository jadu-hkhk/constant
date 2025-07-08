import { createWebsiteSchema, getWebsiteDetailsSchema, getWebsiteTicksSchema } from "@repo/shared"
import { Router } from "express"
import {
  createWebsite,
  getAllWebsites,
  getWebsiteDetails,
  getWebsiteTicks,
} from "../controllers/website"
import { verifyToken } from "../middlewares/authenticate"
import { validateBody, validateParams } from "../middlewares/validate"

const websiteRouter: Router = Router()

websiteRouter.post("/", verifyToken, validateBody(createWebsiteSchema), createWebsite)

websiteRouter.get(
  "/details/:websiteId",
  verifyToken,
  validateParams(getWebsiteDetailsSchema),
  getWebsiteDetails,
)

websiteRouter.get(
  "/ticks/:websiteId",
  verifyToken,
  validateParams(getWebsiteTicksSchema),
  getWebsiteTicks,
)

websiteRouter.get("/all", verifyToken, getAllWebsites)

export default websiteRouter
