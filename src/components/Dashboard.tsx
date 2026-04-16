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
  currentPlayerName: string | null;
  onSelectIdentity: (name: string) => void;
  onPlayerClick: (index: number) => void;
  onSaveGame: () => void;
  onResetGame: () => void;
  onManualSetup: () => void;
  onViewHistory: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  players, 
  transactions,
  giverIndex, 
  receiverIndex, 
  currentPlayerName,
  onSelectIdentity,
  onPlayerClick, 
  onSaveGame,
  onResetGame,
  onManualSetup,
  onViewHistory
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
          <div className="header-content">
            <span className="mini-badge">🐴</span>
            <h1>HORSE SCORE</h1>
          </div>
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
          <button className="end-game-button" onClick={onResetGame}>Cancel Join</button>
        </footer>
      </div>
    );
  }

  // Identity Selection Screen
  if (!currentPlayerName) {
    return (
      <div className="dashboard-container">
        <header className="game-header">
          <button className="back-setup-btn" onClick={onManualSetup}>← SETUP</button>
          <div className="header-content">
            <span className="mini-badge">🐴</span>
            <h1>WHO ARE YOU?</h1>
          </div>
          <div className="header-spacer"></div>
        </header>
        <main className="dashboard-main identity-selection">
          <div className="selection-card">
            <h2>Identify Yourself</h2>
            <p>Select your name from the stable</p>
            <div className="identity-grid">
              {players.map((player, idx) => (
                <button 
                  key={idx} 
                  className="identity-btn"
                  onClick={() => onSelectIdentity(player.name)}
                >
                  <span className="btn-icon">👤</span>
                  {player.name}
                </button>
              ))}
            </div>
          </div>
        </main>
        <footer className="game-footer">
          <button className="end-game-button" onClick={onResetGame}>Exit Stable</button>
        </footer>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="game-header">
        <button className="back-setup-btn" onClick={onManualSetup}>← SETUP</button>
        <div className="header-content">
          <span className="mini-badge">🐴</span>
          <h1>HORSE SCORE</h1>
        </div>
        <div className="current-user-badge">
          <span className="user-icon">👤</span>
          <span className="user-name">{currentPlayerName}</span>
        </div>
      </header>
      <main className="dashboard-main">
        <div className="player-grid">
          {players.map((player, index) => {
            const isMe = player.name === currentPlayerName;
            return (
              <div 
                key={index} 
                className={`player-card ${index === giverIndex ? 'giver-selected' : ''} ${index === receiverIndex ? 'receiver-selected' : ''} ${isMe ? 'is-me' : ''}`}
                onClick={() => onPlayerClick(index)}
              >
                <div className="player-header">
                  {isMe && <span className="me-tag">ME</span>}
                  <h2 className="player-name">{player.name}</h2>
                </div>
                <div className="score-display">{player.score}</div>
              </div>
            );
          })}
        </div>
        <TransactionLog transactions={transactions} />
      </main>
      <footer className="game-footer">
        <button className="secondary" onClick={onViewHistory}>📜 HISTORY</button>
        <button className="save-game-button" onClick={onSaveGame}>💾 SAVE</button>
        <button className="end-game-button" onClick={onResetGame}>🏁 END</button>
      </footer>
    </div>
  );
};

export default Dashboard;
