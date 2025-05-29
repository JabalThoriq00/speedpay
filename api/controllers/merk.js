const db = require('../api/models');
const MerkMobil = db.MerkMobil;

exports.create = async (req, res) => {
  try {
    const result = await MerkMobil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await MerkMobil.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const data = await MerkMobil.findByPk(req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: 'Data not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await MerkMobil.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedData = await MerkMobil.findByPk(req.params.id);
      res.json(updatedData);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await MerkMobil.destroy({
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
