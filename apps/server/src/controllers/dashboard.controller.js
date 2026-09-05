import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

// ================= Student Dashboard =================
export const getStudentDashboard = async (req, res) => {
  try {
    const upcomingEvents = await Event.countDocuments({
      status: "approved",
      date: { $gte: new Date() },
    });

    const registeredEvents = await Registration.countDocuments({
      student: req.user._id,
    });

    const notifications = 0;

    res.json({
      success: true,
      stats: {
        upcomingEvents,
        registeredEvents,
        notifications,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

// ================= HOD Dashboard Stats =================
export const getHodDashboard = async (req, res) => {
  try {
    const department = new RegExp(`^${req.user.branch}$`, "i");

    const [pending, approved, rejected] = await Promise.all([
      Event.countDocuments({
        department,
        status: "pending",
      }),
      Event.countDocuments({
        department,
        status: "approved",
      }),
      Event.countDocuments({
        department,
        status: "rejected",
      }),
    ]);

    res.json({
      success: true,
      stats: {
        pending,
        approved,
        rejected,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load HOD dashboard",
    });
  }
};