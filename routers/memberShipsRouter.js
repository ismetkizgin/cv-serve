const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const memberShipsTransactions = TransactionsFactory.creating(
  'memberShipsTransactions'
);
const tokenControl = verifyToken.tokenControl;
const memberShipsValidator = validators.memberShipsValidator;
const HttpStatusCode = require('http-status-codes');

router.get(
  '/member-ships',
  memberShipsValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await memberShipsTransactions.listAsync(req.query);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get(
  '/member-ships/:Id',
  memberShipsValidator.paramId,
  async (req, res) => {
    try {
      const result = await memberShipsTransactions.listAsync(req.params);
      res.json(result[0]);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.post(
  '/member-ships',
  tokenControl,
  memberShipsValidator.insert,
  async (req, res) => {
    try {
      const result = await memberShipsTransactions.insertAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  '/member-ships',
  tokenControl,
  memberShipsValidator.update,
  async (req, res) => {
    try {
      const result = await memberShipsTransactions.updateAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.delete(
  '/member-ships',
  tokenControl,
  memberShipsValidator.bodyId,
  async (req, res) => {
    try {
      const result = await memberShipsTransactions.deleteAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

module.exports = router;
