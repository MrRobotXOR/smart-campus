import { Routes, Route, Navigate } from "react-router-dom";

// Public
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";
import EventDetail from "./pages/student/EventDetail";
import Events from "./pages/student/Events";
import Profile from "./pages/student/Profile";
import Notifications from "./pages/student/Notifications";

// Club Head
import ClubDashboard from "./pages/club/ClubDashboard";
import CreateEvent from "./pages/club/CreateEvent";
import MyEvents from "./pages/club/MyEvents";
import Participants from "./pages/club/Participants";
import EditEvent from "./pages/club/EditEvent";

// HOD
import HodDashboard from "./pages/hod/HodDashboard";
import Reports from "./pages/hod/Reports";

// Route Guards
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";


function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= STUDENT ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events/:id"
        element={
          <ProtectedRoute>
            <EventDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      {/* ================= CLUB HEAD ================= */}
<Route
  path="/club/dashboard"
  element={
    <RoleRoute roles={["club_head"]}>
      <ClubDashboard />
    </RoleRoute>
  }
/>

<Route
  path="/club/create-event"
  element={
    <RoleRoute roles={["club_head"]}>
      <CreateEvent />
    </RoleRoute>
  }
/>

<Route
  path="/club/events"
  element={
    <RoleRoute roles={["club_head"]}>
      <MyEvents />
    </RoleRoute>
  }
/>

<Route
  path="/club/edit-event/:id"
  element={
    <RoleRoute roles={["club_head"]}>
      <EditEvent />
    </RoleRoute>
  }
/>

<Route
  path="/club/participants"
  element={
    <RoleRoute roles={["club_head"]}>
      <Participants />
    </RoleRoute>
  }
/>

      {/* ================= HOD ================= */}

      <Route
        path="/hod/dashboard"
        element={
          <RoleRoute roles={["hod"]}>
            <HodDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/hod/reports"
        element={
          <RoleRoute roles={["hod"]}>
            <Reports />
          </RoleRoute>
        }
      />

      {/* ================= ADMIN (Future) ================= */}

      <Route path="/admin/dashboard" element={<Navigate to="/" replace />} />

      {/* ================= 404 ================= */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;