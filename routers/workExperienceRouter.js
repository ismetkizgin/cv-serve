const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken } = require("../middleware");
const workExperienceTransactions = TransactionsFactory.creating("workExperienceTransactions");
const tokenControl = verifyToken.tokenControl;
const workExperienceValidator = validators.workExperienceValidator;
const HttpStatusCode = require("http-status-codes");
const { date } = require("joi");

router.get('/work-experience', tokenControl, workExperienceValidator.limitAndOffset, async (req, res) => {
    try {
        const result = await workExperienceTransactions.listAsync(req.query);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.post('/work-experience', tokenControl, workExperienceValidator.insert, async (req, res) => {
    try {
        req.body.StartDateOfWork = new Date(req.body.StartDateOfWork);
        if (req.body.DismissalDate)
            req.body.DismissalDate = new Date(req.body.DismissalDate);
        const result = await workExperienceTransactions.insertAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

router.put('/work-experience', tokenControl, workExperienceValidator.update, async (req, res) => {
    try {
        req.body.StartDateOfWork = new Date(req.body.StartDateOfWork);
        if (req.body.DismissalDate)
            req.body.DismissalDate = new Date(req.body.DismissalDate);
        const result = await workExperienceTransactions.updateAsync(req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
    }
});

module.exports = router;