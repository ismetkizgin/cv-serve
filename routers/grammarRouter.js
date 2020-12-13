const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const grammarTransactions = TransactionsFactory.creating('grammarTransactions');
const tokenControl = verifyToken.tokenControl;
const grammarValidator = validators.grammarValidator;
const HttpStatusCode = require('http-status-codes');

router.get('/grammar', grammarValidator.limitAndOffset, async (req, res) => {
  try {
    const result = await grammarTransactions.listAsync(req.query);
    res.json(result);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.get('/grammar/:Id', grammarValidator.paramId, async (req, res) => {
  try {
    const result = await grammarTransactions.listAsync(req.params);
    res.json(result[0]);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.post(
  '/grammar',
  tokenControl,
  grammarValidator.insert,
  async (req, res) => {
    try {
      const result = await grammarTransactions.insertAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  '/grammar',
  tokenControl,
  grammarValidator.update,
  async (req, res) => {
    try {
      const result = await grammarTransactions.updateAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.delete(
  '/grammar',
  tokenControl,
  grammarValidator.bodyId,
  async (req, res) => {
    try {
      const result = await grammarTransactions.deleteAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

module.exports = router;
