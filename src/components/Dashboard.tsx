import React from 'react';
import './Dashboard.css';
import TransactionLog from './TransactionLog';
import { Transaction } from '../App';

interface Player {
  name: string;
  score: number;
}

interface DashboardProps {
  players: Player[];
  transactions: Transaction[];
  giverIndex: number | null;
  receiverIndex: number | null;
  onPlayerClick: (index: number) => void;
  onEndGame: () => void;
  onManualSetup: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  players, 
  transactions,
  giverIndex, 
  receiverIndex, 
  onPlayerClick, 
  onEndGame,
  onManualSetup
}) => {
  const [showManualOption, setShowManualOption] = React.useState(false);

  React.useEffect(() => {
    if (players.length === 0) {
      const timer = setTimeout(() => {
        setShowManualOption(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowManualOption(false);
    }
  }, [players.length]);

  if (players.length === 0) {
    return (
      <div className="dashboard-container">
        <header className="game-header">
          <h1>🐴 Horse Score</h1>
        </header>
        <main className="dashboard-main loading-container">
          <div className="loading-spinner"></div>
          <h2>Syncing Game Data...</h2>
          <p>Connecting to room and fetching current scores.</p>
          
          {showManualOption && (
            <div className="manual-fallback">
              <p>Still waiting? No one else might be in this room.</p>
              <button onClick={onManualSetup} className="setup-link-button">
                Go Back to Player Setup
              </button>
            </div>
          )}
        </main>
        <footer className="game-footer">
          <button className="end-game-button" onClick={onEndGame}>Cancel Join</button>
        </footer>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="game-header">
        <h1>🐴 Horse Score</h1>
      </header>
      <main className="dashboard-main">
        <div className="player-grid">
          {players.map((player, index) => (
            <div 
              key={index} 
              className={`player-card ${index === giverIndex ? 'giver-selected' : ''} ${index === receiverIndex ? 'receiver-selected' : ''}`}
              onClick={() => onPlayerClick(index)}
            >
              <h2 className="player-name">{player.name}</h2>
              <div className="score-display">{player.score}</div>
            </div>
          ))}
        </div>
        <TransactionLog transactions={transactions} />
      </main>
      <footer className="game-footer">
        <button className="end-game-button" onClick={onEndGame}>End & Save Game</button>
      </footer>
    </div>
  );
};

export default Dashboard;
