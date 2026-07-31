const Teacher = require("../models/Teacher");

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

        const teachers = await Teacher.find().populate("course","name");

        return res.status(200).json({
            success: true,
            totalTeachers: teachers.length,
            teachers
        });

    } catch (error) {
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