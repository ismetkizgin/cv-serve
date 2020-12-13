const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const documentationTransactions = TransactionsFactory.creating(
  'documentationTransactions'
);
const tokenControl = verifyToken.tokenControl;
const documentationValidator = validators.documentationValidator;
const HttpStatusCode = require('http-status-codes');

router.get(
  '/documentation',
  documentationValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await documentationTransactions.listAsync(req.query);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get(
  '/documentation/:Id',
  documentationValidator.paramId,
  async (req, res) => {
    try {
      const result = await documentationTransactions.listAsync(req.params);
      res.json(result[0]);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.post(
  '/documentation',
  tokenControl,
  documentationValidator.insert,
  async (req, res) => {
    try {
      const result = await documentationTransactions.insertAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

module.exports = router;
