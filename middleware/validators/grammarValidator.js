const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class GrammarValidator extends CommonValidator {
  constructor() {}

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          LanguageName: joi.string().max(100).required(),
          ReadingLevel: joi.string().max(50).required(),
          writingLevel: joi.string().max(50).required(),
          SpeakingLevel: joi.string().max(50).required()
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

module.exports = GrammarValidator;
