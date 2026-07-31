const Joi = require("joi");

const courseSchema = Joi.object({
    name: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Course name is required",
            "any.required": "Course name is required",
        }),

    duration: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Duration is required",
            "any.required": "Duration is required",
        }),

    fees: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Fees must be a number",
            "number.min": "Fees cannot be negative",
            "any.required": "Fees are required",
        }),

    status: Joi.string()
        .valid("Active", "Inactive")
        .required()
        .messages({
            "any.only": "Status must be Active or Inactive",
            "any.required": "Status is required",
        }),
});
module.exports = courseSchema;