import React from 'react';
import { Clock, X } from 'lucide-react';
import type { SearchHistoryItem } from '../types';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelect: (city: string) => void;
  onClear: () => void;
}

export function SearchHistory({ history, onSelect, onClear }: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">Recent Searches</h3>
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-gray-600"
          title="Clear history"
        >
          <X size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <button
            key={item.timestamp}
            onClick={() => onSelect(item.city)}
            className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Clock size={14} />
            <span>{item.city}</span>
          </button>
        ))}
      </div>
    </div>
  );
}