const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.resolve("./public")));

// Socket.io connection
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("user-message", (message) => {
    socket.broadcast.emit("message", message); // Don't send message back to sender
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Start server
server.listen(9000, () => {
  console.log("Server Started at http://localhost:9000");
});
