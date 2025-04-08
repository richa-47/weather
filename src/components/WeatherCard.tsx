import React from 'react';
import { Cloud, Droplets, Wind } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
  onRefresh: () => void;
}

export function WeatherCard({ weather, onRefresh }: WeatherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{weather.name}</h2>
          <p className="text-gray-600">{weather.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="w-16 h-16"
        />
      </div>

      <div className="mb-6">
        <div className="text-5xl font-bold text-gray-800 mb-2">
          {Math.round(weather.main.temp)}°C
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Droplets size={20} />
          <span>Humidity: {weather.main.humidity}%</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Wind size={20} />
          <span>Wind: {Math.round(weather.wind.speed)} km/h</span>
        </div>
      </div>

      <button
        onClick={onRefresh}
        className="mt-6 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Refresh
      </button>
    </div>
  );
}