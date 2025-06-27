import db from '../models/index.js';

const { User: UserModel, JenisMobil: JenisMobilModel, TransaksiSaldo: TransaksiSaldoModel } = db;

// ✅ Cek Saldo
export const cekSaldo = async (req, res) => {
  const { userid } = req.params;
  try {
    const user = await UserModel.findByPk(userid);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    res.json({ userid: user.userid, saldo: user.saldo });
  } catch (err) {
    console.error('Cek Saldo Error:', err);
    res.status(500).json({ message: 'Terjadi kesalahan saat cek saldo' });
  }
};

// ✅ Top Up Saldo
export const topUp = async (req, res) => {
  const { userid, jumlah, keterangan } = req.body;

  try {
    const user = await UserModel.findByPk(userid);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const nominal = parseFloat(jumlah);
    if (isNaN(nominal) || nominal <= 0) {
      return res.status(400).json({ message: 'Jumlah tidak valid' });
    }

    user.saldo = parseFloat(user.saldo) + nominal;
    await user.save();

    await TransaksiSaldoModel.create({
      userid,
      jenis_transaksi: 'TOPUP',
      jumlah: nominal,
      keterangan
    });

    res.json({ message: 'Top up berhasil', saldo: user.saldo });
  } catch (err) {
    console.error('Top Up Error:', err);
    res.status(500).json({ message: 'Terjadi kesalahan saat top up' });
  }
};

// ✅ Tarik Saldo Berdasarkan Golongan
export const tarikSaldoBerdasarkanGolongan = async (req, res) => {
  const { userid } = req.body;

  try {
    const user = await UserModel.findByPk(userid);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    const jenisMobil = await JenisMobilModel.findByPk(user.id_jenis_mobil);
    if (!jenisMobil) return res.status(404).json({ message: 'Jenis mobil tidak ditemukan' });

    // Tarif berdasarkan golongan
    const tarifPerGolongan = {
      "Golongan I": 10000,
      "Golongan II": 15000,
      "Golongan III": 20000,
      "Golongan IV": 25000
    };

    const biaya = tarifPerGolongan[jenisMobil.nama];
    if (!biaya) return res.status(400).json({ message: 'Golongan tidak dikenali' });

    if (parseFloat(user.saldo) < biaya) {
      return res.status(400).json({ message: 'Saldo tidak mencukupi' });
    }

    user.saldo = parseFloat(user.saldo) - biaya;
    await user.save();

    await TransaksiSaldoModel.create({
      userid,
      jenis_transaksi: 'TARIK',
      jumlah: -biaya,
      keterangan: `Tarik saldo - ${jenisMobil.nama}`
    });

    res.json({ message: 'Saldo berhasil ditarik', saldo_akhir: user.saldo });

  } catch (err) {
    console.error('Tarik Saldo Error:', err);
    res.status(500).json({ message: 'Gagal melakukan penarikan saldo' });
  }
};
