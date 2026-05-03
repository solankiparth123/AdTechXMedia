import React, { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span style={{ fontSize: '1.4rem' }}>
        {type === 'success' ? '✅' : '❌'}
      </span>
      <div>
        <div style={{ fontWeight: 700, fontFamily: 'Poppins', fontSize: '0.9rem', marginBottom: '2px' }}>
          {type === 'success' ? 'Woohoo!' : 'Oops!'}
        </div>
        <div style={{ fontSize: '0.85rem', color: '#666' }}>{message}</div>
      </div>
      <button
        onClick={onClose}
        style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '1rem' }}
      >
        ×
      </button>
    </div>
  );
}
