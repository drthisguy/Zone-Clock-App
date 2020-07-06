import React from 'react'
import API from '../../utils/API'

export function WorldMap() {

    const map = document.createElement('div');
    map.classList.add('map');

    const loadMaps = async() => {
        const script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.src = await API.getMapSrcUrl();
            
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // initMap = (coords) => {
    //     var display = new google.maps.Map(document.getElementById("map"), {
    //       zoom: 10,
    //       center: coords,
    //       disableDefaultUI: true
    //     }),
    //     marker = new google.maps.Marker({ position: coords, map: display });
    // };
    loadMaps();

    return (
        <div>
            
        </div>
    )
}
