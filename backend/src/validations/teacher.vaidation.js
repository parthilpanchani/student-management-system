const Joi = require("joi");
const teacherSchema = Joi.object({
    name: Joi.string().required(),
    experience: Joi.number().required().max(100),
    course: Joi.string().required(),
    phone: Joi.string().required().min(10).max(10),

});
module.exports = teacherSchema;