import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';

const EMPTY = { name: '', category: '', price: '', quantity: '', description: '' };

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">
        {label} {required && <span className="text-gray-400">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ProductModal({ product, categories, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [customCat, setCustomCat] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({ name: product.name, category: product.category, price: product.price, quantity: product.quantity, description: product.description || '' });
    } else {
      setForm(EMPTY);
    }
    setCustomCat(false);
  }, [product]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.category.trim()) return toast.error('Name and category are required');
    if (isNaN(form.price) || Number(form.price) < 0) return toast.error('Enter a valid price');
    if (isNaN(form.quantity) || Number(form.quantity) < 0) return toast.error('Enter a valid quantity');

    setLoading(true);
    try {
      await onSave({ ...form, price: Number(form.price), quantity: Number(form.quantity) });
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isEdit = !!product?._id;
  const showDropdown = !customCat && categories.length > 0;

  return (
    <Modal open={true} onClose={onClose} title={isEdit ? 'Edit product' : 'Add product'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Product name" required>
              <input className="input" placeholder="e.g. Wireless Headphones" value={form.name} onChange={(e) => set('name', e.target.value)} required />
            </Field>
          </div>

          <div>
            <Field label="Category" required>
              {showDropdown ? (
                <>
                  <select
                    className="input"
                    value={form.category}
                    onChange={(e) => {
                      if (e.target.value === '__new__') { setCustomCat(true); set('category', ''); }
                      else set('category', e.target.value);
                    }}
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    <option value="__new__">+ New category</option>
                  </select>
                </>
              ) : (
                <div className="flex gap-2">
                  <input
                    className="input flex-1"
                    placeholder="e.g. Electronics"
                    value={form.category}
                    onChange={(e) => set('category', e.target.value)}
                    autoFocus={customCat}
                  />
                  {customCat && categories.length > 0 && (
                    <button type="button" onClick={() => { setCustomCat(false); set('category', ''); }}
                      className="btn-secondary px-2.5 shrink-0">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                  )}
                </div>
              )}
            </Field>
          </div>

          <div>
            <Field label="Price (INR)" required>
              <input className="input" type="number" min="0" step="0.01" placeholder="0.00" value={form.price} onChange={(e) => set('price', e.target.value)} required />
            </Field>
          </div>

          <div>
            <Field label="Quantity" required>
              <input className="input" type="number" min="0" step="1" placeholder="0" value={form.quantity} onChange={(e) => set('quantity', e.target.value)} required />
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea className="input resize-none" rows={3} placeholder="Optional product description..." value={form.description} onChange={(e) => set('description', e.target.value)} />
            </Field>
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-1 border-t border-gray-100 mt-1">
          <button type="button" onClick={onClose} className="btn-secondary" disabled={loading}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading && <Spinner size={13} />}
            {isEdit ? 'Save changes' : 'Add product'}
          </button>
        </div>
      </form>
    </Modal>
  );
}