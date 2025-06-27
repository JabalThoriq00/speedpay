export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userid: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING(128), // disarankan hash
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    id_jenis_mobil: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tahun_kendaraan: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    plat_no: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    no_hp: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true
    },
    saldo: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0
    },
    rfid: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    create_by: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    date_create: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    update_by: {
      type: DataTypes.STRING(256),
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
