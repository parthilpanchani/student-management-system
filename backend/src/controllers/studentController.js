const Student = require("../models/Student");
const Course = require("../models/Course");


const createStudent = async (req, res, next) => {
    try {
        const { name, email, phone, course, age, gender } = req.body;

        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "Student already exists"
            });
        }

        const student = await Student.create({
            name,
            email,
            phone,
            course,
            age,
            gender,
        });
        const studentResponse = {
            id: student._id,
            name: student.name,
            email: student.email,
            phone: student.phone,
            course: student.course,
            age: student.age,
            gender: student.gender
        };
        return res.status(201).json({
            success: true,
            message: "Student created successfully",
            student: studentResponse
        });
    } catch (error) {
        next(error);
    }
};
const getAllStudents = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 5,
            search = "",
            course,
            gender,
            sort
        } = req.query;

        const searchFilter = {
            $or: [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        };
        if (course) {
            searchFilter.course = course;
        }
        if (gender) {
            searchFilter.gender = gender;
        }
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const totalStudents = await Student.countDocuments(searchFilter);
        const totalPages = Math.ceil(totalStudents / limitNumber);
        const skip = (pageNumber - 1) * limitNumber;

        console.log(pageNumber);
        console.log(limitNumber);
        console.log(skip);
        console.log(totalStudents);

        // const students = await Student.find().populate("course");



        const students = await Student.find(searchFilter)
            .populate("course", "name")
            .skip(skip)
            .sort(sort)
            .limit(limitNumber);

        return res.status(200).json({
            success: true,
            currentPage: pageNumber,
            totalPages,
            totalStudents,
            students
        });
    } catch (error) {
        next(error);
    }
};
const getStudentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id)
            .populate("course", "name");
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        return res.status(200).json({
            success: true,
            student
        });
    } catch (error) {
        next(error);
    }
};
const updateStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, phone, course, age, gender } = req.body;
        const student = await Student.findByIdAndUpdate(
            id,
            {
                name,
                email,
                phone,
                course,
                age,
                gender
            },
            {
                new: true,
                runValidators: true
            }
        );
        return res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student
        });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
    } catch (error) {
        next(error);
    }
};
const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};
module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};