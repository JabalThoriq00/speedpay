import db from '../models/index.js';
const { Transaksi } = db;

export const postRfidData = (req, res) => {
  const { id_tol, id_user, flag, status } = req.body;

  if (!nama || !jarak || !status) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }

  const savedData = Transaksi.save({ id_tol, id_user, flag, status });
  res.status(201).json({ message: 'Data berhasil disimpan', data: savedData });
};
