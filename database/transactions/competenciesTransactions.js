const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class competenciesTransactions {
  constructor() {
    this._datacontext = mysqlDataContext.connection();
  }

  listAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `SELECT * FROM tblCompetencies ${sqlHelper.getWhere(
          values
        )} ORDER BY id ASC ${sqlHelper.getLimitOffset(values)}`,
        (error, result) => {
          if (!error) {
            if (result.length > 0) resolve(result);
            else
              reject({
                status: HttpStatusCode.NOT_FOUND,
                message: 'No competencies registered to the system was found.'
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message
            });
          }
        }
      );
    });
  }

  insertAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `INSERT INTO tblCompetencies SET ?`,
        values,
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve('Competency registration has taken place.');
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: 'Error while registering competency!'
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message
            });
          }
        }
      );
    });
  }

  updateAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `UPDATE tblCompetencies SET ? WHERE Id=?`,
        [values, values.Id],
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve('Competency information has been updated.');
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message:
                  'An error occurred while updating competency information.'
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message
            });
          }
        }
      );
    });
  }

  deleteAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `DELETE FROM tblCompetencies ${sqlHelper.getWhere(values)}`,
        (error, result) => {
          if (!error) {
            if (result.affectedRows) resolve('Deletion succeeded.');
            else
              reject({
                status: HttpStatusCode.GONE,
                message: 'There is no such competency.'
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message
            });
          }
        }
      );
    });
  }
}

module.exports = competenciesTransactions;
