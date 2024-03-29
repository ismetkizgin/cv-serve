const router = require('express')();
const TransactionsFactory = require('../database/transactionFactory');
const { validators, verifyToken } = require('../middleware');
const personalInformationTransactions = TransactionsFactory.creating(
  'personalInformationTransactions'
);
const tokenControl = verifyToken.tokenControl;
const personalInformationValidator = validators.personalInformationValidator;
const HttpStatusCode = require('http-status-codes');

router.get('/personal-information', async (req, res) => {
  try {
    const result = await personalInformationTransactions.listAsync(req.query);
    res.json(result);
  } catch (error) {
    res
      .status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.put(
  '/personal-information',
  tokenControl,
  personalInformationValidator.update,
  async (req, res) => {
    try {
      req.body.DateOfBirth = new Date(req.body.DateOfBirth);
      const result = await personalInformationTransactions.updateAsync(
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
