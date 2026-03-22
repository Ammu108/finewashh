import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
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
    }

})

appointmentSchema.pre("save", function (next) {
    const date = new Date();
    this.bookedAt = date.toLocaleString("en-GB", { timeZone: "Asia/Kolkata" });
    this.assignedAt = date.toLocaleString("en-GB", { timeZone: "Asia/Kolkata" });
    next();
});

const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);
export default appointmentModel;