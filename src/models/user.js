export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_jenis_mobil: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tahun_kendaraan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    plat_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rfid: {
      type: DataTypes.STRING,
      allowNull: true
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
    tableName: 'tb_user',
    timestamps: false
  });

  return User;
};
