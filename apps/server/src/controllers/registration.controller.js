import crypto from "crypto";
import Registration from "../models/Registration.js";
import Event from "../models/Event.js";

// Student - Register for Event
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Event is not approved yet",
      });
    }

    const existing = await Registration.findOne({
      event: event._id,
      student: req.user._id,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Already registered",
      });
    }

    const qrToken = crypto.randomBytes(20).toString("hex");

    const registration = await Registration.create({
      event: event._id,
      student: req.user._id,
      qrToken,
    });

    res.status(201).json({
      success: true,
      registration,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

// Club Head - Event Participants
export const getEventParticipants = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Sirf event creator hi participants dekh sakta hai
    if (String(event.createdBy) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const registrations = await Registration.find({
      event: event._id,
    })
      .populate("student", "name email rollNo branch year")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      event: {
        id: event._id,
        title: event.title,
      },
      participants: registrations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load participants",
    });
  }
};