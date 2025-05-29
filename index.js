import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url"; // untuk __dirname di ES Module

import "./src/config/mysql.js"; // koneksi Sequelize
import router from "./src/routes/route.js"; // import router utama

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Konversi __dirname di ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Swagger setup
const swaggerPath = path.resolve(__dirname, "post-man", "swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router); // semua route dimulai dengan /api

// Middleware 404
app.all("*", (req, res) => {
  res.status(404).json({ code: 404, message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
