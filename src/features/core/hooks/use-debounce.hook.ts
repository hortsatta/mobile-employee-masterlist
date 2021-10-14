import { useState } from 'react';

export const DEBOUNCE_DURATION = 800;

export const useDebounce = (): {
  debounce: (callback: () => void, duration?: number) => void;
  loading: boolean;
} => {

  const [loading, setLoading] = useState(false);

  const debounce = (callback: () => void, duration = DEBOUNCE_DURATION) => {
    if (loading) { return; }

    setLoading(true);
    callback();
    setTimeout(() => setLoading(false), duration);
  };

  return { debounce, loading };

};
