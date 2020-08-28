import React, { useState, useEffect } from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import Modal from '../../../modal';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
const Map = ({ loc, setLoc, isVisibleMap, setIsVisibleMap, toastRef, TOAST_DURATION }) => {
    const [location, setLocation] = useState(loc)
    useEffect(() => {
        if (!location) {
            (async () => {
                const { permissions } = await Permissions.askAsync(Permissions.LOCATION)
                const statusPermissionsLocation = permissions.location.status;
                if (statusPermissionsLocation === 'denied') {
                    toastRef.current.show("It's necesary to accept the permission to google maps", TOAST_DURATION);
                } else if (statusPermissionsLocation === 'granted') {
                    try {
                        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
                        setLocation({
                            latitude,
                            longitude,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001
                        });
                    } catch (error) {
                        const { message } = error;
                        toastRef.current.show(message, TOAST_DURATION);
                    }
                }
            })()
        }
    }, [])
    return (
        <Modal
            isVisible={isVisibleMap}
            setIsVisible={setIsVisibleMap}
        >
            <View style={styles.view}>
                {location ?
                    <>
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={location}
                            showsUserLocation={true}
                            onRegionChange={(region) => {
                                setLocation(region)
                            }}
                        >
                            <MapView.Marker
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude
                                }}
                                draggable
                            />
                        </MapView>
                        <View style={styles.viewBtnStyle}>
                            <Button
                                title="Save location"
                                containerStyle={styles.ctnSaveStyle}
                                buttonStyle={styles.btnSaveStyle}
                                onPress={() => {
                                    setLoc(location);
                                    toastRef.current.show("Location updated succesfully", TOAST_DURATION)
                                    setIsVisibleMap(false);
                                }}
                            />
                            <Button
                                title="Cancel location"
                                containerStyle={styles.ctnCancelStyle}
                                buttonStyle={styles.btnCancelStyle}
                                onPress={() => {
                                    toastRef.current.show("Location canceled", TOAST_DURATION)
                                    setIsVisibleMap(false);
                                }}
                            />
                        </View>
                    </>
                    :
                    <ActivityIndicator size="large" color='#00a680' />
                }
            </View>
        </Modal>
    )
}

export default Map;

const styles = StyleSheet.create({
    view: {
        alignItems: 'center'
    },
    mapStyle: {
        width: '100%',
        height: 500
    },
    viewBtnStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    ctnCancelStyle: {
        paddingLeft: 5
    },
    btnCancelStyle: {
        backgroundColor: '#bf4444'
    },
    ctnSaveStyle: {
        paddingRight: 5
    },
    btnSaveStyle: {
        backgroundColor: '#00a680'
    }
})
