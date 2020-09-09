import React from 'react'
import MapView from 'react-native-maps'
import openMap from 'react-native-open-maps'
import { Platform } from "react-native";
const Map = ({ location, name, height }) => {
    console.log("NAME :", name);
    console.log("LOCATION :", location);
    const openAppMap = () => {
        if (Platform.OS === "ios") {
            openMap({
                latitude: location.latitude,
                longitude: location.longitude,
                zoom: 19,
                query: name
            })
        } else {
            openMap({
                zoom: 19,
                query: `${location.latitude},${location.longitude}`
            })
        }

    }
    return (
        <MapView
            style={{ height: height, width: '100%' }}
            initialRegion={location}
            onPress={openAppMap}
        >
            <MapView.Marker
                coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude
                }}
            />
        </MapView>
    )
}

export default Map

