const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class CompetenciesValidator extends CommonValidator {
  constructor() {}

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          Competencies: joi.string().max(200).required()
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
          Competencies: joi.string().max(200).required()
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

module.exports = CompetenciesValidator;
