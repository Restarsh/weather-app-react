import dayjs from 'dayjs';
import './Weather.css';

const Weather = ({ weatherData }) => {
  return (
    <div className="weather-card">
      <div className="header">
        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          ↻
        </button>
      </div>
      
      <div className="details">
        <p className="date">{dayjs().format('dddd, MMMM D, YYYY')}</p>
        <p className="description">{weatherData.weather[0].main}</p>
      </div>

      <div className="metrics">
        <div className="metric-box">
          <span className="label">Temperature</span>
          <span className="value">{weatherData.main.temp} °C</span>
        </div>
        <div className="metric-box">
          <span className="label">Humidity</span>
          <span className="value">{weatherData.main.humidity} %</span>
        </div>
      </div>

      <div className="sun-times">
        <p>🌅 Sunrise: {dayjs.unix(weatherData.sys.sunrise).format('hh:mm A')}</p>
        <p>🌇 Sunset: {dayjs.unix(weatherData.sys.sunset).format('hh:mm A')}</p>
      </div>
    </div>
  );
};

export default Weather;