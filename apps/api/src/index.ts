import "dotenv/config"
import cookieParser from "cookie-parser"
import express, { type Application } from "express"
import v1Router from "./routes"

export const app: Application = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", v1Router)
