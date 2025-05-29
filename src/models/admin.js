export default (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    userid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    create_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_create: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    update_by: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_update: {
      type: DataTypes.DATE,
      allowNull: true
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tb_admin',
    timestamps: false // disable auto createdAt / updatedAt
  });

  return Admin;
};
