import axios from 'axios';
import { AQIData, WQIData, LocationData } from '../types';

const OPENWEATHERMAP_API_KEY = '7efa332cf48aeb9d2d391a51027f1a71';
const GEOCODING_API_BASE = 'https://api.openweathermap.org/geo/1.0';
const AQI_API_BASE = 'https://api.openweathermap.org/data/2.5';

export async function searchLocation(query: string): Promise<LocationData[]> {
  try {
    const response = await axios.get(
      `${GEOCODING_API_BASE}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${OPENWEATHERMAP_API_KEY}`
    );
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response format from geocoding API');
    }

    if (response.data.length === 0) {
      throw new Error('No locations found');
    }
    
    return response.data.map((item: any) => ({
      lat: item.lat,
      lng: item.lon,
      name: `${item.name}${item.state ? `, ${item.state}` : ''}, ${item.country}`,
    }));
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('API authentication failed. Please check the API key.');
    }
    if (error.message === 'No locations found') {
      throw new Error('No matching locations found. Please try a different search term.');
    }
    throw new Error('Failed to search location. Please try again.');
  }
}

export async function getAQIData(lat: number, lng: number): Promise<AQIData> {
  try {
    const response = await axios.get(
      `${AQI_API_BASE}/air_pollution?lat=${lat}&lon=${lng}&appid=${OPENWEATHERMAP_API_KEY}`
    );
    
    if (!response.data?.list?.[0]) {
      throw new Error('Invalid AQI data format');
    }
    
    const data = response.data.list[0];
    return {
      aqi: data.main.aqi * 20, // Convert 1-5 scale to 0-100
      city: '', // City name is handled separately
      pollutants: {
        pm25: data.components.pm2_5,
        pm10: data.components.pm10,
        o3: data.components.o3,
        no2: data.components.no2,
      },
    };
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('API authentication failed. Please check the API key.');
    }
    throw new Error('Failed to fetch air quality data. Please try again.');
  }
}

// Simulated WQI data since there's no readily available free API
export async function getWQIData(): Promise<WQIData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    wqi: Math.floor(Math.random() * (95 - 60) + 60),
    parameters: {
      ph: Number((Math.random() * (8.5 - 6.5) + 6.5).toFixed(1)),
      dissolved_oxygen: Number((Math.random() * (9.5 - 7.5) + 7.5).toFixed(1)),
      turbidity: Number((Math.random() * (5 - 0.5) + 0.5).toFixed(1)),
    },
  };
}