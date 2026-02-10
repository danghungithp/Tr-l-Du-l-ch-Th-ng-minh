
import React from 'react';
import type { Suggestion } from '../types';

interface SuggestionsProps {
  suggestions: Suggestion[];
}

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions }) => {
  const sortedSuggestions = React.useMemo(() => {
    return [...suggestions].sort((a, b) => {
      // Ưu tiên các gợi ý "Gần đó" hoặc "Gần đây" lên đầu
      const aIsNearby = a.reason.toLowerCase().includes('gần');
      const bIsNearby = b.reason.toLowerCase().includes('gần');

      if (aIsNearby && !bIsNearby) {
        return -1; // a đứng trước
      }
      if (!aIsNearby && bIsNearby) {
        return 1; // b đứng trước
      }
      return 0; // Giữ nguyên thứ tự cho các trường hợp khác
    });
  }, [suggestions]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
        Gợi ý cho bạn
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sortedSuggestions.map((suggestion, index) => (
          <div key={index} className="bg-white dark:bg-slate-800/50 p-4 rounded-lg flex items-center gap-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">{suggestion.name}</p>
              <span className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">{suggestion.reason}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
