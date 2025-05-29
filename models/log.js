module.exports = (sequelize, DataTypes) => {
  return sequelize.define('log', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    action: {
      type: DataTypes.STRING
    },
    request: {
      type: DataTypes.TEXT
    },
    response: {
      type: DataTypes.TEXT
    },
    date_create: {
      type: DataTypes.DATE
    },
    data: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'tb_log',
    timestamps: false
  });
};
