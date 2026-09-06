import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

// ================= Helper =================
const attachParticipantCount = async (events) => {
  return Promise.all(
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
};

// Case-insensitive department helper
const departmentRegex = (branch) =>
  new RegExp(`^${branch}$`, "i");

// ================= STUDENT - Approved Events =================
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: "approved",
    })
      .sort({ date: 1 })
      .lean();

    res.json({
      success: true,
      events: await attachParticipantCount(events),
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
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const participants =
      await Registration.countDocuments({
        event: event._id,
      });

    res.json({
      success: true,
      event: {
        ...event.toObject(),
        participants,
      },
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
      department: req.user.branch,
      date: req.body.date,
      venue: req.body.venue,
      image: req.file
        ? `/uploads/${req.file.filename}`
        : "",
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
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      events: await attachParticipantCount(events),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch your events",
    });
  }
};

// ================= HOD - Pending =================
export const getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      department: departmentRegex(req.user.branch),
      status: "pending",
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      events: await attachParticipantCount(events),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load pending events",
    });
  }
};

// ================= HOD - Approved =================
export const getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({
      department: departmentRegex(req.user.branch),
      status: "approved",
    })
      .populate("createdBy", "name email")
      .sort({ updatedAt: -1 })
      .lean();

    res.json({
      success: true,
      events: await attachParticipantCount(events),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load approved events",
    });
  }
};

// ================= HOD - Rejected =================
export const getRejectedEvents = async (req, res) => {
  try {
    const events = await Event.find({
      department: departmentRegex(req.user.branch),
      status: "rejected",
    })
      .populate("createdBy", "name email")
      .sort({ updatedAt: -1 })
      .lean();

    res.json({
      success: true,
      events: await attachParticipantCount(events),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load rejected events",
    });
  }
};

// ================= HOD - Recent Activity =================
export const getRecentActivity = async (req, res) => {
  try {
    const events = await Event.find({
      department: departmentRegex(req.user.branch),
    })
      .populate("createdBy", "name")
      .sort({ updatedAt: -1 })
      .limit(8)
      .lean();

    res.json({
      success: true,
      activities: events,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load activity",
    });
  }
};

// ================= HOD - Universal Status Update =================
export const updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (
      event.department.toLowerCase() !==
      req.user.branch.toLowerCase()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    event.status = status;

    // Future Audit Fields (Add in Event model later)
    // if (status === "approved") {
    //   event.approvedBy = req.user._id;
    //   event.approvedAt = new Date();
    // }
    // if (status === "rejected") {
    //   event.rejectedBy = req.user._id;
    //   event.rejectedAt = new Date();
    // }

    await event.save();

    res.json({
      success: true,
      message: `Event ${status}`,
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Status update failed",
    });
  }
};

// ================= Backward Compatible Wrappers =================

// Old route: PATCH /events/:id/approve
export const approveEvent = async (req, res) => {
  req.body = {
    ...(req.body || {}),
    status: "approved",
  };

  return updateEventStatus(req, res);
};

// Old route: PATCH /events/:id/reject
export const rejectEvent = async (req, res) => {
  req.body = {
    ...(req.body || {}),
    status: "rejected",
  };

  return updateEventStatus(req, res);
};

// ================= Club Head - Update Event =================
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (
      String(event.createdBy) !==
      String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const oldDate = event.date
      ? new Date(event.date)
          .toISOString()
          .split("T")[0]
      : "";

    const newDate = req.body.date || oldDate;

    const majorChanged =
      (req.body.title &&
        req.body.title !== event.title) ||
      newDate !== oldDate ||
      (req.body.venue &&
        req.body.venue !== event.venue);

    event.title = req.body.title || event.title;
    event.description =
      req.body.description || event.description;
    event.club = req.body.club || event.club;
    event.date = req.body.date || event.date;
    event.venue = req.body.venue || event.venue;

    if (req.file) {
      event.image = `/uploads/${req.file.filename}`;
    }

    // Approved event edited → mark for review
    if (
      majorChanged &&
      event.status === "approved"
    ) {
      event.needsReview = true;
    }

    await event.save();

    res.json({
      success: true,
      message:
        majorChanged &&
        event.status === "approved"
          ? "Event updated and marked for review."
          : "Event updated successfully.",
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

// ================= Club Head - Delete Event =================
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (
      String(event.createdBy) !==
      String(req.user._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

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