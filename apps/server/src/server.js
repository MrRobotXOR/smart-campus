import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import connectDB from "./config/db.js";
import registrationRoutes from "./routes/registration.routes.js";
dotenv.config();

connectDB();

const app = express();

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Static Uploads Folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

console.log("📌 Mounting auth routes...");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Smart Campus Server Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});