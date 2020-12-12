const { mysqlDataContext } = require("../dataContexts");
const HttpStatusCode = require("http-status-codes");
const { sqlHelper } = require("../../utils");

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
                message: "No project registered to the system was found.",
              });
          } else {
            reject({
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
              message: error.message,
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
              resolve("Project information has been updated.");
            else
              reject({
                status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message:
                  "An error occurred while updating project information.",
              });
          } else {
            reject(
              error.errno == 1062
                ? {
                    status: HttpStatusCode.CONFLICT,
                    message: "There is such Project.",
                  }
                : {
                    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    message: error.message,
                  }
            );
          }
        }
      );
    });
  }
}

module.exports = PersonalInformationTransactions;
