export default (sequelize, DataTypes) => {
  const MerkMobil = sequelize.define('MerkMobil', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: 'tb_merk_mobil',
    timestamps: false,
  });

  return MerkMobil;
};
