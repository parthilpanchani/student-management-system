const express = require("express");
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword } = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validateStudent = require("../middleware/studentValidation");
const validateCourse = require("../middleware/courseValidation");
const validateTeacher = require("../middleware/teacherValidation");

const { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, getActivityLogs, getRecentActivity, exportStudents, importStudents } = require("../controllers/studentController");
const { getDashboard } = require("../controllers/dashboardController");
const { createCourse, getAllCourses, updateCourse, getCourseById, deleteCourse } = require("../controllers/courseController")
const { createTeacher, getAllTeacher, getTeacherById, updateTeacher, deleteTeacher } = require("../controllers/teacherController");
const {
    getProfile,
    updateProfile,
    uploadProfileImage,
    getProfileImage,
    changePassword,
} = require("../controllers/profileController");

const upload = require("../middleware/uploadMiddleware");
const csvUpload = require("../middleware/csvUpload");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

router.post(
    "/students",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    validateStudent,
    upload.single("profileImage"),
    createStudent
);
router.get(
    "/students",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    getAllStudents
);
router.get(
    "/students/export",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    exportStudents
);
router.post(
    "/students/import",
    authMiddleware,
    roleMiddleware("admin"),
    csvUpload.single("file"),
    importStudents
);
router.get(
    "/students/:id",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    getStudentById
);
router.put(
    "/students/:id",
    authMiddleware,
    upload.single("profileImage"),
    roleMiddleware("admin", "teacher"),
    updateStudent
);
router.delete(
    "/students/:id",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    deleteStudent
);
router.get(
    "/activity-logs",
    authMiddleware,
    roleMiddleware("admin"),
    getActivityLogs
);
router.get(
    "/activity-logs/recent",
    authMiddleware,
    getRecentActivity
);

router.get("/dashboard",
    authMiddleware,
    roleMiddleware("admin", "teacher"),
    getDashboard);

router.post(
    "/courses",
    authMiddleware,
    validateCourse,
    roleMiddleware("admin", "teacher"),
    createCourse
);
router.get("/courses", authMiddleware, roleMiddleware("admin", "teacher"), getAllCourses);

router.get("/courses/:id", authMiddleware, roleMiddleware("admin", "teacher"), getCourseById);

router.put("/courses/:id", authMiddleware, validateCourse, roleMiddleware("admin", "teacher"), updateCourse);

router.delete("/courses/:id", authMiddleware, roleMiddleware("admin", "teacher"), deleteCourse);

router.post("/teacher",
    authMiddleware,
    validateTeacher,
    roleMiddleware("admin", "teacher"),
    createTeacher
);

router.get(
    "/teacher", authMiddleware, roleMiddleware("admin", "teacher"), getAllTeacher);
router.get(
    "/teacher/:id", authMiddleware, roleMiddleware("admin", "teacher"), getTeacherById);
router.put(
    "/teacher/:id", authMiddleware, validateTeacher, roleMiddleware("admin", "teacher"), updateTeacher);
router.delete(
    "/teacher/:id", authMiddleware, roleMiddleware("admin", "teacher"), deleteTeacher);



router.get(
    "/profile",
    authMiddleware,
    getProfile
);
router.get(
    "/profile/image",
    authMiddleware,
    getProfileImage
);
router.put(
    "/profile",
    authMiddleware,
    updateProfile
);
router.put(
    "/profile/image",
    authMiddleware,
    upload.single("profileImage"),
    uploadProfileImage
);
router.put(
    "/profile/password",
    authMiddleware,
    changePassword
);

// router.get(
//     "/profile",
//     authMiddleware,
//     getProfile
// );  
module.exports = router;