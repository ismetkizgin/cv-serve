const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const hobbiesTransactions = TransactionsFactory.creating('hobbiesTransactions');
const tokenControl = verifyToken.tokenControl;
const hobbiesValidator = validators.hobbiesValidator;
const HttpStatusCode = require('http-status-codes');

router.get('/hobbies', hobbiesValidator.limitAndOffset, async (req, res) => {
  try {
    const result = await hobbiesTransactions.listAsync(req.query);
    res.json(result);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.get('/hobbies/:Id', hobbiesValidator.paramId, async (req, res) => {
  try {
    const result = await hobbiesTransactions.listAsync(req.params);
    res.json(result[0]);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.post(
  '/hobbies',
  tokenControl,
  hobbiesValidator.insert,
  async (req, res) => {
    try {
      const result = await hobbiesTransactions.insertAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  '/hobbies',
  tokenControl,
  hobbiesValidator.update,
  async (req, res) => {
    try {
      const result = await hobbiesTransactions.updateAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.delete(
  '/hobbies',
  tokenControl,
  hobbiesValidator.bodyId,
  async (req, res) => {
    try {
      const result = await hobbiesTransactions.deleteAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

module.exports = router;
