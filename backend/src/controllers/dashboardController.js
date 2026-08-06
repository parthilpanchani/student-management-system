const Course = require("../models/Course");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const getDashboard = async (req, res) => {
    try {

        const totalStudents = await Student.countDocuments();
        const totalCourse = await Course.countDocuments();
        const totalTeacher = await Teacher.countDocuments();

        const recentStudents = await Student.find()
            .populate("course", "name")
            .sort({ createdAt: -1 })
            .limit(5)
            .select("name email course");

    const studentsByCourse = await Student.aggregate([
    {
        $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "course"
        }
    },
    {
        $unwind: "$course"
    },
    {
        $group: {
            _id: "$course.name",
            students: {
                $sum: 1
            }
        }
    },
    {
        $project: {
            _id: 0,
            course: "$_id",
            students: 1
        }
    },
    {
        $sort: {
            students: -1
        }
    }
]);

      const genderDistribution = await Student.aggregate([
    {
        $group: {
            _id: "$gender",
            value: {
                $sum: 1
            }
        }
    },
    {
        $project: {
            _id: 0,
            name: "$_id",
            value: 1
        }
    }
]);

        res.status(200).json({
            totalStudents,
            totalTeacher,
            totalCourse,
            recentStudents,
            studentsByCourse,
            genderDistribution
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