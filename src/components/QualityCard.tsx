import React from 'react';
import { Droplets, Wind, Thermometer, Activity } from 'lucide-react';

interface QualityCardProps {
  type: 'aqi' | 'wqi';
  value: number;
  title: string;
  parameters: Record<string, number>;
}

export const QualityCard: React.FC<QualityCardProps> = ({ type, value, title, parameters }) => {
  const getQualityInfo = (value: number, type: 'aqi' | 'wqi') => {
    if (type === 'aqi') {
      if (value <= 50) return { color: 'quality-indicator-good', label: 'Good' };
      if (value <= 100) return { color: 'quality-indicator-moderate', label: 'Moderate' };
      return { color: 'quality-indicator-poor', label: 'Poor' };
    } else {
      if (value >= 80) return { color: 'quality-indicator-good', label: 'Good' };
      if (value >= 60) return { color: 'quality-indicator-moderate', label: 'Moderate' };
      return { color: 'quality-indicator-poor', label: 'Poor' };
    }
  };

  const qualityInfo = getQualityInfo(value, type);

  return (
    <div className="quality-card glass-effect rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        {type === 'aqi' ? (
          <Wind className="text-blue-500" size={24} />
        ) : (
          <Droplets className="text-blue-500" size={24} />
        )}
      </div>
      
      <div className="flex items-center space-x-6 mb-8">
        <div className={`quality-indicator ${qualityInfo.color} text-4xl font-bold text-white p-6 rounded-2xl shadow-lg flex items-center justify-center min-w-[100px]`}>
          {value}
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-semibold">
            {qualityInfo.label}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {type === 'aqi' ? 'Air Quality Index' : 'Water Quality Index'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(parameters).map(([key, value]) => (
          <div key={key} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="text-blue-500" size={18} />
              <div className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                {key.replace('_', ' ')}
              </div>
            </div>
            <div className="text-lg font-semibold">{value.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};