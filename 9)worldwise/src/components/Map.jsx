import { useNavigate, useSearchParams } from 'react-router-dom'
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent} from "react-leaflet"
import styles from './Map.module.css'
import { useEffect, useState } from 'react'
import { useCities } from '../contexts/CitiesContext'
import Button from './Button'
import { useGeolocation } from '../hooks/UseGeolocation'
import UseUrlPosition from '../hooks/UseUrlPosition'


function Map() {
    const {cities,flagemojiToPNG}=useCities()
    
    const [position,setPosition]=useState([48.864716,2.349014])
    
    const {isLoading:isGeoLocationLoading,position:geoLocationPosition,getPosition}=useGeolocation()
    const [mapLat,mapLng]=UseUrlPosition()

    useEffect(function(){
        if(geoLocationPosition) setPosition([geoLocationPosition.lat,geoLocationPosition.lng])
        
    },[geoLocationPosition])

    useEffect(function(){
        if(mapLat && mapLng) setPosition([mapLat,mapLng])
    },[mapLat,mapLng])
    return (
        <div className={styles.mapContainer}>
            <Button type="position" clickEvent={getPosition}>{
            isGeoLocationLoading?"Loading...":"Use your position"
            }</Button>
        {/* <div className={styles.mapContainer} onClick={()=>{navigate("form")}}> */}
            <MapContainer className={styles.map} center={position} zoom={6} scrollWheelZoom={true}>
            <TileLayer
                    // attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                    // url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                    // subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {
                    cities.map(city=><Marker position={[city.position.lat,city.position.lng]} key={city.id}>
                                        <Popup>
                                            <span>{flagemojiToPNG(city.emoji)}</span>
                                            <span>{city.cityName}</span>
                                        </Popup>
                                    </Marker>)
                }
                <ChangeMapPosition position={position}></ChangeMapPosition>
                <DetectClicks></DetectClicks>
            </MapContainer>
        </div>
    )
}
function ChangeMapPosition({position}){
    const map=useMap()
    if(! position[0]&& !position[1]) return   
    map.setView(position)
    
}
function DetectClicks(){
    const navigate=useNavigate()
    useMapEvent({
        click: e=>{
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}

export default Map
