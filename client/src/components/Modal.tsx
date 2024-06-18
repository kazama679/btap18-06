import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, onCancel, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel}>Hủy</button>
          <button onClick={onConfirm}>Đồng ý</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;