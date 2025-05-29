const express = require('express');
const router = express.Router();
const controllerAdmin = require('../controllers/admin');
const controllerJenisMobil = require('../controllers/jenisMobil');
const controllerLog = require('../controllers/log');
const controllerTol = require('../controllers/tol');
const controllerTransaksi = require('../controllers/transaksi');
const controllerUser = require('../controllers/user');
const controllerMerk = require('../controllers/merk');

router.post('/merk', controllerMerk.create);
router.get('/merk', controllerMerk.findAll);
router.get('/merk/:id', controllerMerk.findOne);
router.put('/merk/:id', controllerMerk.update);
router.delete('/merk/:id', controllerMerk.delete);

router.post('/user', controllerUser.create);
router.get('/user', controllerUser.findAll);
router.get('/user/:userid', controllerUser.findOne);
router.put('/user/:userid', controllerUser.update);
router.delete('/user/:userid', controllerUser.delete);

router.post('/transaksi', controllerTransaksi.create);
router.get('/transaksi', controllerTransaksi.findAll);
router.get('/transaksi/:id', controllerTransaksi.findOne);
router.put('/transaksi/:id', controllerTransaksi.update);
router.delete('/transaksi/:id', controllerTransaksi.delete);

router.post('/tol', controllerTol.create);
router.get('/tol', controllerTol.findAll);
router.get('/tol/:id', controllerTol.findOne);
router.put('/tol/:id', controllerTol.update);
router.delete('/tol/:id', controllerTol.delete);

router.post('/admin', controllerAdmin.create);
router.get('/admin', controllerAdmin.findAll);
router.get('/admin/:id', controllerAdmin.findOne);
router.put('/admin/:id', controllerAdmin.update);
router.delete('/admin/:id', controllerAdmin.delete);

router.post('/mobil', controllerJenisMobil.create);
router.get('/mobil', controllerJenisMobil.findAll);
router.get('/mobil/:userid', controllerJenisMobil.findOne);
router.put('/mobil/:userid', controllerJenisMobil.update);
router.delete('/mobil/:userid', controllerJenisMobil.delete);

router.post('/log', controllerLog.create);
router.get('/log', controllerLog.findAll);
router.get('/log/:id', controllerLog.findOne);
router.put('/log/:id', controllerLog.update);
router.delete('/log/:id', controllerLog.delete);

module.exports = router;