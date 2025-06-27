import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import http from "http"; // ⬅️ Tambahan
import { Server as SocketIO } from "socket.io"; // ⬅️ Tambahan

import "./src/config/mysql.js";
import router from "./src/routes/route.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // Gunakan http.Server
const io = new SocketIO(server, {
  cors: { origin: "*" } // Izinkan semua origin
});
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// Swagger (opsional)
// const swaggerDocument = YAML.load("./post-man/swagger.yaml");
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Not Found handler
app.all(/.*/, (req, res) => {
  res.status(404).json({ code: 404, message: "Not Found" });
});

// ======================
// 🟢 WebSocket Logic
// ======================
const userSockets = new Map();

io.on("connection", (socket) => {
  console.log("✅ Socket terhubung:", socket.id);

  // Daftarkan userId ke socket
  socket.on("register", (userid) => {
    userSockets.set(userid, socket);
    console.log(`📌 User terdaftar: ${userid}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
    for (const [userid, sock] of userSockets) {
      if (sock.id === socket.id) {
        userSockets.delete(userid);
        break;
      }
    }
  });
});

// Fungsi untuk broadcast saldo update
export const notifyUserSaldo = (userid, payload) => {
  const socket = userSockets.get(userid);
  if (socket) {
    socket.emit("saldoUpdate", payload);
    console.log(`📤 Saldo update dikirim ke ${userid}:`, payload);
  } else {
    console.log(`⚠️ User ${userid} tidak aktif di WebSocket`);
  }
};

// ======================
// Jalankan server
// ======================
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
