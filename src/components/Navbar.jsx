import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext'; // Import DataContext

const Navbar = () => {
  const [cityName, setCityName] = useState('');
  const { weatherData, setWeatherData } = useContext(DataContext); // Access weatherData and setWeatherData from DataContext
  const apiKey = '5cf0288f3687726736bc27eaa57978cf';

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  const handleSearchKeyPress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName || 'Alwar'}&appid=${apiKey}&units="metric"`
        );
  
        setWeatherData(response.data); // Update weatherData in DataContext
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      }
      setCityName("");
    }
   
    
  };

  return (
    <>
      <div className="Navbar flex items-center justify-between  p-8">
        <h1 className="text-white text-3xl px-10 text-blue-1700 border-blue-500">Weather</h1>
        <input
          type="text"
          placeholder="Search a City"
          className="px-14 py-1 rounded-lg bg-white text-black-800 text-left placeholder-black-400 w-60 mx-10    border-2 border-black-600  focus:outline-none focus:border-black-700"
          value={cityName}
          onChange={handleChange}
          onKeyPress={handleSearchKeyPress}

        />
       
      </div>
    </>
  );
};

export default Navbar;
