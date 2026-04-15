import React, { useState } from 'react';
import './TransferModal.css';

interface TransferModalProps {
  giverName: string;
  receiverName: string;
  onTransfer: (amount: number) => void;
  onCancel: () => void;
}

const TransferModal: React.FC<TransferModalProps> = ({ 
  giverName, 
  receiverName, 
  onTransfer, 
  onCancel 
}) => {
  const [amount, setAmount] = useState<string>('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(amount, 10);
    if (!isNaN(numAmount) && numAmount > 0) {
      onTransfer(numAmount);
    }
  };

  const isInvalid = !amount || isNaN(parseInt(amount, 10)) || parseInt(amount, 10) <= 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Transfer Points</h2>
        <div className="transfer-direction">
          <span className="giver-label">{giverName}</span>
          <span className="arrow">→</span>
          <span className="receiver-label">{receiverName}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input 
              id="amount"
              type="number" 
              inputMode="numeric"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
              onFocus={(e) => e.target.select()}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
            <button type="submit" className="confirm-button" disabled={isInvalid}>Transfer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferModal;
