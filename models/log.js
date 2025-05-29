const db = require('../db');

const Log = {
  getAll: callback => {
    db.query('SELECT * FROM tb_log', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM tb_log WHERE id = ?', [id], callback);
  }
};

module.exports = Log;
