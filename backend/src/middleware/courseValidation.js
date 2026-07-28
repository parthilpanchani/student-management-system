const courseSchema = require("../validations/course.validation");

const validateCourse = (req, res, next) => {

    const { error } = courseSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

module.exports = validateCourse;