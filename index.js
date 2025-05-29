import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./src/config/mysql.js"; // koneksi Sequelize
import router from "./src/routes/route.js"; // import router utama

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router); // semua route dimulai dengan /api

app.all(/.*/, (req, res) => {
  res.status(404).json({ code: 404, message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
