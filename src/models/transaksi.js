export default (sequelize, DataTypes) => {
  const Transaksi = sequelize.define('Transaksi', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_tol: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_create: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tb_transaksi',
    timestamps: false
  });

  return Transaksi;
};
