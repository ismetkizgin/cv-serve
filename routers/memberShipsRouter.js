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
  tokenControl,
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

module.exports = router;
