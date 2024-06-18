import React from 'react';

interface MessProps {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Mess: React.FC<MessProps> = ({ title, message, onCancel, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onCancel}>Hủy</button>
          <button className="confirm-button" onClick={onConfirm}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
}

export default Mess;