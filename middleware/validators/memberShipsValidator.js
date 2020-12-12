const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class MemberShipsValidator extends CommonValidator {
  constructor() {}

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          CompanyName: joi.string().max(200).required(),
          Status: joi.string().max(100).required()
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

module.exports = MemberShipsValidator;
