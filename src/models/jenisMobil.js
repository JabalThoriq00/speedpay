export default (sequelize, DataTypes) => {
  const JenisMobil = sequelize.define('JenisMobil', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_merk_mobil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    create_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_create: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    update_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_update: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'tb_jenis_mobil',
    timestamps: false,
  });

  return JenisMobil;
};
