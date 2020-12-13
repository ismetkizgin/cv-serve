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

module.exports = router;
