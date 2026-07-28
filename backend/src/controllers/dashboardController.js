const Course = require("../models/Course");
const Student = require("../models/Student");


const getDashboard = async (req, res) => {
    try {

        const totalStudents = await Student.countDocuments();
        const totalCourse = await Course.countDocuments();

        const recentStudents = await Student.find()
            .populate("course", "name")
            .sort({ createdAt: -1 })
            .limit(5)
            .select("name email course");

        res.status(200).json({
            totalStudents,
            totalCourse,
            recentStudents
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getDashboard
};