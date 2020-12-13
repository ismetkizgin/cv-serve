const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class PersonalInformationTransactions {
  constructor() {
    this._datacontext = mysqlDataContext.connection();
  }

  listAsync() {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `SELECT * FROM tblPersonalInformation`,
        (error, result) => {
          if (!error) {
            if (result.length > 0) resolve(result[0]);
            else
              reject({
                status: HttpStatusCode.NOT_FOUND,
                message:
                  'No personel information registered to the system was found.'
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
        `UPDATE tblPersonalInformation SET ?`,
        [values],
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve('Personel information information has been updated.');
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message:
                  'An error occurred while updating personal information.'
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

module.exports = PersonalInformationTransactions;
