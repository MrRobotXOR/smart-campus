import express from "express";
import { register, login, getCurrentUser } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register")
  .get((req, res) => {
    res.json({ message: "Register route is working" });
  })
  .post(register);

router.post("/login", login);
router.get("/me", authMiddleware, getCurrentUser);

export default router;