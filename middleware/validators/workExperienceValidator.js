const joi = require("joi");
const HttpStatusCode = require("http-status-codes");
const CommonValidator = require('./commonValidator');

class WorkExperienceValidator extends CommonValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                CompanyName: joi.string().max(200).required(),
                Title: joi.string().max(150).required(),
                StartDateOfWork: joi.date().required(),
                DismissalDate: joi.date()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            console.error(error);
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = WorkExperienceValidator;