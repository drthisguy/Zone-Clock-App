import React, { useEffect } from 'react';
import API from '../../utils/API';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const googleAPIKey = process.env.REACT_APP_GOOGLE_APIKEY;

export function WorldMap({ coords }) {

    useEffect(() => {
        loadMap()
    }, [coords])

    const loadMap = () => {
        loadScript(`https://maps.googleapis.com/maps/api/js?callback=initMap&key=${googleAPIKey}`)
        window.initMap = initMap;
    },

    initMap = () => {
        const display = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: coords,
          disableDefaultUI: true
        }),
        marker = new window.google.maps.Marker({ position: coords, map: display });
    },

    loadScript = (url) => {
        let index = window.document.getElementsByTagName('script')[0]

        let script = window.document.createElement('script');
            script.src = url
            script.async = true
            script.defer = true

        index.parentNode.insertBefore(script, index);
    }

    return (
        <main>
            <div id='map' >

            </div>
        </main>
    )
}