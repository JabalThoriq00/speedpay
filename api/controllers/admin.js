const db = require('../api/models');
const Admin = db.Admin;

exports.create = async (req, res) => {
  try {
    const newAdmin = await Admin.create(req.body);
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.userid);
    if (admin) res.json(admin);
    else res.status(404).json({ message: "Admin not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Admin.update(req.body, {
      where: { userid: req.params.userid },
    });
    if (updated) {
      const updatedAdmin = await Admin.findByPk(req.params.userid);
      res.json(updatedAdmin);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Admin.destroy({
      where: { userid: req.params.userid },
    });
    if (deleted) {
      res.json({ message: "Admin deleted" });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
