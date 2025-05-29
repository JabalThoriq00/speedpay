module.exports = (sequelize, DataTypes) => {
  return sequelize.define("admin", {
    userid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
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
    }
  }, {
    tableName: 'tb_admin',
    timestamps: false,
  });
};
