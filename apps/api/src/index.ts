import express, { type Application } from "express"
import v1Router from "./routes"

export const app: Application = express()

app.use(express.json())

app.use("/api/v1", v1Router)
