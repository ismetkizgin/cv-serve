const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class PersonalInformationValidator extends CommonValidator {
  constructor() {}

  static async update(req, res, next) {
    try {
      await joi
        .object({
          FirstName: joi.string().max(100).required(),
          LastName: joi.string().max(100).required(),
          Address: joi.string().required(),
          Phone: joi.string().max(25).required(),
          Gender: joi.boolean().required(),
          DateOfBirth: joi.date().required(),
          MaritalStatus: joi.string().max(25).required(),
          MilitaryStatus: joi.string().max(25),
          Nationality: joi.string().max(25).required(),
          DriversLicense: joi.string().max(25).required(),
          EmailAddress: joi.string().max(150).required(),
          Website: joi.string().max(150).required(),
          Description: joi.string().required()
        })
        .validateAsync(req.body);
      next();
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatusCode.EXPECTATION_FAILED)
        .send('Must have correct data entry.');
    }
  }
}

module.exports = PersonalInformationValidator;
