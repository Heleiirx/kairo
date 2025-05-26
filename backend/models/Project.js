import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    taskCount: {
      type: Number,
      default: 0,
    },
    timeSpent: {
      type: Number, // en horas
      default: 0,
    },
    status: {
      type: String,
      enum: ["pendiente", "en progreso", "completado"],
      default: "pendiente",
    },
    progress: {
      type: Number, // porcentaje del 0 al 100
      default: 0,
      min: 0,
      max: 100,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["baja", "media", "alta"],
      default: "media",
    },
    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
