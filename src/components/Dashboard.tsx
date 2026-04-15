import React from 'react';
import './Dashboard.css';

interface Player {
  name: string;
  score: number;
}

interface DashboardProps {
  players: Player[];
  giverIndex: number | null;
  receiverIndex: number | null;
  onPlayerClick: (index: number) => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  players, 
  giverIndex, 
  receiverIndex, 
  onPlayerClick, 
  onReset 
}) => {
  return (
    <div className="dashboard-container">
      <header className="game-header">
        <h1>Horse Score</h1>
      </header>
      <main className="player-grid">
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
      </main>
      <footer className="game-footer">
        <button className="reset-button" onClick={onReset}>Reset Game</button>
      </footer>
    </div>
  );
};

export default Dashboard;
