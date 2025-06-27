import { Sequelize } from 'sequelize';
import sequelize from '../config/mysql.js';

import AdminModel from './admin.js';
import JenisMobilModel from './jenisMobil.js';
import LogModel from './log.js';
import TolModel from './tol.js';
import TransaksiModel from './transaksi.js';
import UserModel from './user.js';
import MerkModel from './merk.js';
import TransaksiSaldoModel from './transaksiSaldo.js';

const db = {
  Sequelize,
  sequelize,
  Admin: AdminModel(sequelize, Sequelize),
  JenisMobil: JenisMobilModel(sequelize, Sequelize),
  Log: LogModel(sequelize, Sequelize),
  Tol: TolModel(sequelize, Sequelize),
  Transaksi: TransaksiModel(sequelize, Sequelize),
  User: UserModel(sequelize, Sequelize),
  MerkMobil: MerkModel(sequelize, Sequelize),
  TransaksiSaldo: TransaksiSaldoModel(sequelize, Sequelize),
};

export default db;
