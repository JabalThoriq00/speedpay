const db = require('../db');

const Transaksi = {
  getAll: callback => {
    db.query('SELECT * FROM tb_transaksi', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM tb_transaksi WHERE id = ?', [id], callback);
  },
  getByUserId: (userId, callback) => {
    db.query('SELECT * FROM tb_transaksi WHERE id_user = ?', [userId], callback);
  }
};

module.exports = Transaksi;
