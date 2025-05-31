import db from '../models/index.js';
const {Tol} = db;

export const create = async (req, res) => {
  try {
    const result = await Tol.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const data = await Tol.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const data = await Tol.findByPk(req.params.id);
    if (data) res.json(data.nama);
    else res.status(404).json({ message: "Data not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const [updated] = await Tol.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedData = await Tol.findByPk(req.params.id);
      res.json(updatedData);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteData  = async (req, res) => {
  try {
    const deleted = await Tol.destroy({
      where: { id: req.params.id }
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
