import { useState } from 'react';

function useRequest<T>(f: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const doFetch = async () => {
    try {
      setIsFetching(true);
      const results = await f();
      setData(results);
      setIsFetching(false);
    } catch (err) {
      setError(err);
      setIsFetching(false);
    }
  };

  return [isFetching, data, error, doFetch];
}

export default useRequest;
