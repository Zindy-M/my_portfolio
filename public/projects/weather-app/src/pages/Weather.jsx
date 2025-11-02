import React, { useState } from "react";
import { Search, Droplets, Wind, Gauge, Eye, Loader2 } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import { useToast } from "../hooks/useToast";

// Helper to map Open-Meteo weather codes to descriptions
const WEATHER_CODES = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast, ToastContainer } = useToast();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      toast("Please enter a city name", "error");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Geocode city to lat/lon
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      );
      if (!geoRes.ok) throw new Error("Geocoding failed");
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Fetch weather with hourly humidity, pressure, visibility
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,surface_pressure,visibility&timezone=auto`
      );
      if (!weatherRes.ok) throw new Error("Weather fetch failed");
      const weatherData = await weatherRes.json();

      const current = weatherData.current_weather;

      // Find closest hour index
      const currentTime = new Date(current.time);
      const hourIndex = weatherData.hourly.time.findIndex((t) => {
        const hourTime = new Date(t);
        return hourTime.getTime() === currentTime.getTime();
      });

      const safeIndex = hourIndex !== -1 ? hourIndex : 0;

      setWeather({
        name,
        sys: { country },
        main: {
          temp: current.temperature,
          feels_like: current.temperature,
          humidity: weatherData.hourly.relativehumidity_2m[safeIndex],
          pressure: weatherData.hourly.surface_pressure[safeIndex],
        },
        weather: [
          {
            main: WEATHER_CODES[current.weathercode] || "Unknown",
            description: WEATHER_CODES[current.weathercode] || "Unknown",
          },
        ],
        wind: { speed: current.windspeed },
        visibility: weatherData.hourly.visibility[safeIndex],
      });

      toast(`Weather data loaded for ${name}`, "success");
    } catch (err) {
      console.error("Fetch failed:", err);
      setError("Unable to fetch live weather. Loading demo data...");
      toast("Demo Mode: Showing sample data instead of live API", "error");
      loadDemoData(city);
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = (cityName) => {
    const lowerCity = cityName.toLowerCase();
    let demo;

    switch (lowerCity) {
      case "cape town":
        demo = { name: "Cape Town", sys: { country: "ZA" }, main: { temp: 18, feels_like: 17, humidity: 70, pressure: 1012 }, weather: [{ main: "Clouds", description: "partly cloudy" }], wind: { speed: 4 }, visibility: 9000 };
        break;
      case "durban":
        demo = { name: "Durban", sys: { country: "ZA" }, main: { temp: 25, feels_like: 27, humidity: 80, pressure: 1010 }, weather: [{ main: "Rain", description: "light rain" }], wind: { speed: 3 }, visibility: 7000 };
        break;
      case "johannesburg":
        demo = { name: "Johannesburg", sys: { country: "ZA" }, main: { temp: 22, feels_like: 20, humidity: 65, pressure: 1013 }, weather: [{ main: "Clear", description: "clear sky" }], wind: { speed: 3.5 }, visibility: 10000 };
        break;
      default:
        demo = { name: cityName || "Unknown City", sys: { country: "ZA" }, main: { temp: 20, feels_like: 19, humidity: 60, pressure: 1012 }, weather: [{ main: "Clear", description: "clear sky" }], wind: { speed: 3 }, visibility: 10000 };
    }

    setWeather(demo);
  };

  return (
    <div className="page">
      <ToastContainer />
      <h1 className="title">Weather Dashboard</h1>

      <form onSubmit={handleSearch} className="search">
        <Input
          placeholder="Enter city (e.g., Johannesburg)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button disabled={loading}>
          {loading ? <Loader2 className="spin" /> : <Search />}
        </Button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="results">
          <Card>
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>{weather.weather[0].description}</p>
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <p>Feels like {Math.round(weather.main.feels_like)}°C</p>
          </Card>

          <div className="grid">
            <Card icon={<Droplets />} label="Humidity" value={`${weather.main.humidity}%`} />
            <Card icon={<Wind />} label="Wind" value={`${weather.wind.speed} m/s`} />
            <Card icon={<Gauge />} label="Pressure" value={`${weather.main.pressure} hPa`} />
            <Card icon={<Eye />} label="Visibility" value={`${(weather.visibility / 1000).toFixed(1)} km`} />
          </div>
        </div>
      )}

      <Card>
        <h3>Technical Implementation</h3>
        <ul>
          <li>Live Open-Meteo API integration for any city worldwide (no API key needed)</li>
          <li>Humidity, pressure, visibility are accurately fetched from hourly data</li>
          <li>Automatic fallback to city-specific demo data if API fails</li>
          <li>Async/Await, fetch(), error handling</li>
          <li>React state management (useState)</li>
          <li>Responsive UI cards for weather metrics</li>
        </ul>
      </Card>
    </div>
  );
}
