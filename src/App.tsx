import React from 'react';
import { SearchBar } from './components/SearchBar';
import { QualityCard } from './components/QualityCard';
import { Moon, Sun, AlertCircle, Wind, Droplets } from 'lucide-react';
import { useStore } from './store';

function App() {
  const { isDarkMode, toggleDarkMode, aqiData, wqiData, error } = useStore();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen text-gray-900 dark:text-white pb-12">
        <nav className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white px-3 py-1 rounded-full">
                  <Wind size={20} />
                  <Droplets size={20} />
                </div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300">
                  AirWave
                </h1>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun size={24} className="text-yellow-500" />
                ) : (
                  <Moon size={24} className="text-blue-600" />
                )}
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center mb-12">
            <SearchBar />
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-100 rounded-lg flex items-center justify-center backdrop-blur-sm border border-red-200 dark:border-red-800">
              <AlertCircle className="mr-2 flex-shrink-0" size={20} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {(aqiData || wqiData) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
              {aqiData && (
                <QualityCard
                  type="aqi"
                  value={aqiData.aqi}
                  title={`Air Quality - ${aqiData.city}`}
                  parameters={aqiData.pollutants}
                />
              )}
              {wqiData && (
                <QualityCard
                  type="wqi"
                  value={wqiData.wqi}
                  title="Water Quality"
                  parameters={wqiData.parameters}
                />
              )}
            </div>
          )}

          {!aqiData && !wqiData && !error && (
            <div className="text-center mt-20">
              <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-blue-100 dark:bg-blue-900">
                <Wind size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Search for a Location</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Enter a city name above to view real-time air and water quality data
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App