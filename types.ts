import type React from 'react';

export interface Place {
  name: string;
  address: string;
  description: string;
  rating: number; // Thêm xếp hạng cho địa điểm
  price?: string; // Thêm giá tham khảo
}

export interface Review {
  author: string;
  rating: number;
  comment: string;
}

export interface Suggestion {
  name: string;
  reason: string;
}

export interface TravelInfo {
  summary: string;
  places: Place[];
  reviews: Review[]; // Thêm danh sách đánh giá
  suggestions: Suggestion[]; // Thêm danh sách gợi ý
  sources: GroundingChunk[];
}

export interface CurrentWeather {
  temperature: number;
  condition: string;
  icon: string; // e.g., 'sunny', 'cloudy', 'rain'
}

export interface ForecastDay {
  date: string; // e.g., 'Thứ Hai'
  minTemp: number;
  maxTemp: number;
  condition: string;
  icon: string;
}

export interface WeatherInfo {
  current: CurrentWeather;
  forecast: ForecastDay[];
}


export interface Category {
  id: string;
  name: string;
  // Fix: Changed JSX.Element to React.ReactNode to resolve 'Cannot find namespace JSX' error.
  icon: React.ReactNode;
}

export interface GroundingChunk {
  web?: {
    // FIX: Made uri and title optional to match the type from the @google/genai library.
    uri?: string;
    title?: string;
  };
  maps?: {
    uri?: string;
    title?: string;
  };
}
