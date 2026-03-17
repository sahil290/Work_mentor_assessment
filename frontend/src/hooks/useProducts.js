import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '../services/api';
import toast from 'react-hot-toast';

export function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await productsApi.getAll(filters);
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetch(); }, [fetch]);

  const create = async (payload) => {
    const { data } = await productsApi.create(payload);
    toast.success('Product added');
    fetch();
    return data;
  };

  const update = async (id, payload) => {
    const { data } = await productsApi.update(id, payload);
    toast.success('Product updated');
    fetch();
    return data;
  };

  const remove = async (id) => {
    await productsApi.remove(id);
    toast.success('Product deleted');
    fetch();
  };

  return { products, total, loading, error, refetch: fetch, create, update, remove };
}
