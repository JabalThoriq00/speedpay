import db from "../models/index.js";
import { notifyUserSaldo } from "../socket.js";

const {
  User: UserModel,
  JenisMobil: JenisMobilModel,
  TransaksiSaldo: TransaksiSaldoModel,
} = db;
const rfidStatusMap = new Map();

// ✅ Cek Saldo
export const cekSaldo = async (req, res) => {
  const { userid } = req.params;
  try {
    const user = await UserModel.findByPk(userid);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    res.json({ userid: user.userid, saldo: user.saldo });
  } catch (err) {
    console.error("Cek Saldo Error:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat cek saldo" });
  }
};

// ✅ Top Up (dengan trigger)
export const topUp = async (req, res) => {
  const { userid, jumlah, keterangan } = req.body;

  try {
    const user = await UserModel.findByPk(userid);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const nominal = parseFloat(jumlah);
    if (isNaN(nominal) || nominal <= 0) {
      return res.status(400).json({ message: "Jumlah tidak valid" });
    }

    // ⛔ Tidak perlu update saldo manual
    await TransaksiSaldoModel.create({
      userid,
      jenis_transaksi: "TOPUP",
      jumlah: nominal,
      keterangan,
    });

    // ✅ Ambil saldo terbaru
    const updatedUser = await UserModel.findByPk(userid);

    res.json({ message: "Top up berhasil", saldo: updatedUser.saldo });
  } catch (err) {
    console.error("Top Up Error:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat top up" });
  }
};


export const tarikSaldoBerdasarkanGolongan = async (req, res) => {
  const { rfid } = req.body;

  if (!rfid) {
    return res.status(400).json({ message: "RFID wajib diisi" });
  }

  try {
    const user = await UserModel.findOne({ where: { rfid } });
    if (!user) {
      return res.status(404).json({ message: "User dengan RFID ini tidak ditemukan" });
    }

    const jenisMobil = await JenisMobilModel.findByPk(user.id_jenis_mobil);
    if (!jenisMobil) {
      return res.status(404).json({ message: "Jenis mobil tidak ditemukan" });
    }

    const tarifPerGolongan = {
      "Golongan I": 10000,
      "Golongan II": 15000,
      "Golongan III": 20000,
      "Golongan IV": 25000,
    };

    const biaya = tarifPerGolongan[jenisMobil.nama];
    if (biaya === undefined) {
      return res.status(400).json({ message: `Golongan '${jenisMobil.nama}' tidak dikenali` });
    }

    const lastStatus = rfidStatusMap.get(rfid);

    if (lastStatus !== "MASUK") {
      // TAP IN: Hanya catat transaksi, tidak kurangi saldo
      await TransaksiSaldoModel.create({
        userid: user.userid,
        jenis_transaksi: "TAP_IN",
        jumlah: 0,
        keterangan: `Masuk - ${jenisMobil.nama}`,
      });

      rfidStatusMap.set(rfid, "MASUK");

      notifyUserSaldo(user.userid, {
        saldo: user.saldo, // saldo tetap
        message: `Kendaraan Anda (${jenisMobil.nama}) telah masuk.`
      });

      return res.status(200).json({
        Status: "OK",
        message: "RFID terdeteksi sebagai MASUK. Transaksi dicatat tanpa pemotongan saldo.",
      });
    }

    // TAP OUT: Kurangi saldo
    const saldo = parseFloat(user.saldo);
    if (isNaN(saldo)) {
      return res.status(400).json({ message: "Saldo user tidak valid" });
    }

    if (saldo < biaya) {
      notifyUserSaldo(user.userid, {
        saldo: user.saldo, // saldo tetap
        message: `Saldo anda tidak mencukupi.`
      });
      return res.status(400).json({ message: "Saldo tidak mencukupi" });
    }

    await TransaksiSaldoModel.create({
      userid: user.userid,
      jenis_transaksi: "TARIK",
      jumlah: -biaya,
      keterangan: `Keluar - ${jenisMobil.nama}`,
    });

    rfidStatusMap.set(rfid, "KELUAR");

    const updatedUser = await UserModel.findByPk(user.userid);

    notifyUserSaldo(user.userid, {
      saldo: updatedUser?.saldo ?? "0",
      message: `Saldo berhasil ditarik sebesar Rp ${biaya}`,
    });

    return res.status(200).json({
      Status: "OK",
      message: "Saldo berhasil ditarik dan dianggap KELUAR",
      jumlah_ditarik: biaya,
      saldo_akhir: parseFloat(updatedUser?.saldo ?? "0"),
    });
  } catch (err) {
    console.error("Tarik Saldo Error:", err.message);
    return res.status(500).json({ message: "Gagal melakukan proses tap" });
  }
};

export const riwayatTransaksi = async (req, res) => {
  const { userid } = req.params;

  try {
    const transaksi = await TransaksiSaldoModel.findAll({
      where: { userid },
      order: [["date_create", "DESC"]],
    });

    if (transaksi.length === 0) {
      return res.status(404).json({ message: "Belum ada transaksi" });
    }

    res.json(transaksi);
  } catch (err) {
    console.error("Riwayat Transaksi Error:", err);
    res.status(500).json({ message: "Gagal mengambil data transaksi" });
  }
};
