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
db.User = require('./admin')(sequelize, Sequelize);
db.JenisMobil = require('./jenisMobil')(sequelize, Sequelize);
db.Admin = require('./jenisMobil')(sequelize, Sequelize);

module.exports = db;
