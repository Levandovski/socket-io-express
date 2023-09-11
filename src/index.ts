import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.resolve(__dirname, "..", "public")));

io.on("connection", (socket) => {
  console.log("New Connection", socket.id);
  socket.on("message", (message) => {
    console.log("New Message", message);
    socket.emit("received", `Received message ${message}`);
    // socket.broadcast("");
  });
});

httpServer.listen(3005, () => console.log("Server running", 3005));
