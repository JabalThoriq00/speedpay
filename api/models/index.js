const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Optional: untuk nonaktifkan log query SQL
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
