const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
const logActivity = require("../utils/activityLogger");

const createTeacher = async (req, res, next) => {
    try {
        const { name, experience, course, phone } = req.body;

        if (!name || !experience || !course || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingTeacher = await Teacher.findOne({ phone });
        if (existingTeacher) {
            return res.status(400).json({
                success: false,
                message: "Teacher already exists with this phone"
            });
        }

        const teacher = await Teacher.create({
            name,
            experience,
            course,
            phone,
        });
        await logActivity({
            userId: req.user.id,
            action: "Create",
            module: "Teacher",
            description: `${req.user.email} created teacher ${teacher.name}`,
            ipAddress: req.ip,
        });
        return res.status(201).json({
            success: true,
            message: "Teacher created successfully",
            teacher,
        });
    } catch (error) {
        next(error);
    }
};

const getAllTeacher = async (req, res, next) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const search = req.query.search || "";
        const course = req.query.course || "";

        const skip = (page - 1) * limit;

        const filter = {};

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i",
            };
        }

        if (course) {
            filter.course = course;
        }

        const totalTeachers = await Teacher.countDocuments(filter);

        const teachers = await Teacher.find(filter)
            .populate("course", "name")
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            teachers,
            totalTeachers,
            totalPages: Math.ceil(totalTeachers / limit),
            currentPage: page,
        });

    } catch (error) {
        console.log(error); // <-- add this
        next(error);
    }
};
const getTeacherById = async (req, res, next) => {
    try {

        const { id } = req.params;

        const teacher = await Teacher.findById(id).populate(
            "course",
            "name duration"
        );

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });
        }

        return res.status(200).json({
            success: true,
            teacher
        });

    } catch (error) {
        next(error);
    }
};
const updateTeacher = async (req, res, next) => {
    try {

        const { id } = req.params;

        const { name, experience, course, phone } = req.body;

        const teacher = await Teacher.findByIdAndUpdate(
            id,
            {
                name,
                experience,
                course,
                phone
            },
            {
                new: true,
                runValidators: true
            }
        ).populate("course", "name duration");

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });
        }
        await logActivity({
            userId: req.user.id,
            action: "update",
            module: "Teacher",
            description: `${req.user.email} updated teacher ${teacher.name}`,
            ipAddress: req.ip,
        });
        return res.status(200).json({
            success: true,
            message: "Teacher updated successfully",
            teacher
        });

    } catch (error) {
        next(error);
    }
};
const deleteTeacher = async (req, res, next) => {
    try {

        const { id } = req.params;

        const teacher = await Teacher.findByIdAndDelete(id);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found"
            });
        }
        await logActivity({
            userId: req.user.id,
            action: "Delete",
            module: "Teacher",
            description: `${req.user.email} deleted teacher ${teacher.name}`,
            ipAddress: req.ip,
        });
        return res.status(200).json({
            success: true,
            message: "Teacher deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};
module.exports = {
    createTeacher,
    getAllTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};