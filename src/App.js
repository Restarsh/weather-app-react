import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/Weather';
export default function App() {

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user's current position
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLong(longitude);

        // Fetch weather data
        const response = await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`);

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty deps - run once on mount

  // Render loading state
  if (loading) {
    return (
      <div className="App">
        <div className="weather-card">
          <div className="details">
            <p className="description">Loading weather...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="App">
        <div className="weather-card">
          <div className="details">
            <p className="description">Error: {error}</p>
            <button className="refresh-btn" onClick={() => window.location.reload()}>
              ↻
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render weather data if available
  if (!data) {
    return (
      <div className="App">
        <div className="weather-card">
          <div className="details">
            <p className="description">No weather data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Weather weatherData={data} />
    </div>
  );
}