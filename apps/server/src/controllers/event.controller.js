import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

// Students - Approved Events + Participants Count
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: "approved",
    })
      .sort({ date: 1 })
      .lean();

    const withCounts = await Promise.all(
      events.map(async (event) => {
        const count = await Registration.countDocuments({
          event: event._id,
        });

        return {
          ...event,
          participants: count,
        };
      })
    );

    res.json({
      success: true,
      events: withCounts,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

// Single Event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Club Head - Create Event
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      club: req.body.club,
      department: req.body.department,
      date: req.body.date,
      venue: req.body.venue,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

// Club Head - My Events
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({
      createdBy: req.user._id,
    }).sort({ date: 1 });

    res.json({
      success: true,
      events,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch your events",
    });
  }
};

// HOD - Pending Events
export const getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: "pending",
      department: req.user.branch,
    }).populate("createdBy", "name email");

    res.json({
      success: true,
      events,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// HOD - Approve Event
export const approveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};

// HOD - Reject Event
export const rejectEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    res.json({
      success: true,
      event,
    });
  } catch {
    res.status(500).json({
      success: false,
    });
  }
};