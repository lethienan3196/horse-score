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
  const [amount, setAmount] = useState<number>(20);
  const quickAmounts = [10, 20];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTransfer(amount);
  };

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
            <label>Select Amount</label>
            <div className="quick-amounts">
              {quickAmounts.map(q => (
                <button 
                  key={q}
                  type="button" 
                  className={`quick-amount-btn ${amount === q ? 'active' : ''}`}
                  onClick={() => setAmount(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
            <button type="submit" className="confirm-button">Transfer {amount}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferModal;
