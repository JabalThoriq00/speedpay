const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'u864324480_speedpay', // database
  'u864324480_speedpay', // username
  'Speedpay123',          // password
  {
    host: '153.92.15.23',
    dialect: 'mysql',
    logging: false, // Nonaktifkan log query SQL
  }
);

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
