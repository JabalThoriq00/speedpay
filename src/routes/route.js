import express from 'express';

import { controllerLogin, controllerRegister } from '../controllers/auth.js';
import { postRfidData } from '../controllers/rfid.js';

import {
  create as createAdmin,
  findAll as findAllAdmin,
  findOne as findOneAdmin,
  update as updateAdmin,
  deleteData as deleteAdmin,
} from '../controllers/admin.js';

import {
  create as createJenisMobil,
  findAll as findAllJenisMobil,
  findOne as findOneJenisMobil,
  update as updateJenisMobil,
  deleteData as deleteJenisMobil,
} from '../controllers/jenisMobil.js';

import {
  create as createLog,
  findAll as findAllLog,
  findOne as findOneLog,
  update as updateLog,
  deleteData as deleteLog,
} from '../controllers/log.js';

import {
  create as createTol,
  findAll as findAllTol,
  findOne as findOneTol,
  update as updateTol,
  deleteData as deleteTol,
} from '../controllers/tol.js';

import {
  create as createTransaksi,
  findAll as findAllTransaksi,
  findOne as findOneTransaksi,
  update as updateTransaksi,
  deleteData as deleteTransaksi,
} from '../controllers/transaksi.js';

import {
  create as createUser,
  findAll as findAllUser,
  findOne as findOneUser,
  update as updateUser,
  deleteData as deleteUser,
} from '../controllers/user.js';

import {
  create as createMerk,
  findAll as findAllMerk,
  findOne as findOneMerk,
  update as updateMerk,
  deleteData as deleteMerk,
} from '../controllers/merk.js';

import {
  cekSaldo,
  topUp,
  tarikSaldoBerdasarkanGolongan,
  riwayatTransaksi
} from '../controllers/saldoController.js';

const router = express.Router();

// Merk
router.post('/merk', createMerk);
router.get('/merk', findAllMerk);
router.get('/merk/:id', findOneMerk);
router.put('/merk/:id', updateMerk);
router.delete('/merk/:id', deleteMerk);

// User
router.post('/user', createUser);
router.get('/user', findAllUser);
router.get('/user/:userid', findOneUser);
router.put('/user/:userid', updateUser);
router.delete('/user/:userid', deleteUser);

// Transaksi
router.post('/transaksi', createTransaksi);
router.get('/transaksi', findAllTransaksi);
router.get('/transaksi/:id', findOneTransaksi);
router.put('/transaksi/:id', updateTransaksi);
router.delete('/transaksi/:id', deleteTransaksi);

// Tol
router.post('/tol', createTol);
router.get('/tol', findAllTol);
router.get('/tol/:id', findOneTol);
router.put('/tol/:id', updateTol);
router.delete('/tol/:id', deleteTol);

// Admin
router.post('/admin', createAdmin);
router.get('/admin', findAllAdmin);
router.get('/admin/:id', findOneAdmin);
router.put('/admin/:id', updateAdmin);
router.delete('/admin/:id', deleteAdmin);

// Jenis Mobil
router.post('/mobil', createJenisMobil);
router.get('/mobil', findAllJenisMobil);
router.get('/mobil/:id', findOneJenisMobil);
router.put('/mobil/:id', updateJenisMobil);
router.delete('/mobil/:id', deleteJenisMobil);

// Log
router.post('/log', createLog);
router.get('/log', findAllLog);
router.get('/log/:id', findOneLog);
router.put('/log/:id', updateLog);
router.delete('/log/:id', deleteLog);

router.post('/login', controllerLogin);
router.post('/register', controllerRegister);
router.post('/rfid', postRfidData);

router.get('/saldo/:userid', cekSaldo);
router.post('/topup', topUp);
router.post('/tarik', tarikSaldoBerdasarkanGolongan);
router.get('/transaksi-saldo/:userid', riwayatTransaksi);
export default router;
