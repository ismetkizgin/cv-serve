const { mysqlDataContext } = require('../dataContexts');
const HttpStatusCode = require('http-status-codes');
const { sqlHelper } = require('../../utils');

class DocumentationTransactions {
  constructor() {
    this._datacontext = mysqlDataContext.connection();
  }

  listAsync(values) {
    return new Promise((resolve, reject) => {
      this._datacontext.query(
        `SELECT * FROM tblDocumentation ${sqlHelper.getWhere(
          values
        )} ORDER BY id ASC ${sqlHelper.getLimitOffset(values)}`,
        (error, result) => {
          if (!error) {
            if (result.length > 0) resolve(result);
            else
              reject({
                status: HttpStatusCode.NOT_FOUND,
                message: 'No documentation registered to the system was found.'
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
        `INSERT INTO tblDocumentation SET ?`,
        values,
        (error, result) => {
          if (!error) {
            if (result.affectedRows)
              resolve('Documentation registration has taken place.');
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: 'Error while registering documentation!'
              });
          } else {
            reject(
              error.errno == 1062
                ? {
                    status: HttpStatusCode.CONFLICT,
                    message: 'There is such a documentation.'
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

module.exports = DocumentationTransactions;
