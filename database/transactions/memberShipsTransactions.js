const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class PersonalInformationTransactions {
  constructor() {
    this._datacontext = mysqlDataContext.connection();
  }

  listAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `SELECT * FROM tblMemberShips ${sqlHelper.getWhere(
          values
        )} ORDER BY id ASC ${sqlHelper.getLimitOffset(values)}`,
        (error, result) => {
          if (!error) {
            if (result.length > 0) resolve(result);
            else
              reject({
                status: HttpStatusCode.NOT_FOUND,
                message: 'No member ship registered to the system was found.'
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
        `INSERT INTO tblMemberShips SET ?`,
        values,
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve('Member Ships registration has taken place.');
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: 'Error while registering member ships!'
              });
          } else {
            reject(
              error.errno == 1062
                ? {
                    status: HttpStatusCode.CONFLICT,
                    message: 'There is such a member ships.'
                  }
                : {
                    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    message: error.message
                  }
            );
          }
        }
      );
    });
  }

  updateAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `UPDATE tblMemberShips SET ? WHERE Id=?`,
        [values, values.Id],
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve('Member ship information has been updated.');
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message:
                  'An error occurred while updating member ship information.'
              });
          } else {
            reject(
              error.errno == 1062
                ? {
                    status: HttpStatusCode.CONFLICT,
                    message: 'There is such member ship.'
                  }
                : {
                    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    message: error.message
                  }
            );
          }
        }
      );
    });
  }
}

module.exports = PersonalInformationTransactions;
