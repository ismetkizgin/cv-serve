const router = require("express")();
const jwt = require("jsonwebtoken");
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken } = require("../middleware");
const projectTransactions = TransactionsFactory.creating("projectTransactions");
const tokenControl = verifyToken.tokenControl;
const projectValidator = validators.projectValidator;
const HttpStatusCode = require("http-status-codes");

router.get('/project', tokenControl, projectValidator.limitAndOffset, async (req, res) => {
    try {
        const result = await projectTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.post('/project', tokenControl, projectValidator.insert, async (req, res) => {
    try {
        const result = await projectTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;