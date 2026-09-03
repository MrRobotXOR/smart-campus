import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    attendance: {
      type: Boolean,
      default: false
    },

    qrToken: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

// Same student ek hi event me ek hi baar register ho sake
registrationSchema.index(
  { event: 1, student: 1 },
  { unique: true }
);

export default mongoose.model("Registration", registrationSchema);