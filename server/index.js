import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
    
    // Notify others in the room
    socket.to(roomId).emit('user-joined', socket.id);
  });

  socket.on('transfer-update', (data) => {
    const { roomId, transfer } = data;
    console.log(`Transfer update in room ${roomId}:`, transfer);
    // Relay the transfer update to everyone else in the room
    socket.to(roomId).emit('transfer-received', transfer);
  });

  socket.on('sync-state', (data) => {
    const { roomId, state } = data;
    console.log(`State sync in room ${roomId} from ${socket.id}`);
    // This is used for initial sync when a new user joins
    socket.to(roomId).emit('state-synced', state);
  });

  socket.on('request-sync', (roomId) => {
    console.log(`User ${socket.id} requested sync for room: ${roomId}`);
    // Ask others in the room for their state
    socket.to(roomId).emit('request-state', socket.id);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
