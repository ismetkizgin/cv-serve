const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class EducationInformationValidator extends CommonValidator {
  constructor() {}

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          SchoolName: joi.string().max(200).required(),
          SchoolStatus: joi.string().max(50).required(),
          SectionName: joi.string().max(150).required(),
          EntryDate: joi.date().required(),
          EndDate: joi.date()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().required(),
          SchoolName: joi.string().max(200).required(),
          SchoolStatus: joi.string().max(50).required(),
          SectionName: joi.string().max(150).required(),
          EntryDate: joi.date().required(),
          EndDate: joi.date()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }
}

module.exports = EducationInformationValidator;
