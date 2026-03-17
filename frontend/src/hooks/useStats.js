import { useState, useEffect } from 'react';
import { productsApi } from '../services/api';

export function useStats(refreshKey) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi.getStats()
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  return { stats, loading };
}
