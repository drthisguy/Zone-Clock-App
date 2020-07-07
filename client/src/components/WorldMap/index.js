import React, { useEffect } from 'react';
import API from '../../utils/API';

export function WorldMap({ coords }) {

    useEffect(() => {
        loadMap()
    }, [coords])

    const loadMap = () => {
        const url = API.getMapSrcUrl()
        window.initMap = initMap;
        
        loadScript(url)
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
        const index = window.document.getElementsByTagName('script')[0]

        const script = window.document.createElement('script');
            script.src = url
            script.async = true
            script.defer = true

        index.parentNode.insertBefore(script, index);
    }

    return (
        <main>
            <div id='map' />
        </main>
    )
}