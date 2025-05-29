const db = require('../api/models');
const Log = db.Log;

exports.create = async (req, res) => {
  try {
    const log = await Log.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const log = await Log.findByPk(req.params.id);
    if (log) res.json(log);
    else res.status(404).json({ message: 'Log not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Log.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedLog = await Log.findByPk(req.params.id);
      res.json(updatedLog);
    } else {
      res.status(404).json({ message: 'Log not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Log.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Log deleted' });
    } else {
      res.status(404).json({ message: 'Log not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
