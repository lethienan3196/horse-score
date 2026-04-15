import React, { useState, useEffect } from 'react';
import './SetupScreen.css';

interface SetupScreenProps {
  onStartGame: (playerNames: string[], roomId: string) => void;
  onViewHistory: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame, onViewHistory }) => {
  const [names, setNames] = useState<string[]>(['', '', '', '']);
  const [roomId, setRoomId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateInputs(names, roomId);
  }, [names, roomId]);

  const validateInputs = (currentNames: string[], currentRoomId: string) => {
    const trimmedNames = currentNames.map(n => n.trim());
    
    // Check for empty names
    const hasEmpty = trimmedNames.some(n => n === '');
    if (hasEmpty) {
      setError(null);
      setIsValid(false);
      return;
    }

    // Check for uniqueness
    const uniqueNames = new Set(trimmedNames);
    if (uniqueNames.size !== 4) {
      setError('Each player must have a unique name.');
      setIsValid(false);
      return;
    }

    // Check for Room ID
    if (!currentRoomId.trim()) {
      setError(null);
      setIsValid(false);
      return;
    }

    setError(null);
    setIsValid(true);
  };

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const generateRoomId = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(newRoomId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onStartGame(names.map(n => n.trim()), roomId.trim());
    }
  };

  return (
    <div className="setup-container">
      <header className="setup-header">
        <h1>🐴 Horse Score</h1>
        <p>Enter 4 player names and a Room ID to begin</p>
      </header>

      <form onSubmit={handleSubmit} className="setup-form">
        <div className="room-setup">
          <div className="input-group">
            <label htmlFor="room-id">Room ID</label>
            <div className="room-input-row">
              <input
                id="room-id"
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter or generate ID"
                autoComplete="off"
              />
              <button type="button" onClick={generateRoomId} className="generate-button">
                Generate
              </button>
            </div>
          </div>
        </div>

        <div className="inputs-grid">
          {names.map((name, index) => (
            <div key={index} className="input-group">
              <label htmlFor={`player-${index}`}>Player {index + 1}</label>
              <input
                id={`player-${index}`}
                type="text"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Name ${index + 1}`}
                autoComplete="off"
              />
            </div>
          ))}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="setup-actions">
          <button type="submit" disabled={!isValid} className="start-button">
            Start Game
          </button>
          <button type="button" onClick={onViewHistory} className="history-link-button">
            View Past Games
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupScreen;
