const teacherSchema = require("../validations/teacher.vaidation");
const validateTeacher = (req, res, next) => {
const { error } = teacherSchema.validate(req.body);
if (error) {
    return res.status(400).json({
        success: false,
        message: error.details[0].message
    });
}
next();
};
module.exports = validateTeacher;