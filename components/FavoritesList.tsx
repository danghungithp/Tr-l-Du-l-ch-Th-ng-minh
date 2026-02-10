
import React, { useState, useMemo } from 'react';
import type { Place } from '../types';

interface FavoritesListProps {
  favorites: Place[];
  onRemoveFavorite: (place: Place) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onRemoveFavorite }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('name');

  const displayedFavorites = useMemo(() => {
    return favorites
      .filter(place =>
        place.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        place.address.toLowerCase().includes(filterQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === 'name') {
          return a.name.localeCompare(b.name, 'vi');
        }
        if (sortOrder === 'address') {
          return a.address.localeCompare(b.address, 'vi');
        }
        return 0;
      });
  }, [favorites, filterQuery, sortOrder]);

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        Địa điểm đã lưu
      </h3>

      {favorites.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Lọc theo tên, địa chỉ..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="flex-grow p-2 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg transition duration-300 text-sm"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg transition duration-300 text-sm"
          >
            <option value="name">Sắp xếp theo Tên (A-Z)</option>
            <option value="address">Sắp xếp theo Địa chỉ (A-Z)</option>
          </select>
        </div>
      )}

      {favorites.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">Bạn chưa lưu địa điểm nào. Hãy nhấn vào hình trái tim ❤️ để thêm nhé!</p>
      ) : displayedFavorites.length > 0 ? (
        <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {displayedFavorites.map((place) => (
            <li key={`${place.name}-${place.address}`} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-300">{place.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{place.address}</p>
              </div>
              <button 
                onClick={() => onRemoveFavorite(place)}
                className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0 ml-2"
                aria-label={`Xóa ${place.name} khỏi danh sách yêu thích`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">Không tìm thấy địa điểm nào khớp với bộ lọc của bạn.</p>
      )}
    </div>
  );
};

export default FavoritesList;
