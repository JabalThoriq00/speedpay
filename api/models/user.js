module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    userid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING
    },
    nama: {
      type: DataTypes.STRING
    },
    id_jenis_mobil: {
      type: DataTypes.INTEGER
    },
    tahun_kendaraan: {
      type: DataTypes.STRING
    },
    plat_no: {
      type: DataTypes.STRING
    },
    no_hp: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    rfid: {
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
    tableName: 'tb_user',
    timestamps: false
  });
};
