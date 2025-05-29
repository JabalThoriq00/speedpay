import db from '../models/index.js';
const { Log } = db;

export const create = async (req, res) => {
  try {
    const log = await Log.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const log = await Log.findByPk(req.params.id);
    if (log) res.json(log);
    else res.status(404).json({ message: 'Log not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
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

export const deleteData  = async (req, res) => {
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
