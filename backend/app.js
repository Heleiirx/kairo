import express from "express";
import cors from "cors";
// import helmet from "helmet";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";

// Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(helmet());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);
app.use(notFoundMiddleware);

export default app;
