import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  getEvents,
  getEventById,
  createEvent,
  getMyEvents,
  getPendingEvents,
  approveEvent,
  rejectEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

// Public - Approved Events
router.get("/", getEvents);

// Club Head/Admin - My Events
router.get(
  "/my-events",
  authMiddleware,
  roleMiddleware("club_head", "admin"),
  getMyEvents
);

// HOD - Pending Events
router.get(
  "/pending",
  authMiddleware,
  roleMiddleware("hod"),
  getPendingEvents
);

// HOD - Approve Event
router.patch(
  "/:id/approve",
  authMiddleware,
  roleMiddleware("hod"),
  approveEvent
);

// HOD - Reject Event
router.patch(
  "/:id/reject",
  authMiddleware,
  roleMiddleware("hod"),
  rejectEvent
);

// Public - Event Detail
router.get("/:id", getEventById);

// Club Head/Admin - Create Event
router.post(
  "/",
  authMiddleware,
  roleMiddleware("club_head", "admin"),
  upload.single("image"),
  createEvent
);

export default router;