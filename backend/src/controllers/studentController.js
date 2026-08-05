const Student = require("../models/Student");
const Course = require("../models/Course");
const logActivity = require("../utils/activityLogger");
const ActivityLog = require("../models/ActivityLog");
const { Parser } = require("json2csv");
const csv = require("csv-parser");
const { Readable } = require("stream");
const studentSchema = require("../validations/student.validation");
const validateStudent = require("../middleware/studentValidation");

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

        const studentData = {
            name,
            email,
            phone,
            course,
            age,
            gender,
        };

        if (req.file) {
            studentData.profileImage = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        }

        const student = await Student.create(studentData);
        await logActivity({
            userId: req.user.id,
            action: "Create",
            module: "Student",
            description: `${req.user.email} created student ${student.name}`,
            ipAddress: req.ip,
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


        const students = await Student.find(searchFilter)
            .populate("course", "name")
            .skip(skip)
            .sort(sort)
            .limit(limitNumber);

        const studentsWithImages = students.map((student) => {
            const studentObj = student.toObject();

            if (student.profileImage && student.profileImage.data) {


                const buffer = Buffer.isBuffer(student.profileImage.data)
                    ? student.profileImage.data
                    : Buffer.from(student.profileImage.data);

                studentObj.profileImage =
                    `data:${student.profileImage.contentType};base64,${buffer.toString("base64")}`;

            } else {
                studentObj.profileImage = null;
            }

            return studentObj;
        });

        return res.status(200).json({
            success: true,
            students: studentsWithImages,
            totalStudents,
            totalPages,
            currentPage: pageNumber,
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
                message: "Student not found",
            });
        }

        const studentResponse = {
            ...student.toObject(),

            profileImage:
                student.profileImage?.data
                    ? `data:${student.profileImage.contentType};base64,${student.profileImage.data.toString("base64")}`
                    : null,
        };

        return res.status(200).json({
            success: true,
            student: studentResponse,
        });

    } catch (error) {
        next(error);
    }
};
const updateStudent = async (req, res, next) => {
    try {

        const { id } = req.params;

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        student.name = req.body.name;
        student.email = req.body.email;
        student.phone = req.body.phone;
        student.course = req.body.course;
        student.age = req.body.age;
        student.gender = req.body.gender;

        // Update image only if a new one is uploaded
        if (req.file) {
            student.profileImage = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        }

        await student.save();
        await logActivity({
            userId: req.user.id,
            action: "Update",
            module: "Student",
            description: `${req.user.email} updated student ${student.name}`,
            ipAddress: req.ip,
        });
        return res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student,
        });

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
        await logActivity({
            userId: req.user.id,
            action: "Delete",
            module: "Student",
            description: `${req.user.email} deleted student ${student.name}`,
            ipAddress: req.ip,
        });
        return res.status(200).json({
            success: true,
            message: "Student deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};
const getActivityLogs = async (req, res, next) => {
    try {

        const logs = await ActivityLog.find()
            .populate("user", "name email role")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            logs,
        });

    } catch (error) {
        next(error);
    }
};
const getRecentActivity = async (req, res, next) => {
    try {

        const logs = await ActivityLog.find({
            user: req.user.id,
        })
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json({
            success: true,
            logs,
        });

    } catch (error) {
        next(error);
    }
};
const exportStudents = async (req, res, next) => {
    try {
        const students = await Student.find()
            .populate("course", "name");
        const csvData = students.map((student) => ({
            Name: student.name,
            Email: student.email,
            Phone: student.phone,
            Course: student.course?.name,
            Age: student.age,
            Gender: student.gender,
        }));

        const parser = new Parser();
        const csv = parser.parse(csvData);

        res.header("Content-Type", "text/csv");
        res.attachment("students.csv");

        return res.send(csv);

    } catch (error) {
        next(error);
    }
};
const importStudents = async (req, res, next) => {
    try {

        const students = [];

        Readable.from(req.file.buffer)
            .pipe(csv())
            .on("data", (row) => {

                students.push(row);

            })
            .on("end", async () => {

                let imported = 0;
                let skipped = 0;


                for (const row of students) {

                    console.log("Current Row:", row);

                    const existingStudent = await Student.findOne({
                        email: row.Email,
                    });

                    if (existingStudent) {
                        console.log("❌ Duplicate Email:", row.Email);
                        skipped++;
                        continue;
                    }

                    const course = await Course.findOne({
                        name: row.Course,
                    });

                    if (!course) {
                        console.log("❌ Course Not Found:", row.Course);
                        skipped++;
                        continue;
                    }

            
                    const validationData = {
                        name: row.Name.trim(),
                        email: row.Email.trim(),
                        phone: row.Phone.trim(),
                        age: Number(row.Age),
                        gender: row.Gender.trim().toLowerCase(),
                        course: row.Course.trim(), // string for Joi
                    };

                    const { error } = studentSchema.validate(validationData);

                    if (error) {
                        console.log("❌ Validation Error:", error.details[0].message);
                        skipped++;
                        continue;
                    }
                    const studentData = {
                        name: validationData.name,
                        email: validationData.email,
                        phone: validationData.phone,
                        age: validationData.age,
                        gender: validationData.gender,
                        course: course._id,
                    };


                    await Student.create(studentData);

                    console.log("✅ Imported:", row.Email);

                    imported++;
                }


                return res.status(200).json({
                    success: true,
                    message: "Import completed successfully",
                    imported,
                    skipped,
                });

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
    deleteStudent,
    getActivityLogs,
    getRecentActivity,
    exportStudents,
    importStudents

};