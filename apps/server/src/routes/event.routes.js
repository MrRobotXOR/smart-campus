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
  getApprovedEvents,
  getRejectedEvents,
  getRecentActivity,
  approveEvent,
  rejectEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

/* ================= PUBLIC ================= */

// Student Approved Events
router.get("/", getEvents);

/* ================= CLUB HEAD ================= */

// My Events
router.get(
  "/my-events",
  authMiddleware,
  roleMiddleware("club_head", "admin"),
  getMyEvents
);

// Create Event
router.post(
  "/",
  authMiddleware,
  roleMiddleware("club_head", "admin"),
  upload.single("image"),
  createEvent
);

// Edit Event
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("club_head", "admin"),
  upload.single("image"),
  updateEvent
);

// Delete Event
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("club_head", "admin"),
  deleteEvent
);

/* ================= HOD ================= */

// Pending
router.get(
  "/pending",
  authMiddleware,
  roleMiddleware("hod"),
  getPendingEvents
);

// Approved
router.get(
  "/approved",
  authMiddleware,
  roleMiddleware("hod"),
  getApprovedEvents
);

// Rejected
router.get(
  "/rejected",
  authMiddleware,
  roleMiddleware("hod"),
  getRejectedEvents
);

// Activity
router.get(
  "/activity",
  authMiddleware,
  roleMiddleware("hod"),
  getRecentActivity
);

// Approve
router.patch(
  "/:id/approve",
  authMiddleware,
  roleMiddleware("hod"),
  approveEvent
);

// Reject
router.patch(
  "/:id/reject",
  authMiddleware,
  roleMiddleware("hod"),
  rejectEvent
);

/* ================= DYNAMIC (LAST) ================= */

// Event Detail
router.get("/:id", getEventById);

export default router;