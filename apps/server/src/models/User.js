import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["student", "club_head", "hod", "admin"],
      default: "student"
    },

    rollNo: {
      type: String,
      required: true
    },

    branch: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    avatar: {
      type: String,
      default: ""
    },

    emailVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);