import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Cloud,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Wind,
  Droplets,
  ThermometerSun,
  Umbrella,
  CloudRain,
  CloudLightning,
  CloudSnow,
} from "lucide-react";

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animateCloud, setAnimateCloud] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  /* =========================
     FETCH WEATHER FROM BACKEND
     ========================= */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/weather");

        // 🔁 Transform DB data → UI-safe format
        const transformed = res.data.map((w, index) => ({
          date: new Date(Date.now() + index * 86400000)
            .toISOString()
            .split("T")[0],
          temperature: w.temperature,
          humidity: `${w.humidity}%`,
          wind: "10 km/h",
          precipitation: w.rainfall || "0%",
          description: w.advisory || "No advisory available",
          condition:
            w.rainfall && parseInt(w.rainfall) > 20
              ? "light-rain"
              : "mostly-sunny",
          details: {
            morning: `${(w.temperature - 1).toFixed(1)}°C`,
            afternoon: `${(w.temperature + 1).toFixed(1)}°C`,
            evening: `${w.temperature.toFixed(1)}°C`,
            night: `${(w.temperature - 2).toFixed(1)}°C`,
          },
        }));

        setWeatherData(transformed);
        setLoading(false);
      } catch (err) {
        console.error("❌ Weather fetch failed", err);
        setLoading(false);
      }
    };

    fetchWeather();

    // 🔄 Auto refresh every 10 min
    const refresh = setInterval(fetchWeather, 600000);
    return () => clearInterval(refresh);
  }, []);

  /* =========================
     UI ANIMATIONS TIMER
     ========================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setAnimateCloud((p) => !p);
      setAnimationFrame((p) => (p + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading weather data...</p>
      </div>
    );
  }

  const today = weatherData[0];

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

  /* =========================
     WEATHER ICON MAPPER
     ========================= */
  const getWeatherIcon = (condition, size = 24) => {
    const props = { size };
    switch (condition) {
      case "sunny":
        return <Sun color="#f7c35f" {...props} />;
      case "mostly-sunny":
        return <Sun color="#f7c35f" {...props} />;
      case "cloudy":
        return <Cloud {...props} />;
      case "light-rain":
        return <CloudRain {...props} />;
      case "stormy":
        return <CloudLightning {...props} />;
      case "snowy":
        return <CloudSnow {...props} />;
      default:
        return <Cloud {...props} />;
    }
  };

  /* =========================
     JSX STARTS
     ========================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* HEADER */}
        <div className="bg-white rounded-lg p-4 flex justify-between items-center shadow-lg mb-6">
          <h1 className="text-3xl font-bold text-smart-green flex items-center">
            Weather Forecast
            <span className="ml-2">{getWeatherIcon(today.condition, 32)}</span>
          </h1>
          <div className="text-sm text-gray-500">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>

        {/* TODAY CARD */}
        <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-2">
            Today – {formatDate(today.date)}
          </h2>
          <div className="flex items-center">
            <span className="text-4xl font-bold text-smart-green">
              {today.temperature.toFixed(1)}°C
            </span>
            <div className="ml-4">{getWeatherIcon(today.condition, 48)}</div>
          </div>

          <p className="mt-3 text-gray-600">{today.description}</p>

          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div className="flex items-center">
              <Droplets className="mr-2" /> {today.humidity}
            </div>
            <div className="flex items-center">
              <Wind className="mr-2" /> {today.wind}
            </div>
            <div className="flex items-center">
              <Umbrella className="mr-2" /> {today.precipitation}
            </div>
          </div>
        </div>

        {/* 7 DAY FORECAST */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-smart-green p-4 text-white font-bold">
            7-Day Forecast
          </div>

          <div className="flex overflow-x-auto p-4 space-x-4">
            {weatherData.map((day, index) => (
              <div
                key={index}
                className={`min-w-[140px] border rounded-lg p-3 cursor-pointer ${
                  selectedDay === index
                    ? "border-smart-yellow shadow-md"
                    : "border-gray-200"
                }`}
                onClick={() =>
                  setSelectedDay(selectedDay === index ? null : index)
                }
              >
                <p className="text-sm font-medium">
                  {formatDate(day.date).split(",")[0]}
                </p>
                <div className="text-2xl font-bold text-smart-green">
                  {day.temperature.toFixed(1)}°C
                </div>
                <div className="flex justify-center mt-2">
                  {getWeatherIcon(day.condition, 28)}
                </div>
              </div>
            ))}
          </div>

          {selectedDay !== null && (
            <div className="p-4 border-t">
              <h3 className="font-bold mb-2">
                {formatDate(weatherData[selectedDay].date)}
              </h3>
              <p className="text-gray-600 mb-2">
                {weatherData[selectedDay].description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <Sunrise /> {weatherData[selectedDay].details.morning}
                </div>
                <div>
                  <Sun /> {weatherData[selectedDay].details.afternoon}
                </div>
                <div>
                  <Sunset /> {weatherData[selectedDay].details.evening}
                </div>
                <div>
                  <Moon /> {weatherData[selectedDay].details.night}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Live data from MongoDB • Auto-refresh every 10 minutes
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
