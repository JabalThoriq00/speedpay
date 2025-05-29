import db from '../models/index.js';
const {Transaksi} = db;

export const create = async (req, res) => {
  try {
    const transaksi = await Transaksi.create(req.body);
    res.status(201).json(transaksi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const transaksi = await Transaksi.findAll();
    res.json(transaksi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const transaksi = await Transaksi.findByPk(req.params.id);
    if (transaksi) res.json(transaksi);
    else res.status(404).json({ message: 'Data not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const [updated] = await Transaksi.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTransaksi = await Transaksi.findByPk(req.params.id);
      res.json(updatedTransaksi);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteData  = async (req, res) => {
  try {
    const deleted = await Transaksi.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Data deleted' });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
