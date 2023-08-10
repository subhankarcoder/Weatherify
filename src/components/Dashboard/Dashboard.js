//Initialization of files
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchImg from "../../Assets/Images/search-interface-symbol.png";
import apikey from "../apikey";
import ReactAnimatedWeather from "react-animated-weather";
import "./Dashboard.css";

//Making a "defaults" object to call it when needed. This is for weather icons
const defaults = {
  color: "black",
  size: 70,
  animate: true,
};


//Start of the main functional component
const Dashboard = () => {
  //Setting state for  current date
  const [time, setTime] = useState(new Date());
  //Setting state of "weatherData" as an object to find out latitude and longitutude.
  //NOTE : lat and lon are the unique keys here by which the data will be called 
  const [weatherData, setWeatherData] = useState({
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  });

  //Setting "query" state for search
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  //Setting weather state to store data of searched place
  const [weather, setWeather] = useState({});


//Using a useEffect to get data
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    //Removing old time in the callback function
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  //calling another useEffect for data fetching
  useEffect(() => {
    //navigator.geolocation is a inbuilt function from openWeather which fetchs the latitude and longitude, if it is true then...
    if (navigator.geolocation) {
      //Returing a promise
      getPosition()
        .then((position) => {
          //Getting lat lon from in built function
          getWeather(position.coords.latitude, position.coords.longitude);
          console.log("weather detected!");
        })
        .catch((err) => {
          //Putting dummy value for user refusal or other errors
          getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    //Getting lat lon after every 1 minute
    const timerID = setInterval(
      () => getWeather(weatherData.lat, weatherData.lon),
      600000
    );

    return () => clearInterval(timerID);
  }, []);


  //returning the promise of geolocation (default unction call)
  const getPosition = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  //FETCH API
  const getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apikey.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apikey.key}`
    );
    const data = await api_call.json();
    //If data.weather is returning something (i.e length > 0) then get its value
    const main =
      data.weather && data.weather.length > 0 ? data.weather[0].main : null;

    setWeatherData((prevWeatherData) => ({
      ...prevWeatherData,
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: main,
      country: data.sys.country,
      icon: getWeatherIcon(main),
    }));
  };

  //Perform search function, default location is Delhi
  useEffect(() => {
    search("Delhi");
  }, []);

  //Getting the API again from axios to perform search
  //Until and unless city is returning a null object it will get the API
  const search = (city) => {
    axios
      .get(
        `${apikey.base}weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apikey.key}`
      )
      .then((response) => {
        //Setting the response data in updated state
        setWeather(response.data);
        //Clearing search input
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather({});
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  //Defining weather cases in "Switch case"
  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Haze":
        return "CLEAR_DAY";
      case "Clouds":
        return "CLOUDY";
      case "Rain":
        return "RAIN";
      case "Snow":
        return "SNOW";
      case "Dust":
        return "WIND";
      case "Drizzle":
        return "SLEET";
      case "Fog":
      case "Smoke":
        return "FOG";
      case "Tornado":
        return "WIND";
      default:
        return "CLEAR_DAY";
    }
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours} : ${minutes} : ${seconds}`;
  };
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString(undefined, options);

    return `${formattedDate}`;
  };

  return (
    <div className="dash-holder">
      <div className="home-img">
        {weatherData.city ? (
          <h1>
            {weatherData.city} <br />
            <span>{weatherData.country}</span>
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className="info">
        <div className="date-time">
          <div className="date-time-info">
            <h4>Today's Information</h4>
            <h1>{formatTime(time)}</h1>
            <p>{formatDate(time)}</p>
          </div>
        </div>
        <div className="weather">
          <div className="weather-img">
            <ReactAnimatedWeather
              icon={weatherData.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          </div>
          <div className="weather-details">
            <p className="details-wet">{weatherData.main}</p>
            <p className="humidity">Humidity</p>
            <h1>{weatherData.humidity}%</h1>
          </div>
        </div>
        <div className="temparature">
          <h1>
            {" "}
            {weatherData.temperatureC}
            <span>°</span>
          </h1>
          <p>TEMPERATURE</p>
        </div>
      </div>
      <div className="Search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        ></input>
        <img src={SearchImg} onClick={search} />
      </div>
      <div className="search-place">
        <div className="place place-dummy">
          {/* <img src={CloudImg} />
          <p>Delhi,IN</p> */}
        </div>
        <div className="place place-humidity">
          {weather.weather && weather.weather.length > 0 && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            />
          )}
          <p>
            {weather.name}, {weather.sys.country}
          </p>
        </div>
        <div className="place place-humidity">
          <h1>{Math.round(weather.main.humidity)}%</h1>
          <p>Humidity</p>
        </div>
        <div className="place place-humidity">
          <h1>
            {Math.round(weather.visibility)}
            <span>ml</span>
          </h1>
          <p>Visibility</p>
        </div>
        <div className="place place-humidity">
          <h1>{Math.round(weather.main.temp)}°</h1>
          <p>Temperature</p>
        </div>
        <div className="place place-humidity place-special">
          <h1>
            {Math.round(weather.wind.speed)} <span>Km/h</span>
          </h1>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
