const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const eventTransactions = TransactionsFactory.creating('eventTransactions');
const tokenControl = verifyToken.tokenControl;
const eventValidator = validators.eventValidator;
const HttpStatusCode = require('http-status-codes');

router.get('/event', eventValidator.limitAndOffset, async (req, res) => {
  try {
    const result = await eventTransactions.listAsync(req.query);
    res.json(result);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.get('/event/:Id', eventValidator.paramId, async (req, res) => {
  try {
    const result = await eventTransactions.listAsync(req.params);
    res.json(result[0]);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.post('/event', tokenControl, eventValidator.insert, async (req, res) => {
  try {
    const result = await eventTransactions.insertAsync(req.body);
    res.json(result);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.put('/event', tokenControl, eventValidator.update, async (req, res) => {
  try {
    const result = await eventTransactions.updateAsync(req.body);
    res.json(result);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.delete(
  '/event',
  tokenControl,
  eventValidator.bodyId,
  async (req, res) => {
    try {
      const result = await eventTransactions.deleteAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

module.exports = router;
