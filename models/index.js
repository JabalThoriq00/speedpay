const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Admin = require('./admin')(sequelize, Sequelize);
db.JenisMobil = require('./jenisMobil')(sequelize, Sequelize);
db.Log = require('./log')(sequelize, Sequelize);
db.Tol = require('./tol')(sequelize, Sequelize);
db.Transaksi = require('./transaksi')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.MerkMobil = require('./merk')(sequelize, Sequelize);

module.exports = db;
