const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const competenciesTransactions = TransactionsFactory.creating(
  'competenciesTransactions'
);
const tokenControl = verifyToken.tokenControl;
const competenciesValidator = validators.competenciesValidator;
const HttpStatusCode = require('http-status-codes');

router.get(
  '/competencies',
  competenciesValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await competenciesTransactions.listAsync(req.query);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get(
  '/competencies/:Id',
  competenciesValidator.paramId,
  async (req, res) => {
    try {
      const result = await competenciesTransactions.listAsync(req.params);
      res.json(result[0]);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.post(
  '/competencies',
  tokenControl,
  competenciesValidator.insert,
  async (req, res) => {
    try {
      const result = await competenciesTransactions.insertAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  '/competencies',
  tokenControl,
  competenciesValidator.update,
  async (req, res) => {
    try {
      const result = await competenciesTransactions.updateAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.delete(
  '/competencies',
  tokenControl,
  competenciesValidator.bodyId,
  async (req, res) => {
    try {
      const result = await competenciesTransactions.deleteAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

module.exports = router;
