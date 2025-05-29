module.exports = (sequelize, DataTypes) => {
  return sequelize.define('jenis_mobil', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_merk_mobil: {
      type: DataTypes.INTEGER,
    },
    nama: {
      type: DataTypes.STRING,
    },
    create_by: {
      type: DataTypes.STRING,
    },
    date_create: {
      type: DataTypes.DATE,
    },
    update_by: {
      type: DataTypes.STRING,
    },
    date_update: {
      type: DataTypes.DATE,
    },
    data: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'tb_jenis_mobil',
    timestamps: false,
  });
};
