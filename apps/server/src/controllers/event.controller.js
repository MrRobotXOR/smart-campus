import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

// ================= STUDENT - Approved Events =================
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "approved" })
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

// ================= Single Event =================
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ================= Club Head - Create Event =================
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      club: req.body.club,
      department: req.user.branch.toUpperCase(),
      date: req.body.date,
      venue: req.body.venue,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      status: "pending",
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Event sent for HOD approval.",
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Club Head - My Events =================
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({
      createdBy: req.user._id,
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch your events",
    });
  }
};

// ================= HOD - Pending Events =================
export const getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: "pending",
      department: req.user.branch.toUpperCase(),
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load pending events",
    });
  }
};

// ================= HOD - Approve Event =================
export const approveEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event approved",
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to approve event",
    });
  }
};

// ================= HOD - Reject Event =================
export const rejectEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event rejected",
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to reject event",
    });
  }
};

// ================= Club Head/Admin - Update Event =================
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Sirf creator edit kar sakta hai
    if (String(event.createdBy) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.club = req.body.club || event.club;
    event.date = req.body.date || event.date;
    event.venue = req.body.venue || event.venue;

    if (req.file) {
      event.image = `/uploads/${req.file.filename}`;
    }

    // Edit ke baad dubara HOD approval
// Status preserve karo
// Approved -> Approved rahega
// Pending -> Pending rahega
// Rejected -> Rejected rahega

const previousStatus = event.status;

event.title = req.body.title || event.title;
event.description = req.body.description || event.description;
event.club = req.body.club || event.club;
event.date = req.body.date || event.date;
event.venue = req.body.venue || event.venue;

if (req.file) {
  event.image = `/uploads/${req.file.filename}`;
}

event.status = previousStatus;

await event.save();

    await event.save();

    res.json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
};

// ================= Club Head/Admin - Delete Event =================
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Sirf creator delete kar sakta hai
    if (String(event.createdBy) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Event ki saari registrations delete
    await Registration.deleteMany({
      event: event._id,
    });

    await event.deleteOne();

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete event",
    });
  }
};