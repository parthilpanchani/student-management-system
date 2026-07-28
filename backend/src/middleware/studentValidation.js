const studentSchema = require("../validations/student.validation");
const validateStudent = (req, res, next) => {
const { error } = studentSchema.validate(req.body);
if (error) {
    return res.status(400).json({
        success: false,
        message: error.details[0].message
    });
}
next();
};
module.exports = validateStudent;