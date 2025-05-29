const db = require('../db');

const Tol = {
  getAll: callback => {
    db.query('SELECT * FROM tb_tol', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM tb_tol WHERE id = ?', [id], callback);
  }
};

module.exports = Tol;
