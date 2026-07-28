const Joi = require("joi");
const studentSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required().min(10).max(10),
    course: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string().required()
});
module.exports = studentSchema;