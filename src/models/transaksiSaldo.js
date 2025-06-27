export default (sequelize, DataTypes) => {
  const TransaksiSaldo = sequelize.define('tb_transaksi_saldo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jenis_transaksi: {
      type: DataTypes.ENUM('TOPUP', 'TARIK', 'BAYAR_TOL'),
      allowNull: false
    },
    jumlah: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    keterangan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_create: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'tb_transaksi_saldo',
    timestamps: false
  });

  return TransaksiSaldo;
};
