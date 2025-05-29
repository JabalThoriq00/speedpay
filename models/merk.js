const db = require('../db');

const MerkMobil = {
  getAll: callback => {
    db.query('SELECT * FROM tb_merk_mobil', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM tb_merk_mobil WHERE id = ?', [id], callback);
  }
};

module.exports = MerkMobil;
