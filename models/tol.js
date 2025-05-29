module.exports = (sequelize, DataTypes) => {
  return sequelize.define('tol', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING
    },
    create_by: {
      type: DataTypes.STRING
    },
    date_create: {
      type: DataTypes.DATE
    },
    update_by: {
      type: DataTypes.STRING
    },
    date_update: {
      type: DataTypes.DATE
    },
    data: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'tb_tol',
    timestamps: false
  });
};
