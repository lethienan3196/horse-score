import { useState, useEffect, useCallback } from 'react';
import './App.css';
import SetupScreen from './components/SetupScreen';
import Dashboard from './components/Dashboard';
import TransferModal from './components/TransferModal';
import HistoryScreen from './components/HistoryScreen';
import { useSocket } from './hooks/useSocket';

interface Player {
  name: string;
  score: number;
}

export interface Transaction {
  id: string;
  giverName: string;
  receiverName: string;
  amount: number;
  timestamp: number;
}

export interface ArchivedGame {
  id: string;
  players: Player[];
  timestamp: number;
}

const STORAGE_KEY = 'horse-score-state';

function App() {
  const [roomId, setRoomId] = useState<string | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.roomId || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const { socket, isConnected, emitTransfer, emitSyncState, requestSync } = useSocket(roomId);

  const [history, setHistory] = useState<ArchivedGame[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.history || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [players, setPlayers] = useState<Player[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.players || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.transactions || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [gameStarted, setGameStarted] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.gameStarted || false;
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const [view, setView] = useState<'setup' | 'game' | 'history'>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.gameStarted) return 'game';
        return parsed.currentView || 'setup';
      } catch (e) {
        return 'setup';
      }
    }
    return 'setup';
  });

  const [giverIndex, setGiverIndex] = useState<number | null>(null);
  const [receiverIndex, setReceiverIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Save state on change
  useEffect(() => {
    const stateToSave = {
      history,
      players,
      transactions,
      gameStarted,
      currentView: view,
      roomId
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [history, players, transactions, gameStarted, view, roomId]);

  // Handle socket events
  useEffect(() => {
    if (!socket) return;

    socket.on('transfer-received', (transfer: Transaction) => {
      // Avoid duplicate transactions if they have the same ID
      setTransactions(prev => {
        if (prev.some(t => t.id === transfer.id)) return prev;
        
        // Apply scores
        setPlayers(currentPlayers => {
          const newPlayers = [...currentPlayers];
          const giverIdx = newPlayers.findIndex(p => p.name === transfer.giverName);
          const receiverIdx = newPlayers.findIndex(p => p.name === transfer.receiverName);
          
          if (giverIdx !== -1) {
            newPlayers[giverIdx] = {
              ...newPlayers[giverIdx],
              score: newPlayers[giverIdx].score + transfer.amount
            };
          }
          
          if (receiverIdx !== -1) {
            newPlayers[receiverIdx] = {
              ...newPlayers[receiverIdx],
              score: newPlayers[receiverIdx].score - transfer.amount
            };
          }
          
          return newPlayers;
        });

        return [transfer, ...prev];
      });
    });

    socket.on('request-state', () => {
      // Send current state to the room
      emitSyncState({
        players,
        transactions,
        gameStarted
      });
    });

    socket.on('state-synced', (state: any) => {
      // Update state if we don't have a game started or if we're joining
      if (!gameStarted || players.length === 0) {
        setPlayers(state.players);
        setTransactions(state.transactions);
        setGameStarted(state.gameStarted);
        if (state.gameStarted) setView('game');
      }
    });

    socket.on('user-joined', () => {
      // When someone joins, send them the state
      emitSyncState({
        players,
        transactions,
        gameStarted
      });
    });

    return () => {
      socket.off('transfer-received');
      socket.off('request-state');
      socket.off('state-synced');
      socket.off('user-joined');
    };
  }, [socket, players, transactions, gameStarted, emitSyncState]);

  // Request initial sync when connecting
  useEffect(() => {
    if (isConnected && roomId && gameStarted && players.length === 0) {
      requestSync();
    }
  }, [isConnected, roomId, gameStarted, players.length, requestSync]);

  const handleStartGame = (names: string[], newRoomId: string) => {
    const initialPlayers = names.map(name => ({
      name,
      score: 0
    }));
    setPlayers(initialPlayers);
    setTransactions([]);
    setGameStarted(true);
    setRoomId(newRoomId);
    setView('game');
  };

  const handleEndGame = () => {
    if (players.length > 0) {
      const archivedGame: ArchivedGame = {
        id: crypto.randomUUID(),
        players: [...players],
        timestamp: Date.now()
      };
      setHistory(prev => [archivedGame, ...prev]);
    }
    
    setGameStarted(false);
    setPlayers([]);
    setTransactions([]);
    setGiverIndex(null);
    setReceiverIndex(null);
    setRoomId(null);
    setView('setup');
  };

  const handlePlayerClick = (index: number) => {
    if (giverIndex === null) {
      // First click: select giver
      setGiverIndex(index);
    } else if (giverIndex === index) {
      // Clicked on giver again: deselect
      setGiverIndex(null);
    } else if (receiverIndex === null) {
      // Second click: select receiver and open modal
      setReceiverIndex(index);
      setIsModalOpen(true);
    } else if (receiverIndex === index) {
      // Clicked on receiver: deselect
      setReceiverIndex(null);
    } else {
      setReceiverIndex(index);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReceiverIndex(null);
  };

  const performTransfer = (amount: number) => {
    if (giverIndex === null || receiverIndex === null) return;

    const giver = players[giverIndex];
    const receiver = players[receiverIndex];

    const newPlayers = [...players];
    newPlayers[giverIndex] = {
      ...newPlayers[giverIndex],
      score: newPlayers[giverIndex].score + amount
    };
    newPlayers[receiverIndex] = {
      ...newPlayers[receiverIndex],
      score: newPlayers[receiverIndex].score - amount
    };

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      giverName: giver.name,
      receiverName: receiver.name,
      amount: amount,
      timestamp: Date.now(),
    };

    setPlayers(newPlayers);
    setTransactions(prev => [newTransaction, ...prev]);
    setIsModalOpen(false);
    setGiverIndex(null);
    setReceiverIndex(null);

    // Sync via socket
    emitTransfer(newTransaction);
  };

  return (
    <div className="app-container">
      {view === 'setup' && (
        <SetupScreen 
          onStartGame={handleStartGame} 
          onViewHistory={() => setView('history')} 
        />
      )}
      
      {view === 'game' && (
        <>
          <Dashboard 
            players={players} 
            transactions={transactions}
            giverIndex={giverIndex}
            receiverIndex={receiverIndex}
            onPlayerClick={handlePlayerClick}
            onEndGame={handleEndGame}
          />
          {isModalOpen && giverIndex !== null && receiverIndex !== null && (
            <TransferModal
              giverName={players[giverIndex].name}
              receiverName={players[receiverIndex].name}
              onTransfer={performTransfer}
              onCancel={handleCloseModal}
            />
          )}
        </>
      )}

      {view === 'history' && (
        <HistoryScreen 
          history={history} 
          onBack={() => setView('setup')} 
        />
      )}
    </div>
  );
}

export default App;
