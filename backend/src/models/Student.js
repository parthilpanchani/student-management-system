const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        profileImage: {
            data: Buffer,
            contentType: String,
        },
        name: {
            type: String,
            required: [true, "Student name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"]
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        age: {
            type: Number,
            required: [true, "Age is required"]
        },
        gender: {
            type: String,
            required: [true, "Gender is required"]
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Student", studentSchema);