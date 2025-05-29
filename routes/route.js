const express = require('express');
const router = express.Router();
const controllerAdmin = require('../controllers/admin');
const controllerJenisMobil = require('../controllers/jenisMobil');

router.post('/admin', controllerAdmin.create);
router.get('/admin', controllerAdmin.findAll);
router.get('/admin/:id', controllerAdmin.findOne);
router.put('/admin/:id', controllerAdmin.update);
router.delete('/admin/:id', controllerAdmin.delete);

router.post('/mobil', controllerJenisMobil.create);
router.get('/mobil/', controllerJenisMobil.findAll);
router.get('/mobil/:userid', controllerJenisMobil.findOne);
router.put('/mobil/:userid', controllerJenisMobil.update);
router.delete('/mobil/:userid', controllerJenisMobil.delete);

module.exports = router;