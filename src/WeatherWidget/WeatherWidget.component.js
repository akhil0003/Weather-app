import "./WeatherWidget.css";

const WeatherWidget = ({ data }) => {
  const date = new Date(data.dt * 1000).toDateString();
  const weather = data.weather[0];
  return (
    <div className="widgetContainer">
      <div>{date}</div>
      <div>
        <div className="descContainer">
          {weather.description}
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      </div>
      <div>Max: {data.temp.max}&#176;</div>
      <div>Min: {data.temp.min}&#176;</div>
    </div>
  );
};

export default WeatherWidget;
