const joi = require('joi');
const HttpStatusCode = require('http-status-codes');
const CommonValidator = require('./commonValidator');

class DocumentationValidator extends CommonValidator {
  constructor() {}
}

module.exports = DocumentationValidator;
