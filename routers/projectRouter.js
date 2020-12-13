const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const projectTransactions = TransactionsFactory.creating('projectTransactions');
const tokenControl = verifyToken.tokenControl;
const projectValidator = validators.projectValidator;
const HttpStatusCode = require('http-status-codes');

router.get('/project', projectValidator.limitAndOffset, async (req, res) => {
  try {
    const result = await projectTransactions.listAsync(req.query);
    res.json(result);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.get('/project/:Id', projectValidator.paramId, async (req, res) => {
  try {
    const result = await projectTransactions.listAsync(req.params);
    res.json(result[0]);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.post(
  '/project',
  tokenControl,
  projectValidator.insert,
  async (req, res) => {
    try {
      const result = await projectTransactions.insertAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  '/project',
  tokenControl,
  projectValidator.update,
  async (req, res) => {
    try {
      const result = await projectTransactions.updateAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.delete(
  '/project',
  tokenControl,
  projectValidator.bodyId,
  async (req, res) => {
    try {
      const result = await projectTransactions.deleteAsync(req.body);
      res.json(result);
    } catch (error) {
      res
        .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

module.exports = router;
