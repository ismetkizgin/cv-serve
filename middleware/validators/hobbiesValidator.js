const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class HobbiesValidator extends CommonValidator {
  constructor() {}

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          HobbyName: joi.string().max(100).required()
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

module.exports = HobbiesValidator;
