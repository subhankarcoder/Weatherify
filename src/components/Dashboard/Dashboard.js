import React, { useState, useEffect } from "react";
import SunImg from "../../Assets/Images/sun.png"
import CloudImg from "../../Assets/Images/cloud.png"
import SearchImg from "../../Assets/Images/search-interface-symbol.png"
import "./Dashboard.css";

const Dashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours} : ${minutes} : ${seconds}`;
  };
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options); 

    return `${formattedDate}`;
  };

  return (
    <div className="dash-holder">
      <div className="home-img">
        <h1>
          Kolkata <br />
          <span>IN</span>
        </h1>
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
              <img src={SunImg}/>
          </div>
          <div className="weather-details">
                <p className="details-wet">Sunny</p>
                <p className="humidity">Humidity</p>
                <h1>65%</h1>
          </div>
        </div>
        <div className="temparature">
          <h1>25<span>°</span></h1>
          <p>TEMPERATURE</p>
        </div>
      </div>
      <div className="Search">
        <input type="text" placeholder="Enter place to search...">
        </input>
        <img src={SearchImg} />
      </div>
      <div className="search-place">
        <div className="place place-dummy">
          {/* <img src={CloudImg} />
          <p>Delhi,IN</p> */}
        </div>
        <div className="place place-humidity">
        <img src={CloudImg} />
          <p>Delhi,IN</p>
        </div>
        <div className="place place-humidity">
          <h1>65%</h1>
          <p>Humidity</p>
        </div>
        <div className="place place-humidity">
        <h1>10000<span>ml</span></h1>
          <p>Visibility</p>
        </div>
        <div className="place place-humidity">
        <h1>15°</h1>
          <p>Temperature</p>
        </div>
        <div className="place place-humidity place-special">
        <h1>3 <span>Km/h</span></h1>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
