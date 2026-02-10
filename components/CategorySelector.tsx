
import React from 'react';
import { CATEGORIES } from '../constants';
import type { Category } from '../types';

interface CategorySelectorProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  loading: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ activeCategory, onSelectCategory, loading }) => {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex space-x-2 pb-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category)}
            disabled={loading}
            className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105
              ${
                activeCategory.id === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            `}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
