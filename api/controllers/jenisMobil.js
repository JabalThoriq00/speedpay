const db = require('../api/models');
const JenisMobil = db.JenisMobil;

exports.create = async (req, res) => {
  try {
    const data = await JenisMobil.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await JenisMobil.findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const item = await JenisMobil.findByPk(req.params.id);
    if (item) res.json(item);
    else res.status(404).json({ message: "Data not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await JenisMobil.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedItem = await JenisMobil.findByPk(req.params.id);
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await JenisMobil.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Data deleted" });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
