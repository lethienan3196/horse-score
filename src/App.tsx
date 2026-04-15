import { useState } from 'react';
import './App.css';
import SetupScreen from './components/SetupScreen';
import Dashboard from './components/Dashboard';

interface Player {
  name: string;
  score: number;
}

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = (names: string[]) => {
    const initialPlayers = names.map(name => ({
      name,
      score: 0
    }));
    setPlayers(initialPlayers);
    setGameStarted(true);
  };

  return (
    <div className="app-container">
      {!gameStarted ? (
        <SetupScreen onStartGame={handleStartGame} />
      ) : (
        <Dashboard 
          players={players} 
          onReset={() => setGameStarted(false)} 
        />
      )}
    </div>
  );
}

export default App;
