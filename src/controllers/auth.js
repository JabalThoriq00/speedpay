import db from '../models/index.js'; // pastikan ini sesuai path ke folder models
const User = db.User;

export const controllerLogin = async (req, res) => {
  const { userid, password } = req.body;

  // Validasi input
  if (!userid || !password) {
    return res.status(400).json({ message: 'UserID dan password wajib diisi' });
  }

  try {
    // Cari user berdasarkan userid dan password
    const user = await User.findOne({
      where: {
        userid: userid,
        password: password
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'UserID atau password salah' });
    }

    // Login berhasil
    return res.status(200).json({
      message: 'Login berhasil',
      user
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

export const controllerRegister = async (req, res) => {
  const {
    userid,
    password,
    nama,
    id_jenis_mobil,
    tahun_kendaraan,
    plat_no,
    no_hp,
    email,
    rfid,
    create_by,
    data
  } = req.body;

  // Validasi input wajib
  if (!userid || !password || !nama) {
    return res.status(400).json({ message: 'userid, password, dan nama wajib diisi' });
  }

  try {
    // Cek apakah userid sudah ada
    const existingUser = await User.findOne({ where: { userid } });
    if (existingUser) {
      return res.status(409).json({ message: 'UserID sudah terdaftar' });
    }

    // Simpan user baru
    const newUser = await User.create({
      userid,
      password, // sebaiknya di-hash dengan bcrypt
      nama,
      id_jenis_mobil,
      tahun_kendaraan,
      plat_no,
      no_hp,
      email,
      rfid,
      create_by,
      date_create: new Date(),
      data
    });

    return res.status(201).json({
      message: 'Registrasi berhasil',
      user: newUser
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};
