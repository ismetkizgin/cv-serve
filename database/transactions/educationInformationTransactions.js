const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class EducationInformationTransactions {
  constructor() {
    this._datacontext = mysqlDataContext.connection();
  }

  listAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `SELECT * FROM tblEducationInformation ${sqlHelper.getWhere(
          values
        )} ORDER BY EndDate ASC ${sqlHelper.getLimitOffset(values)}`,
        (error, result) => {
          if (!error) {
            if (result.length > 0) resolve(result);
            else
              reject({
                status: HttpStatusCode.NOT_FOUND,
                message:
                  'No educational information registered to the system was found.'
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
        `INSERT INTO tblEducationInformation SET ?`,
        values,
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve('Education information registration has taken place.');
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: 'Error while registering education!'
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
        `UPDATE tblEducationInformation SET ? WHERE Id=?`,
        [values, values.Id],
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve('Education information has been updated.');
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message:
                  'An error occurred while updating education information.'
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
        `DELETE FROM tblEducationInformation ${sqlHelper.getWhere(values)}`,
        (error, result) => {
          if (!error) {
            if (result.affectedRows) resolve('Deletion succeeded.');
            else
              reject({
                status: HttpStatusCode.GONE,
                message: 'There is no such education information.'
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

module.exports = EducationInformationTransactions;
