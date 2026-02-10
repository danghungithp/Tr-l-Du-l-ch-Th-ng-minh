
import React from 'react';
import type { WeatherInfo } from '../types';

interface WeatherWidgetProps {
  weather: WeatherInfo | null;
  loading: boolean;
  location: string;
}

const getWeatherIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
      case 'sunny':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
      case 'cloudy':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>;
      case 'partly-cloudy':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.33-10.5c.2-.05.4-.1.6-.15a4.5 4.5 0 1 1 4.04 6.9A5.5 5.5 0 0 1 17.5 19z"></path><path d="M16 14.5a3.5 3.5 0 0 0-6.05 2.5"></path></svg>;
      case 'rain':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a5 5 0 0 0-10 0M16 13V5a4 4 0 1 0-8 0v8"></path><line x1="8" y1="17" x2="8" y2="17"></line><line x1="12" y1="19" x2="12" y2="19"></line><line x1="16" y1="17" x2="16" y2="17"></line></svg>;
      case 'storm':
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.64 16.5A5 5 0 0 0 17 14h-2.25a2.75 2.75 0 0 0-2.75-2.75V11a5.5 5.5 0 0 0-11 0v.5a3.5 3.5 0 0 0 3.5 3.5h1.25"></path><polyline points="13 11 10 15 13 15 11 19"></polyline></svg>;
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>;
    }
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, loading, location }) => {

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 mb-4"></div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    <div className="space-y-2">
                        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-24"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-32"></div>
                    </div>
                </div>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-1/4"></div>
                            <div className="w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-1/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!weather && !loading && location) {
         return (
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Thời tiết tại {location}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Không thể tải dữ liệu thời tiết.</p>
            </div>
        );
    }
    
    if (!weather) return null;

    return (
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Thời tiết tại {location}</h3>
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="w-16 h-16 text-yellow-400 dark:text-yellow-300">
                    {getWeatherIcon(weather.current.icon)}
                </div>
                <div>
                    <p className="text-4xl font-bold text-slate-800 dark:text-slate-100">{weather.current.temperature}°C</p>
                    <p className="text-slate-500 dark:text-slate-400">{weather.current.condition}</p>
                </div>
            </div>
            <div className="space-y-2">
                {weather.forecast.map((day, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                        <p className="font-semibold text-slate-600 dark:text-slate-300 w-1/3">{day.date}</p>
                        <div className="w-6 h-6 text-slate-500 dark:text-slate-400 mx-2">
                            {getWeatherIcon(day.icon)}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 w-1/3 text-right">
                           <span className="font-bold text-slate-700 dark:text-slate-200">{day.maxTemp}°</span> / {day.minTemp}°
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherWidget;
