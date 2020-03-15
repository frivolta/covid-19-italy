import { useState, useEffect } from 'react';

export interface IUseFetch {
  error: any;
  loading: boolean;
  data: any;
}

export const useFetch = (url: string): IUseFetch => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState(null);
  useEffect(
    () => {
      (async () => {
        setLoading(true);
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setData(data);
          } else {
            setError(new Error(response.statusText));
          }
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      })();
    },
    [url]
  );
  return { error, loading, data };
};
