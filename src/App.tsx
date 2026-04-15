import { useState } from 'react';
import './App.css';
import SetupScreen from './components/SetupScreen';
import Dashboard from './components/Dashboard';
import TransferModal from './components/TransferModal';

interface Player {
  name: string;
  score: number;
}

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [giverIndex, setGiverIndex] = useState<number | null>(null);
  const [receiverIndex, setReceiverIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartGame = (names: string[]) => {
    const initialPlayers = names.map(name => ({
      name,
      score: 0
    }));
    setPlayers(initialPlayers);
    setGameStarted(true);
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
      // Clicked on another player when both selected: swap receiver? 
      // Actually, the plan says "Second click (on different player) sets receiverIndex and opens TransferModal."
      // If we are here, isModalOpen is probably true, but let's be safe.
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

    const newPlayers = [...players];
    newPlayers[giverIndex] = {
      ...newPlayers[giverIndex],
      score: newPlayers[giverIndex].score - amount
    };
    newPlayers[receiverIndex] = {
      ...newPlayers[receiverIndex],
      score: newPlayers[receiverIndex].score + amount
    };

    setPlayers(newPlayers);
    setIsModalOpen(false);
    setGiverIndex(null);
    setReceiverIndex(null);
  };

  return (
    <div className="app-container">
      {!gameStarted ? (
        <SetupScreen onStartGame={handleStartGame} />
      ) : (
        <>
          <Dashboard 
            players={players} 
            giverIndex={giverIndex}
            receiverIndex={receiverIndex}
            onPlayerClick={handlePlayerClick}
            onReset={() => {
              setGameStarted(false);
              setGiverIndex(null);
              setReceiverIndex(null);
            }} 
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
    </div>
  );
}

export default App;
