export interface AQIData {
  aqi: number;
  city: string;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
  };
}

export interface WQIData {
  wqi: number;
  parameters: {
    ph: number;
    dissolved_oxygen: number;
    turbidity: number;
  };
}

export interface LocationData {
  lat: number;
  lng: number;
  name: string;
}