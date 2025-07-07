import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import express, { type Application } from "express"
import v1Router from "./routes"

export const app: Application = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
)

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", v1Router)
