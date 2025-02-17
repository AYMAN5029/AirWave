import { create } from 'zustand';
import { LocationData, AQIData, WQIData } from '../types';

interface AppState {
  isDarkMode: boolean;
  selectedLocation: LocationData | null;
  aqiData: AQIData | null;
  wqiData: WQIData | null;
  isLoading: boolean;
  error: string | null;
  toggleDarkMode: () => void;
  setSelectedLocation: (location: LocationData | null) => void;
  setAQIData: (data: AQIData | null) => void;
  setWQIData: (data: WQIData | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  isDarkMode: false,
  selectedLocation: null,
  aqiData: null,
  wqiData: null,
  isLoading: false,
  error: null,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setAQIData: (data) => set({ aqiData: data }),
  setWQIData: (data) => set({ wqiData: data }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error: error }),
}));