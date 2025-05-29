export default (sequelize, DataTypes) => {
  const Tol = sequelize.define('Tol', {
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
    tableName: 'tb_tol',
    timestamps: false,
  });

  return Tol;
};
