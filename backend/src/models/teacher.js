const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        experience: {
            type:String,
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;