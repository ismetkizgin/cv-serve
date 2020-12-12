const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class ProjectTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    listAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblproject ${sqlHelper.getWhere(values)} ORDER BY id ASC ${sqlHelper.getLimitOffset(values)}`, (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No project registered to the system was found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    insertAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`INSERT INTO tblproject SET ?`, values, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Project registration has taken place.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'Error while registering project !' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such a project.' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

}

module.exports = ProjectTransactions;