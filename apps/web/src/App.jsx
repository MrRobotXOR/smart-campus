import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import StudentDashboard from "./pages/student/StudentDashboard";
import EventDetail from "./pages/student/EventDetail";

import ClubDashboard from "./pages/club/ClubDashboard";
import CreateEvent from "./pages/club/CreateEvent";

import HodDashboard from "./pages/hod/HodDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Event Detail */}
      <Route
        path="/events/:id"
        element={
          <ProtectedRoute>
            <EventDetail />
          </ProtectedRoute>
        }
      />

      {/* Club Head Dashboard */}
      <Route
        path="/club/dashboard"
        element={
          <RoleRoute roles={["club_head"]}>
            <ClubDashboard />
          </RoleRoute>
        }
      />

      {/* Create Event */}
      <Route
        path="/club/create-event"
        element={
          <RoleRoute roles={["club_head"]}>
            <CreateEvent />
          </RoleRoute>
        }
      />

      {/* HOD Dashboard */}
      <Route
        path="/hod/dashboard"
        element={
          <RoleRoute roles={["hod"]}>
            <HodDashboard />
          </RoleRoute>
        }
      />
    </Routes>
  );
}

export default App;