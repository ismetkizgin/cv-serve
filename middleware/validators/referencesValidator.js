const joi = require("joi");
const HttpStatusCode = require("http-status-codes");
const CommonValidator = require('./commonValidator');

class ReferencesValidator extends CommonValidator {
    constructor() { }

    static async insert(req, res, next) {
        try {
            await joi.object({
                Name: joi.string().max(200).required(),
                Phone: joi.string().max(25).required(),
                CompanyName: joi.string(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }

    static async update(req, res, next) {
        try {
            await joi.object({
                Id: joi.number().required(),
                Name: joi.string().max(200).required(),
                Phone: joi.string().max(25).required(),
                CompanyName: joi.string()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(HttpStatusCode.EXPECTATION_FAILED).send('Must have correct data entry.');
        }
    }
}

module.exports = ReferencesValidator;