const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const educationInformationTransactions = TransactionsFactory.creating(
  'educationInformationTransactions'
);
const tokenControl = verifyToken.tokenControl;
const eduacationInformationValidator =
  validators.eduacationInformationValidator;
const HttpStatusCode = require('http-status-codes');

router.get(
  '/education-info',
  eduacationInformationValidator.limitAndOffset,
  async (req, res) => {
    try {
      const result = await educationInformationTransactions.listAsync(
        req.query
      );
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get(
  '/education-info/:Id',
  eduacationInformationValidator.paramId,
  async (req, res) => {
    try {
      const result = await educationInformationTransactions.listAsync(
        req.params
      );
      res.json(result[0]);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.post(
  '/education-info',
  tokenControl,
  eduacationInformationValidator.insert,
  async (req, res) => {
    try {
      req.body.EntryDate = new Date(req.body.EntryDate);
      if (req.body.EndDate) 
        req.body.EndDate = new Date(req.body.EndDate);
      const result = await educationInformationTransactions.insertAsync(
        req.body
      );
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  '/education-info',
  tokenControl,
  eduacationInformationValidator.update,
  async (req, res) => {
    try {
      req.body.EntryDate = new Date(req.body.EntryDate);
      if (req.body.EndDate) req.body.EndDate = new Date(req.body.EndDate);
      const result = await educationInformationTransactions.updateAsync(
        req.body
      );
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.delete(
  '/education-info',
  tokenControl,
  eduacationInformationValidator.bodyId,
  async (req, res) => {
    try {
      const result = await educationInformationTransactions.deleteAsync(
        req.body
      );
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

module.exports = router;
