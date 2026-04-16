import './HistoryScreen.css';
import type { ArchivedGame } from '../App';

interface HistoryScreenProps {
  history: ArchivedGame[];
  onBack: () => void;
  onClearHistory: () => void;
}

export default function HistoryScreen({ history, onBack, onClearHistory }: HistoryScreenProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="history-screen">
      <div className="history-header">
        <div className="header-content">
          <span className="mini-badge">🏆</span>
          <h1>Game History</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            className="clear-history-btn"
            onClick={onClearHistory}
            disabled={history.length === 0}
          >
            Clear History
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <p className="no-history">No archived games yet.</p>
      ) : (
        <div className="history-list">
          {history.map((game) => (
            <div key={game.id} className="history-item">
              <div className="history-item-header">
                <span className="game-date">{formatDate(game.timestamp)}</span>
              </div>
              <div className="history-players">
                {game.players.map((player) => (
                  <div key={player.name} className="history-player">
                    <span className="player-name">{player.name}</span>
                    <span className={`player-score ${player.score >= 0 ? 'positive' : 'negative'}`}>
                      {player.score >= 0 ? '+' : ''}{player.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}
