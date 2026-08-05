const Course = require("../models/Course");
const logActivity = require("../utils/activityLogger");

const createCourse = async (req, res, next) => {
    try {
        const { name, duration, fees, status } = req.body;

        const existingCourse = await Course.findOne({ name });

        if (existingCourse) {
            return res.status(409).json({
                success: false,
                message: "Course already exists",
            });
        }

        const course = await Course.create({
            name,
            duration,
            fees,
            status,
        });
        await logActivity({
            userId: req.user.id,
            action: "Create",
            module: "Course",
            description: `${req.user.email} created course ${course.name}`,
            ipAddress: req.ip,
        });
        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            course,
        });
    } catch (error) {
        next(error);
    }
};

const getAllCourses = async (req, res, next) => {
    try {

        const {
            page = 1,
            limit = 5,
            search = "",
            status = "",
            sort = "name"
        } = req.query;

        let searchFilter = {
            name: {
                $regex: search,
                $options: "i",
            },
        };

        if (status) {
            searchFilter.status = status;
        }
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        const totalCourses = await Course.countDocuments(searchFilter);

        const totalPages = Math.ceil(totalCourses / limitNumber);

        const skip = (pageNumber - 1) * limitNumber;

        const courses = await Course.find(searchFilter)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber);

        return res.status(200).json({
            success: true,
            currentPage: pageNumber,
            totalPages,
            totalCourses,
            courses
        });

    } catch (error) {
        next(error);
    }
};

const getCourseById = async (req, res, next) => {
    try {

        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        next(error);
    }
};

const updateCourse = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { name, duration, fees, status } = req.body;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const existingCourse = await Course.findOne({
            name,
            _id: { $ne: id }
        });

        if (existingCourse) {
            return res.status(409).json({
                success: false,
                message: "Course already exists"
            });
        }

        course.name = name;
        course.duration = duration;
        course.fees = fees;
        course.status = status;

        await course.save();
        await logActivity({
            userId: req.user.id,
            action: "Update",
            module: "Course",
            description: `${req.user.email} updated course ${course.name}`,
            ipAddress: req.ip,
        });
        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course
        });

    } catch (error) {
        next(error);
    }
};

const deleteCourse = async (req, res, next) => {
    try {

        const { id } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        await Course.findByIdAndDelete(id);
        await logActivity({
            userId: req.user.id,
            action: "Delete",
            module: "Course",
            description: `${req.user.email} deleted course ${course.name}`,
            ipAddress: req.ip,
        });
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};