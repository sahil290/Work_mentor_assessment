import { useState } from 'react';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';

export default function DeleteModal({ product, onConfirm, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(product._id);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={!!product} onClose={onClose} title="Delete product" maxWidth="max-w-sm">
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Are you sure you want to delete{' '}
        <span className="text-gray-800 font-medium">"{product?.name}"</span>?
        This action cannot be undone.
      </p>
      <div className="flex gap-2 justify-end">
        <button onClick={onClose} className="btn-secondary" disabled={loading}>
          Cancel
        </button>
        <button onClick={handleConfirm} className="btn-danger" disabled={loading}>
          {loading && <Spinner size={13} />}
          Delete product
        </button>
      </div>
    </Modal>
  );
}