import appointmentModel from "../models/appointmentModel.js";
import nodemailer from 'nodemailer';

const bookingDetails = async (req, res) => {

    try {
        const { name, dob, gender, number, email, date, time, address, description } = req.body;

        const userId = req.user.id;

        if (!name || !dob || !gender || !number || !email || !date || !time || !address || !description) {
            return res.status(400).json({ error: "All Fields Are Required" })
        }

        const newAppointment = new appointmentModel({
            userId, name, dob, gender, number, email, date, time, address, description, status: "Pending", bookedAt: new Date(), 
        });
        
        await newAppointment.save();

        let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465, // Use Gmail or another provider
            auth: {
                user: "atomhospital@gmail.com", // Replace with your email
                pass: "fzzcefdgujqirtrt" // Use App Password if using Gmail
            }
        });

        // Email options
        const mailOptions = {
            from: "atomhospital@gmail.com",
            to: email, // Send to user's email
            subject: "Appointment Booked",
            text: `Hello ${name},\n\nYour appointment is booked for ${date} at ${time}.
            \n\nAddress: ${address}\n\n\nYou will receive a confirmation email once your appointment is 
            confirmed within 2 days. If you need to cancel, please do so at least 24 hours in advance.
            \n\nThank you!\nAtom Hospital Team.`,
        };

        // Send email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Email Error:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        });

        return res.status(201).json({ success: "true", message: "Appointment booked successfully", appointment: newAppointment })

    } catch (error) {
        return res.status(500).json({ error: "Something Went Wrong", details: error.message });
    }
};


// List Appointment

const listAppointment = async (req, res) => {
    try {
        
        const userId = req.user.id;
        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// Cancelled Appointment

const cancelledAppointment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized Action" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true, status: "Rejected" });

        return res.json({ success: true, message: "Appointment successfully cancelled" });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// getting user

const getAppointment =  async(req, res) => {
    try {
        const id = req.params.id;
        const userExist = await appointmentModel.findById(id);
        if(!userExist){
            return res.status(404).json({message:"User Not Found"});
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({error:error});
    }
}

// update user

const updateAppointment = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await appointmentModel.findById(id);
        if(!userExist){
            return res.status(401).json({message:"User Not Found"});
        }
        const updatedAppointment = await appointmentModel.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json(updatedAppointment);

        let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465, // Use Gmail or another provider
            auth: {
                user: "atomhospital@gmail.com", // Replace with your email
                pass: "fzzcefdgujqirtrt" // Use App Password if using Gmail
            }
        });

        // Email options
        const mailOptions = {
            from: "atomhospital@gmail.com",
            to: `${updatedAppointment.email}`, // Send to user's email
            subject: "Appointment Updated",
            text: `Dear ${updatedAppointment.name},
            Your appointment at Atom Hospital has been successfully updated.
            You can check your updated appointment on the site.
            If you need to make any further changes or have any questions, feel free to reach out.
            Thank you for choosing Atom Hospital!
            Best Regards,
            Atom Hospital Team.`,
        };

        // Send email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Email Error:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        });

    } catch (error) {
        res.status(500).json({error: error})
    }
}

export { bookingDetails, listAppointment, cancelledAppointment, getAppointment, updateAppointment };