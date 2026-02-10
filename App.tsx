
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import ResultCard from './components/ResultCard';
import MapEmbed from './components/MapEmbed';
import FavoritesList from './components/FavoritesList';
import WeatherWidget from './components/WeatherWidget';
import { getTravelInfo, getWeatherInfo } from './services/geminiService';
import type { Category, TravelInfo, Place, WeatherInfo } from './types';
import { CATEGORIES } from './constants';

const App: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [result, setResult] = useState<TravelInfo | null>(null);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedLocation, setSearchedLocation] = useState<string>('');
  const [favorites, setFavorites] = useState<Place[]>([]);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('travelAppFavorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Không thể tải địa điểm yêu thích từ localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('travelAppFavorites', JSON.stringify(favorites));
    } catch (error) {
        console.error("Không thể lưu địa điểm yêu thích vào localStorage:", error);
    }
  }, [favorites]);

  const isFavorite = (place: Place) => {
    return favorites.some(fav => fav.name === place.name && fav.address === place.address);
  };

  const toggleFavorite = (place: Place) => {
    setFavorites(prevFavorites => {
      if (isFavorite(place)) {
        return prevFavorites.filter(fav => fav.name !== place.name || fav.address !== place.address);
      } else {
        return [...prevFavorites, place];
      }
    });
  };

  const handleSearch = useCallback(async (category: Category) => {
    if (!location.trim()) {
      setError('Vui lòng nhập một địa điểm để tìm kiếm.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setWeather(null);
    setActiveCategory(category);
    setSearchedLocation(location);

    let travelPrompt = `Với tư cách là một chuyên gia du lịch, hãy cung cấp thông tin chi tiết về chủ đề "${category.name}" tại "${location}". Cung cấp một đoạn tóm tắt chung, một danh sách các địa điểm cụ thể, một số đánh giá từ cộng đồng, và một vài gợi ý về các địa điểm tương tự hoặc lân cận. Với mỗi địa điểm, hãy bao gồm tên, địa chỉ đầy đủ, mô tả ngắn gọn và điểm đánh giá trung bình. Với mỗi đánh giá, hãy cung cấp tên tác giả, điểm đánh giá và nội dung bình luận. Với mỗi gợi ý, hãy cung cấp tên và lý do. Trả lời bằng định dạng JSON theo schema đã cung cấp.`;

    if (category.id === 'investment') {
        travelPrompt = `Với tư cách là một nhà phân tích kinh doanh, hãy cung cấp thông tin chi tiết về cơ hội "${category.name}" tại "${location}". 
        - Cung cấp một "tóm tắt" (summary) về tình hình kinh tế và môi trường đầu tư tại đây.
        - Liệt kê các "địa điểm" (places) hoặc khu vực kinh doanh trọng điểm (khu công nghiệp, trung tâm thương mại, văn phòng) với "tên" (name), "địa chỉ" (address), "mô tả" (description) về tiềm năng và "đánh giá" (rating) tiềm năng trên thang điểm 5.
        - Cung cấp một vài "đánh giá" (reviews) hoặc nhận định từ các chuyên gia/báo cáo về môi trường kinh doanh ở đây, với "tác giả" (author) là tên chuyên gia hoặc nguồn báo cáo.
        - Đưa ra một vài "gợi ý" (suggestions) về các lĩnh vực đầu tư tiềm năng khác.
        Trả lời bằng định dạng JSON theo schema đã cung cấp.`;
    }

    if (category.id === 'accommodation') {
        travelPrompt = `Với tư cách là một chuyên gia du lịch, hãy cung cấp thông tin về "${category.name}" tại "${location}".
        - Cung cấp "tóm tắt" (summary) về các lựa chọn lưu trú tại đây (đa dạng loại hình, khu vực giá tốt, v.v.).
        - Liệt kê các "địa điểm" (places) là khách sạn, nhà nghỉ nổi bật với "tên" (name), "địa chỉ" (address), "mô tả" (description) về tiện nghi, "đánh giá" (rating) trên thang điểm 5, và "mức giá" (price) tham khảo cho một đêm.
        - Cung cấp một vài "đánh giá" (reviews) từ khách đã ở.
        - Đưa ra "gợi ý" (suggestions) về các khu vực lưu trú tốt hoặc các loại hình khác (homestay, resort).
        Trả lời bằng định dạng JSON theo schema đã cung cấp.`;
    }

    try {
      const [travelInfo, weatherInfo] = await Promise.all([
        getTravelInfo(travelPrompt),
        getWeatherInfo(location)
      ]);
      setResult(travelInfo);
      setWeather(weatherInfo);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.';
      setError(`Không thể tải dữ liệu. ${errorMessage}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Khám phá Điểm đến Mới</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Nhập tên một thành phố hoặc địa điểm để nhận ngay những thông tin du lịch hữu ích.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ví dụ: Hà Nội, Đà Nẵng, Vịnh Hạ Long..."
              className="flex-grow p-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg transition duration-300"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(activeCategory)}
            />
            <button
              onClick={() => handleSearch(activeCategory)}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:bg-slate-400 disabled:cursor-not-allowed transition duration-300"
            >
              {loading ? 'Đang tìm...' : 'Tìm kiếm'}
            </button>
          </div>
        </div>

        {searchedLocation && (
          <CategorySelector
            activeCategory={activeCategory}
            onSelectCategory={(category) => {
              setLocation(searchedLocation); // ensure location is set before new search
              handleSearch(category);
            }}
            loading={loading}
          />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <ResultCard 
              loading={loading} 
              error={error} 
              result={result} 
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <MapEmbed location={searchedLocation} places={result?.places} />
            <WeatherWidget weather={weather} loading={loading} location={searchedLocation} />
            <FavoritesList favorites={favorites} onRemoveFavorite={toggleFavorite} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
