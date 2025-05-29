module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transaksi', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_tol: {
      type: DataTypes.INTEGER
    },
    id_user: {
      type: DataTypes.INTEGER
    },
    flag: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    date_create: {
      type: DataTypes.DATE
    },
    data: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'tb_transaksi',
    timestamps: false
  });
};
