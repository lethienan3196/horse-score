import { useState } from 'react';
import './App.css';
import SetupScreen from './components/SetupScreen';

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
        <div className="game-dashboard">
          <header className="game-header">
            <h1>Horse Score</h1>
          </header>
          <main className="player-grid">
            {players.map((player, index) => (
              <div key={index} className="player-card">
                <h2>{player.name}</h2>
                <div className="score-display">{player.score}</div>
              </div>
            ))}
          </main>
          <footer className="game-footer">
            <button onClick={() => setGameStarted(false)}>Reset Game</button>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
