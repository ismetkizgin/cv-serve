const router = require("express")();
const jwt = require("jsonwebtoken");
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken } = require("../middleware");
const referencesTransactions = TransactionsFactory.creating("referencesTransactions");
const tokenControl = verifyToken.tokenControl;
const referencesValidator = validators.referencesValidator;
const HttpStatusCode = require("http-status-codes");

router.get('/references', tokenControl, referencesValidator.limitAndOffset, async (req, res) => {
    try {
        const result = await referencesTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.post('/references', tokenControl, referencesValidator.insert, async (req, res) => {
    try {
        const result = await referencesTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;