import React from 'react';
import { Cloud } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { SearchHistory } from './components/SearchHistory';
import { ErrorMessage } from './components/ErrorMessage';
import { useWeather } from './hooks/useWeather';
import { useSearchHistory } from './hooks/useSearchHistory';

function App() {
  const { weather, loading, error, fetchWeather } = useWeather();
  const { searchHistory, addToHistory, clearHistory } = useSearchHistory();

  const handleSearch = (city: string) => {
    fetchWeather(city);
    addToHistory(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Cloud size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">Weather Dashboard</h1>
          </div>
          <p className="text-gray-600">Check the weather in your city</p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={loading} />
        
        <SearchHistory
          history={searchHistory}
          onSelect={handleSearch}
          onClear={clearHistory}
        />

        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        {weather && !loading && (
          <WeatherCard weather={weather} onRefresh={() => fetchWeather(weather.name)} />
        )}
      </div>
    </div>
  );
}

export default App;