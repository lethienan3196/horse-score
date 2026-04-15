import React, { useState, useEffect } from 'react';
import './SetupScreen.css';

interface SetupScreenProps {
  onStartGame: (playerNames: string[]) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartGame }) => {
  const [names, setNames] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateInputs(names);
  }, [names]);

  const validateInputs = (currentNames: string[]) => {
    const trimmedNames = currentNames.map(n => n.trim());
    
    // Check for empty names
    const hasEmpty = trimmedNames.some(n => n === '');
    if (hasEmpty) {
      setError(null); // Don't show error yet if still typing
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

    setError(null);
    setIsValid(true);
  };

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onStartGame(names.map(n => n.trim()));
    }
  };

  return (
    <div className="setup-container">
      <header className="setup-header">
        <h1>Horse Score Tracker</h1>
        <p>Enter 4 player names to begin</p>
      </header>

      <form onSubmit={handleSubmit} className="setup-form">
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

        <button type="submit" disabled={!isValid} className="start-button">
          Start Game
        </button>
      </form>
    </div>
  );
};

export default SetupScreen;
