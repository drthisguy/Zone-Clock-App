import React, { useEffect } from 'react';
import API from '../../utils/API';
import mapStyle from './mapStyle.json'

export function WorldMap({ coords }) {

    useEffect(() => {
        const loadMap = () => {
            const url = API.getMapSrcUrl()
            window.initMap = initMap;
            
            loadScript(url)
        },
        initMap = () => {
            const display = new window.google.maps.Map(document.getElementById('map'), {
              zoom: 1.75,
              center: coords,
              disableDefaultUI: true,
              styles: mapStyle
            })
            const marker = new window.google.maps.Marker({ position: coords, map: display });
        }
        loadMap()
    }, [coords])


    const loadScript = (url) => {
        const index = window.document.getElementsByTagName('script')[0],

        script = window.document.createElement('script');
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