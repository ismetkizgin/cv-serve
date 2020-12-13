const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const hobbiesTransaction = TransactionsFactory.creating('hobbiesTransaction');
const tokenControl = verifyToken.tokenControl;
const hobbiesValidator = validators.hobbiesValidator;
const HttpStatusCode = require('http-status-codes');

router.get(
  '/hobbies',
  tokenControl,
  hobbiesValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await hobbiesTransaction.listAsync(req.query);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.post(
  '/hobbies',
  tokenControl,
  hobbiesValidator.insert,
  async (req, res) => {
    try {
      const result = await hobbiesTransaction.insertAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

module.exports = router;
