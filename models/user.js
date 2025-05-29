const db = require('../db');

const User = {
  getAll: callback => {
    db.query('SELECT * FROM tb_user', callback);
  },
  getById: (userid, callback) => {
    db.query('SELECT * FROM tb_user WHERE userid = ?', [userid], callback);
  }
};

module.exports = User;
