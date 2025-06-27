import { Server } from "socket.io";

let ioInstance;
const userSockets = new Map();

export const initSocketIO = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("✅ Socket terhubung:", socket.id);

    socket.on("register", (userid) => {
      userSockets.set(userid, socket);
      console.log(`📌 User terdaftar: ${userid}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
      for (const [userid, sock] of userSockets.entries()) {
        if (sock.id === socket.id) {
          userSockets.delete(userid);
          break;
        }
      }
    });
  });
};

export const notifyUserSaldo = (userid, payload) => {
  const socket = userSockets.get(userid);
  if (socket) {
    socket.emit("saldoUpdate", payload);
    console.log(`📤 Notifikasi saldo ke ${userid}:`, payload);
  } else {
    console.log(`⚠️ User ${userid} belum terhubung ke WebSocket`);
  }
};
