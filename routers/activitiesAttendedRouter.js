const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const activitiesAttendedTransactions = TransactionsFactory.creating(
  'activitiesAttendedTransactions'
);
const tokenControl = verifyToken.tokenControl;
const activitiesAttendedValidator = validators.activitiesAttendedValidator;
const HttpStatusCode = require('http-status-codes');

router.get(
  '/activities-attended',
  activitiesAttendedValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await activitiesAttendedTransactions.listAsync(req.query);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get(
  '/activities-attended/:Id',
  activitiesAttendedValidator.paramId,
  async (req, res) => {
    try {
      const result = await activitiesAttendedTransactions.listAsync(req.params);
      res.json(result[0]);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.post(
  '/activities-attended',
  tokenControl,
  activitiesAttendedValidator.insert,
  async (req, res) => {
    try {
      const result = await activitiesAttendedTransactions.insertAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  '/activities-attended',
  tokenControl,
  activitiesAttendedValidator.update,
  async (req, res) => {
    try {
      const result = await activitiesAttendedTransactions.updateAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.delete(
  '/activities-attended',
  tokenControl,
  activitiesAttendedValidator.bodyId,
  async (req, res) => {
    try {
      const result = await activitiesAttendedTransactions.deleteAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

module.exports = router;
