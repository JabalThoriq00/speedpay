import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import http from "http";

import "./src/config/mysql.js";
import router from "./src/routes/route.js";
import { initSocketIO } from "./src/socket.js"; // ✅ Import socket initializer

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// ✅ Inisialisasi WebSocket
initSocketIO(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// Swagger opsional
// const swaggerDocument = YAML.load("./post-man/swagger.yaml");
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Not Found handler
app.all(/.*/, (req, res) => {
  res.status(404).json({ code: 404, message: "Not Found" });
});

// Jalankan server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
