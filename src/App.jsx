import './App.css'
import WeatherComponent from './components/WeatherComponent'
import { useState } from "react";
import LocationComponent from './components/LocationComponent';


function App() {
  return (
    <>
      <LocationComponent />
      <WeatherComponent />
    </>
  )
}

export default App
