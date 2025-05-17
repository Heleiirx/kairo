import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";

// Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRouter);

export default app;
