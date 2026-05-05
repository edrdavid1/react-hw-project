import { useState } from 'react';

const STORAGE_KEY = 'fetchLogs';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      logs.push({
        url,
        payload: options.body ?? null,
        status: response.status,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));

      return { data, status: response.status };
    } catch (err) {
      setError(err);
      return { data: null, status: null };
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error };
};

export default useFetch;
