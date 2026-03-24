import mongoose from "mongoose";

type AssignedDoctor = {
  docId?: string;
  image?: string;
  docName?: string;
  docPhone?: string;
  department?: string;
  description?: string;
  consultingFee?: string;
  assignedAt?: string;
};

type Appointment = {
  userId: string;
  name: string;
  dob: string;
  gender: string;
  number: string;
  email: string;
  date: string;
  time: string;
  address: string;
  description: string;
  cancelled: boolean;
  status: string;
  bookedAt?: string;
  assignedDoctor?: AssignedDoctor;
};

const appointmentSchema = new mongoose.Schema<Appointment>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: true,
  },
  bookedAt: {
    type: String,
  },
  assignedDoctor: {
    docId: {
      type: String,
    },
    image: {
      type: String,
    },
    docName: {
      type: String,
    },
    docPhone: {
      type: String,
    },
    department: {
      type: String,
    },
    description: {
      type: String,
    },
    consultingFee: {
      type: String,
    },
    assignedAt: {
      type: String,
    },
  },
});

appointmentSchema.pre("save", function () {
  const date = new Date();
  this.bookedAt = date.toLocaleString("en-GB", { timeZone: "Asia/Kolkata" });
  if (this.assignedDoctor) {
    this.assignedDoctor.assignedAt = date.toLocaleString("en-GB", {
      timeZone: "Asia/Kolkata",
    });
  }
});

const appointmentModel =
  mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);
export default appointmentModel;
