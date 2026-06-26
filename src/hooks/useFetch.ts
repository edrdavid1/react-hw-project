import { useState, useCallback } from 'react';

const STORAGE_KEY = 'fetchLogs';

interface FetchLog {
  url: string;
  payload: BodyInit | null;
  status: number;
  timestamp: string;
}

interface FetchResult<T> {
  data: T | null;
  status: number | null;
}

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async <T>(url: string, options: RequestInit = {}): Promise<FetchResult<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      const data = (await response.json()) as T;

      const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as FetchLog[];
      logs.push({
        url,
        payload: options.body ?? null,
        status: response.status,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));

      return { data, status: response.status };
    } catch (err) {
      const typedError = err instanceof Error ? err : new Error('Failed to fetch data');
      setError(typedError);
      return { data: null, status: null };
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchData, loading, error };
};

export default useFetch;
