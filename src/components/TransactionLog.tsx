import React from 'react';
import { Transaction } from '../App';
import './TransactionLog.css';

interface TransactionLogProps {
  transactions: Transaction[];
}

const TransactionLog: React.FC<TransactionLogProps> = ({ transactions }) => {
  return (
    <div className="transaction-log">
      <h3 className="log-title">Transaction Log</h3>
      <div className="log-list">
        {transactions.length === 0 ? (
          <p className="no-transactions">No transactions yet.</p>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className="log-entry">
              <span className="giver-name">{tx.giverName}</span>
              <span className="arrow"> &rarr; </span>
              <span className="receiver-name">{tx.receiverName}</span>
              <span className="amount"> (+{tx.amount})</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionLog;
