import React from 'react';
import type { Category } from './types';

// Fix: Converted JSX for icons into React.createElement calls.
// This is necessary because this is a .ts file, not a .tsx file,
// and the TypeScript compiler was not parsing the JSX syntax correctly.
export const CATEGORIES: Category[] = [
  { 
    id: 'overview', 
    name: 'Tổng quan', 
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM9 7a1 1 0 112 0v1a1 1 0 11-2 0V7zm2 4a1 1 0 10-2 0v3a1 1 0 102 0v-3z", clipRule: "evenodd" }))
  },
  { 
    id: 'accommodation', 
    name: 'Khách sạn & Nhà nghỉ', 
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M18 10a2 2 0 00-2-2H4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4zM9 13a1 1 0 11-2 0 1 1 0 012 0zm5-1a1 1 0 100-2 1 1 0 000 2z" }))
  },
  { 
    id: 'food', 
    name: 'Ẩm thực', 
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, 
      React.createElement('path', { d: "M11 3a1 1 0 10-2 0v1.586l-1.707-1.707a1 1 0 00-1.414 1.414L7.586 6H6a1 1 0 000 2h1.586l-1.707 1.707a1 1 0 001.414 1.414L9 9.414V11a1 1 0 102 0V9.414l1.707 1.707a1 1 0 001.414-1.414L12.414 8H14a1 1 0 100-2h-1.586l1.707-1.707a1 1 0 00-1.414-1.414L11 4.586V3z" }),
      React.createElement('path', { d: "M3 14s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1zM2 17s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1zM4 17s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1zM5 14s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1zM7 17s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1zM8 14s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1zM10 17s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1zM11 14s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1zM13 17s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1zM14 14s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1zM16 17s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1zM17 14s1 0 1-1 0-1-1-1-1 0-1 1 0 1 1 1z" })
    )
  },
  { 
    id: 'transport', 
    name: 'Giao thông', 
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1-2 5v-2.071a6.012 6.012 0 013.743-5.672A6 6 0 1118 8zm-6-4a4 4 0 100 8 4 4 0 000-8z", clipRule: "evenodd" }))
  },
  { 
    id: 'culture', 
    name: 'Lịch sử & Văn hoá', 
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 2.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414L6 9.414V13a1 1 0 11-2 0V9.414L2.293 11.121a1 1 0 01-1.414-1.414l2-2a1 1 0 010-1.414zM11 7a1 1 0 100 2h3a1 1 0 100-2h-3z" }))
  },
  { 
    id: 'entertainment', 
    name: 'Giải trí', 
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4 9a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm1 5a1 1 0 100 2h8a1 1 0 100-2H5zM3 8a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1z" }))
  },
  { 
    id: 'investment', 
    name: 'Đầu tư & Kinh doanh', 
    icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M6 3a1 1 0 011-1h6a1 1 0 011 1v2h2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h2V3zm1 3v1h8V6H7zM4 9v6h12V9H4z", clipRule: "evenodd" }))
  }
];
