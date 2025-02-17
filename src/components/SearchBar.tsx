import React, { useState } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import { useStore } from '../store';
import { searchLocation, getAQIData, getWQIData } from '../services/api';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ name: string; lat: number; lng: number }>>([]);
  const [showResults, setShowResults] = useState(false);
  const {
    setSelectedLocation,
    setAQIData,
    setWQIData,
    setIsLoading,
    setError,
    isLoading
  } = useStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      setSearchResults([]);
      setShowResults(false);
      
      const locations = await searchLocation(query);
      setSearchResults(locations);
      setShowResults(true);
    } catch (error: any) {
      setError(error.message || 'Failed to search location. Please try again.');
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = async (location: { lat: number; lng: number; name: string }) => {
    setShowResults(false);
    setQuery(location.name);
    setSelectedLocation(location);
    
    try {
      setIsLoading(true);
      setError(null);
      
      const [aqiData, wqiData] = await Promise.all([
        getAQIData(location.lat, location.lng),
        getWQIData(),
      ]);
      
      setAQIData({ ...aqiData, city: location.name });
      setWQIData(wqiData);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch quality data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!e.target.value) {
              setShowResults(false);
            }
          }}
          placeholder="Search for a location..."
          className="w-full px-4 py-3 pl-12 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg
                   placeholder-gray-400 dark:placeholder-gray-500"
        />
        {isLoading ? (
          <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin" size={20} />
        ) : (
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        )}
      </form>

      {showResults && searchResults.length > 0 && (
        <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10 overflow-hidden">
          {searchResults.map((result, index) => (
            <button
              key={index}
              onClick={() => handleLocationSelect(result)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3
                       border-b last:border-b-0 border-gray-100 dark:border-gray-700"
            >
              <MapPin size={18} className="text-gray-400" />
              <span>{result.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};