# Phase 6: Real-time Multiplayer Sync

## Overview
Moving from a single-device local app to a multi-device synchronized experience. This requires a backend server to relay WebSocket messages between players in a session.

## Requirements
- **SYNC-01**: A server-side relay for WebSocket messages.
- **SYNC-02**: Session management to group 4 players together.
- **SYNC-03**: Real-time score and transaction synchronization.

## Strategy
1. **Infrastructure**: Choose a WebSocket provider (e.g., Socket.io, Pusher, or a custom Node.js server).
2. **Session Logic**: Implement a "Join Game" flow where players enter a room ID.
3. **State Sync**: Relay `performTransfer` events to all clients in the same room.
4. **Resilience**: Handle reconnections and state re-syncing if a device goes offline.

## Progress
- [ ] 06-01-PLAN.md: WebSocket Integration & Session Management
