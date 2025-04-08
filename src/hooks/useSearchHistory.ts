import { useState, useEffect } from 'react';
import type { SearchHistoryItem } from '../types';

const MAX_HISTORY_ITEMS = 5;
const STORAGE_KEY = 'weatherSearchHistory';

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (city: string) => {
    setSearchHistory((prev) => {
      const newHistory = [
        { city, timestamp: Date.now() },
        ...prev.filter((item) => item.city.toLowerCase() !== city.toLowerCase()),
      ].slice(0, MAX_HISTORY_ITEMS);
      return newHistory;
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return { searchHistory, addToHistory, clearHistory };
}