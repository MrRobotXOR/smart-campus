import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  registerForEvent
} from "../controllers/registration.controller.js";

const router = express.Router();

router.post(
  "/:id/register",
  authMiddleware,
  roleMiddleware("student"),
  registerForEvent
);

export default router;