const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class ProjectTransactions {
    constructor() {
        this._datacontext = mysqlDataContext.connection();
    }

    listAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`SELECT * FROM tblWorkExperience ${sqlHelper.getWhere(values)} ORDER BY DismissalDate DESC ${sqlHelper.getLimitOffset(values)}`, (error, result) => {
                if (!error) {
                    if (result.length > 0)
                        resolve(result);
                    else
                        reject({ status: HttpStatusCode.NOT_FOUND, message: 'No work experiences registered to the system was found.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    insertAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`INSERT INTO tblWorkExperience SET ?`, values, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Work experience registration has taken place.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'Error while registering work experience !' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such a work experience.' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    updateAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`UPDATE tblWorkExperience SET ? WHERE Id=?`, [values, values.Id], (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Work experience information has been updated.');
                    else
                        reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: 'An error occurred while updating work experience information.' });
                }
                else {
                    reject(error.errno == 1062 ? { status: HttpStatusCode.CONFLICT, message: 'There is such work experience.' } : { status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }

    deleteAsync(values) {
        return new Promise((resolve, reject) => {
            this._datacontext.query(`DELETE FROM tblWorkExperience ${sqlHelper.getWhere(values)}`, (error, result) => {
                if (!error) {
                    if (result.affectedRows)
                        resolve('Deletion succeeded.');
                    else
                        reject({ status: HttpStatusCode.GONE, message: 'There is no such work experience.' });
                }
                else {
                    reject({ status: HttpStatusCode.INTERNAL_SERVER_ERROR, message: error.message });
                }
            });
        });
    }
}

module.exports = ProjectTransactions;