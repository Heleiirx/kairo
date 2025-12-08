import express from "express";
import passport from "passport";
import {
  registerUser,
  login,
  googleCallback,
  changePassword
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account", //Testing
  })
);

router.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  googleCallback
);

router.put("/change-password", verifyToken, changePassword);

export default router;
