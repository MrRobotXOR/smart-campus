import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import { getStudentDashboard, getHodDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("student"),
  getStudentDashboard
);
router.get(
  "/hod",
  authMiddleware,
  roleMiddleware("hod"),
  getHodDashboard
);

export default router;