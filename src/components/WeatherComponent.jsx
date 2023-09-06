import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../features/weatherSlice';
import { useEffect, useState } from 'react';
import MoonLoader from "react-spinners/MoonLoader";


function WeatherComponent() {
    const dispatch = useDispatch();
    const weatherData = useSelector((state) => state.weather.data);
    const weatherStatus = useSelector((state) => state.weather.status);
    let [color, setColor] = useState("red");

    const handleFetchWeather = (coords) => {
        dispatch(fetchWeather(coords));
    };

    useEffect(() => {
        console.log(weatherData.base)
        console.log(weatherStatus)
    }, [weatherData])

    return (
        <div>
            <button onClick={() => handleFetchWeather({ lat: 40.7128, lon: 74.0060 })}>
                Fetch New York Weather
            </button>
            {weatherStatus === 'loading' && <MoonLoader
                color={color}
                loading={weatherStatus}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
            />}
            {weatherStatus === 'succeed' && <div>{weatherData.main.temp}</div>}
        </div>
    );
}

export default WeatherComponent;