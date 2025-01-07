import React from 'react';

type DeleteToastProps = {
  birdName: string; // Name of the bird to display in the toast
  onConfirm: () => void; // Callback for confirming deletion
  onCancel: () => void; // Callback for canceling deletion
};

const DeleteToast: React.FC<DeleteToastProps> = ({ birdName, onConfirm, onCancel }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.toast}>
        <h4>Confirm Deletion</h4>
        <p>Are you sure you want to delete <strong>{birdName}</strong>?</p>
        <div style={styles.actions}>
          <button onClick={onConfirm} style={styles.confirmButton}>
            Yes, Delete
          </button>
          <button onClick={onCancel} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  toast: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center' as const,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  confirmButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: 'gray',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default DeleteToast;
