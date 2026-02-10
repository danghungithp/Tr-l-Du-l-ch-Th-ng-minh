
import React, { useState } from 'react';
import type { TravelInfo, Place } from '../types';
import Suggestions from './Suggestions';

interface ResultCardProps {
  loading: boolean;
  error: string | null;
  result: TravelInfo | null;
  onToggleFavorite: (place: Place) => void;
  isFavorite: (place: Place) => boolean;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
      {halfStar && <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292zM10 4.24v11.52l2.121 1.53-1.07-3.292a1 1 0 01.364-1.118l2.8-2.034H12.42a1 1 0 01-.95-.69L10 4.24z" /></svg>}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
    </div>
  );
};


const ResultCard: React.FC<ResultCardProps> = ({ loading, error, result, onToggleFavorite, isFavorite }) => {
  const [copiedPlaceName, setCopiedPlaceName] = useState<string | null>(null);

  const handleShare = async (place: Place) => {
    const shareText = `Thử xem địa điểm này nhé: ${place.name}\nĐịa chỉ: ${place.address}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${place.address}`)}`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: place.name,
                text: shareText,
                url: googleMapsUrl,
            });
        } catch (error) {
            console.error('Lỗi khi chia sẻ:', error);
        }
    } else {
        // Fallback for browsers that don't support navigator.share
        try {
            await navigator.clipboard.writeText(`${shareText}\nTìm trên bản đồ: ${googleMapsUrl}`);
            setCopiedPlaceName(place.name);
            setTimeout(() => setCopiedPlaceName(null), 2000); // Hide notification after 2 seconds
        } catch (err) {
            console.error('Không thể sao chép văn bản: ', err);
            alert("Không thể sao chép liên kết vào bộ nhớ tạm."); // Simple alert as a last resort
        }
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-6">
          <div className="space-y-3"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-full animate-pulse"></div><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-5/6 animate-pulse"></div></div>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2 animate-pulse"></div>
              <div className="flex gap-2"><div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse"></div></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-full animate-pulse"></div>
            </div>
          ))}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3"><div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-md w-1/3 animate-pulse"></div><div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-md w-full animate-pulse"></div></div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-10"><svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><h3 className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">Lỗi</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{error}</p></div>
      );
    }
    if (result) {
      return (
        <div>
          <div className="prose prose-slate dark:prose-invert max-w-none mb-6"><p>{result.summary}</p></div>
          <div className="space-y-4">
            {result.places.map((place, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700/50 relative">
                 <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button 
                        onClick={() => handleShare(place)}
                        className="text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        aria-label={`Chia sẻ ${place.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                      </svg>
                    </button>
                    <button 
                        onClick={() => onToggleFavorite(place)}
                        className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        aria-label={isFavorite(place) ? 'Xóa khỏi yêu thích' : 'Lưu vào yêu thích'}
                    >
                        <svg className="w-6 h-6" fill={isFavorite(place) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                        </svg>
                    </button>
                    {copiedPlaceName === place.name && (
                        <div className="absolute top-10 right-0 bg-slate-900 text-white text-xs rounded-md px-2 py-1 shadow-lg z-10">
                            Đã sao chép!
                        </div>
                    )}
                 </div>
                <div className="flex justify-between items-start flex-wrap gap-y-2">
                    <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400 pr-20 w-full sm:w-auto">{place.name}</h3>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {place.price && (
                            <span className="text-sm font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded-md whitespace-nowrap">{place.price}</span>
                        )}
                        <div className="flex items-center gap-1">
                            <StarRating rating={place.rating} />
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">({place.rating.toFixed(1)})</span>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-2 font-mono">{place.address}</p>
                <p className="text-slate-600 dark:text-slate-300">{place.description}</p>
              </div>
            ))}
          </div>
          {result.reviews && result.reviews.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Đánh giá từ cộng đồng</h3>
              <div className="space-y-4">
                {result.reviews.map((review, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="font-semibold text-slate-700 dark:text-slate-300">{review.author}</div>
                      <div className="ml-auto"><StarRating rating={review.rating} /></div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {result.suggestions && result.suggestions.length > 0 && (
            <Suggestions suggestions={result.suggestions} />
          )}
          {result.sources && result.sources.length > 0 && (
            <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4"><h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Nguồn thông tin:</h4><ul className="flex flex-wrap gap-2">{result.sources.map((source, index) => (source.web?.uri && (<li key={index}><a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">{source.web.title || new URL(source.web.uri).hostname}</a></li>)))}</ul></div>
          )}
        </div>
      );
    }
    return (
      <div className="text-center py-10"><svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 3v10m6-10v10m0 0l6-3m-6 3V7" /></svg><h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Bắt đầu khám phá</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Nhập một địa điểm và chọn một chủ đề để xem thông tin.</p></div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6 min-h-[300px]">
      {renderContent()}
    </div>
  );
};

export default ResultCard;
