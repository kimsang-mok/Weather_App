import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../features/weatherSlice';

function WeatherComponent() {
    const dispatch = useDispatch();
    const weatherData = useSelector((state) => state.weather.data);
    const weatherStatus = useSelector((state) => state.weather.status);

    const handleFetchWeather = (coords) => {
        dispatch(fetchWeather(coords));
    };
    console.log(weatherData)

    return (
        <div>
            <button onClick={() => handleFetchWeather({ lat: 40.7128, lon: 74.0060 })}>
                Fetch New York Weather
            </button>
            {weatherStatus === 'loading' && <p>Loading...</p>}
            {weatherStatus === 'succeeded' && <div>{weatherData.main.temp}</div>}
            {/* Render more weather details here */}
        </div>
    );
}

export default WeatherComponent;