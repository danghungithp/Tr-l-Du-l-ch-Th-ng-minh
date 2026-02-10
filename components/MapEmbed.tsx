
import React from 'react';
import type { Place } from '../types';

interface MapEmbedProps {
  location: string;
  places?: Place[];
}

const MapEmbed: React.FC<MapEmbedProps> = ({ location, places }) => {
  const getMapQuery = () => {
    if (places && places.length > 0) {
      // Create a query with multiple points using the pipe separator
      return places.map(p => p.address || p.name).join('|');
    }
    return location;
  };

  const query = getMapQuery();

  if (!query) {
    return (
      <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg aspect-w-16 aspect-h-9 flex items-center justify-center min-h-[300px] lg:h-full">
         <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503-6.734l-3.181 1.591a2.25 2.25 0 00-1.06 1.954V17.25m3.18-5.818l-3.181-1.59m3.181 1.59l3.181 1.59m-11.364-4.13l3.181 1.59m-3.18-1.59l-3.182 1.59m11.363 4.13v-2.81m-3.182 1.59v5.25A2.25 2.25 0 019 19.5V17.25m0 0A2.25 2.25 0 0011.25 15M9 15v-2.25m0 0a2.25 2.25 0 012.25-2.25M15 15V7.5m0 0l-3.182-1.591a2.25 2.25 0 00-1.06-1.954V2.25" />
          </svg>

          <p className="mt-4 text-slate-500 dark:text-slate-400">Bản đồ sẽ xuất hiện ở đây.</p>
        </div>
      </div>
    );
  }
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg h-full overflow-hidden min-h-[300px] lg:min-h-0">
      <iframe
        key={mapSrc} // Add key to force re-render when src changes
        width="100%"
        height="100%"
        title="Google Map"
        src={mapSrc}
        className="border-0"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
