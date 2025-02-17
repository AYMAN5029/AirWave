# AirWave 🌍

A modern, real-time Air Quality Index (AQI) and Water Quality Index (WQI) dashboard built with React, TypeScript, and Tailwind CSS. This application allows users to search for locations worldwide and view their air and water quality metrics in an intuitive and visually appealing interface.

![Dashboard Preview](https://i.imgur.com/MsA4zc9.png)

## Features ✨

- **Location Search**: Search for any location worldwide using the OpenWeatherMap Geocoding API
- **Real-time AQI Data**: Fetch current air quality data using OpenWeatherMap Air Pollution API
- **Simulated WQI Data**: View water quality metrics (for demonstration purposes)
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Responsive Design**: Fully responsive interface that works seamlessly across all devices
- **Interactive UI**: Smooth animations and transitions for a polished user experience
- **Quality Indicators**: Visual indicators for both air and water quality levels

## Tech Stack 🛠️

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **API**: OpenWeatherMap (Geocoding and Air Pollution)

## Getting Started 🚀

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables 🔑

The application uses the following environment variables:

- `OPENWEATHERMAP_API_KEY`: Your OpenWeatherMap API key for accessing geocoding and air quality data

## Features in Detail 📋

### Air Quality Index (AQI)
- Real-time AQI data from OpenWeatherMap
- Pollutant measurements including:
  - PM2.5 (Fine particles)
  - PM10 (Coarse particulate matter)
  - O3 (Ozone)
  - NO2 (Nitrogen dioxide)

### Water Quality Index (WQI)
- Simulated WQI data including:
  - pH levels
  - Dissolved oxygen
  - Turbidity

### UI/UX Features
- Smooth transitions between themes
- Loading states with animated indicators
- Error handling with user-friendly messages
- Responsive cards with dynamic color coding
- Interactive search with autocomplete suggestions

## Screenshots 🌟
Below are some screenshots showcasing the application:

![London](https://i.imgur.com/nzmosdE.png)
![New Delhi](https://i.imgur.com/HGBAP7j.png)
![Tokyo](https://i.imgur.com/3hjrsNw.png)


## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🌱

- OpenWeatherMap for providing the API
- The React and TypeScript communities for excellent documentation and support.
