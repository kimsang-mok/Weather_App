import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocation } from '../features/locationSlice';

function LocationComponent() {
    const dispatch = useDispatch()
    const locationData = useSelector((state) => state.location.data)
    const locationStatus = useSelector((state) => state.location.status)
    const locationError = useSelector((state) => state.location.error)

    useEffect(() => {
        dispatch(fetchLocation())
    }, [])

    console.log(locationData)

    return (
        <div>
            <button>Fetch my location</button>
            {locationStatus === "loading" && <p>Loading...</p>}
            {locationStatus === 'succeed' && (
                <div>
                    <p>Latitude: {locationData.latitude}</p>
                    <p>Longitude: {locationData.longitude}</p>
                </div>
            )}
            {locationError && <p>Error: {locationError}</p>}
        </div >
    )
}

export default LocationComponent