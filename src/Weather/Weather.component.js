import "./Weather.css";
import React, { useState } from "react";
import WeatherWidget from "../WeatherWidget/WeatherWidget.component";
import Loader from "../Loader/Loader.component";

const Weather = () => {
  const locationApi = "pk.3e99da5cfbeedcc7dab4d88e4734aeb2";
  const weatherApi = "dc2e39eadd65d37fea79a34ca9ed1e0f";

  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getWeatherReport = () => {
    //   Resetting error message and loading screen
    setError(false);
    setIsLoading(true);
    setWeather("");

    // getting location
    fetch(
      `https://eu1.locationiq.com/v1/search.php?key=${locationApi}&q=${location}&format=json`
    )
      .then((data) => data.json())
      .then((location) => {
        //   getting weather if location exist
        if (location) {
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${location[0].lat}&lon=${location[0].lon}&units=metric&exclude=current,minutely,hourly&appid=${weatherApi}`
          )
            .then((data) => data.json())
            .then((response) => {
              setWeather(response.daily.slice(1, 8));
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
              setError(true);
            });
        }
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  };

  return (
    <div className="main">
      <input
        type="text"
        placeholder="Enter Your Location"
        onChange={(event) => setLocation(event.target.value)}
      />
      <button onClick={getWeatherReport}>Get Weather</button>

      {/* Error handling */}
      {error && (
        <p className="err"> Something went wrong, please try again!! </p>
      )}

      {/* Show Weather widget only when weather data is avaiable  */}
      {weather &&
        weather.map((item) => {
          return <WeatherWidget data={item} key={item.dt} />;
        })}

      {/* Loading screen */}
      {isLoading && <Loader />}
    </div>
  );
};

export default Weather;
