const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validateStudent = require("../middleware/studentValidation");
const validateCourse = require("../middleware/courseValidation");
const validateTeacher = require("../middleware/teacherValidation");

const { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } = require("../controllers/studentController");
const { getDashboard } = require("../controllers/dashboardController");
const { createCourse, getAllCourses,updateCourse,getCourseById,deleteCourse } = require("../controllers/courseController")
const { createTeacher,getAllTeacher,getTeacherById,updateTeacher,deleteTeacher } = require("../controllers/teacherController");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post(
    "/students",
    authMiddleware,
    roleMiddleware("admin"),
    validateStudent,
    createStudent
);
router.get(
    "/students",
    authMiddleware,
    roleMiddleware("admin"),
    getAllStudents
);
router.get(
    "/students/:id",
    authMiddleware,
    roleMiddleware("admin"),
    getStudentById
);
router.put(
    "/students/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateStudent
);
router.delete(
    "/students/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteStudent
);
router.get("/dashboard",
    authMiddleware,
    roleMiddleware("admin"),
    getDashboard);

router.post(
    "/courses",
    authMiddleware,
    validateCourse,
    roleMiddleware("admin"),
    createCourse
);
router.get("/courses", authMiddleware, roleMiddleware("admin"), getAllCourses);

router.get("/courses/:id", authMiddleware, roleMiddleware("admin"), getCourseById);

router.put("/courses/:id", authMiddleware,validateCourse, roleMiddleware("admin"), updateCourse);

router.delete("/courses/:id", authMiddleware, roleMiddleware("admin"), deleteCourse);

router.post("/teacher", 
    authMiddleware, 
    validateTeacher ,
    roleMiddleware("admin"),
    createTeacher
);

router.get(
    "/teacher",authMiddleware,roleMiddleware("admin"),getAllTeacher);
router.get(
    "/teacher/:id",authMiddleware,roleMiddleware("admin"),getTeacherById);
router.put(
    "/teacher/:id",authMiddleware,validateTeacher,roleMiddleware("admin"),updateTeacher);
router.delete(
    "/teacher/:id",authMiddleware,roleMiddleware("admin"),deleteTeacher);
module.exports = router;