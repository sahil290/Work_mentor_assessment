import { useState, useEffect } from 'react';
import { productsApi } from '../services/api';

export function useCategories(refreshKey) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    productsApi.getCategories()
      .then(({ data }) => setCategories(data))
      .catch(() => {});
  }, [refreshKey]);

  return categories;
}
