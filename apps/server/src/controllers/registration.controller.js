import crypto from "crypto";

import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
export const registerForEvent = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    const existing = await Registration.findOne({
      event: event._id,
      student: req.user._id
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Already registered"
      });
    }

    const qrToken = crypto.randomBytes(20).toString("hex");

    const registration = await Registration.create({
      event: event._id,
      student: req.user._id,
      qrToken
    });

    res.status(201).json({
      success: true,
      registration
    });

  } catch {

    res.status(500).json({
      success: false
    });

  }
};