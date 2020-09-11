import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native'


import Loading from '../../components/loading';
import NoFavorites from '../../components/favorites/noFavorites';
import NoLogged from '../../components/favorites/noLogged';
import RestaurantFav from '../../components/favorites/restaurantFav';
import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/firestore';
import Toast from 'react-native-easy-toast';

const db = firebase.firestore(firebaseApp);
const Favorites = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState(null);
    const [userLogged, setUserLogged] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [sthRemoved, setSthRemoved] = useState(false)
    const TOAST_DURATION = 3000;

    const toastRef = useRef();
    useEffect(() => {
        const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
            try {
                !user ? setUserLogged(false) : setUserLogged(true);
            } catch (error) {
                console.log(error);
            }
        });
        return () => {
            unsubscriber();
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            const getRestaurantsIds = async () => {
                const idUser = firebaseApp.auth().currentUser.uid;
                const response = await db.collection('favorites')
                    .where('idUser', '==', idUser)
                    .get()

                let idRestaurantsArray = [];
                response.forEach((doc) => {
                    idRestaurantsArray.push(doc.data().idRestaurant);
                })
                const restaurantsRawData = await getDataRestaurants(idRestaurantsArray);
                setRestaurants(restaurantsRawData);

            }
            if (userLogged) {
                getRestaurantsIds();
                setSthRemoved(false);
            }
        }, [userLogged, sthRemoved])
    );

    const getDataRestaurants = async (idRestaurantsArray) => {
        let arrayRestaurants = []
        await Promise.all(
            idRestaurantsArray.map(async (id, i) => {
                const result = await db.collection('restaurants').doc(id).get();
                let restaurant = result.data();
                restaurant.id = result.id;
                arrayRestaurants.push(restaurant);
            })
        )
        return arrayRestaurants;
    }

    if (userLogged === false) return <NoLogged navigation={navigation} />
    if (!restaurants) {
        return (
            <View style={styles.viewLoader}>
                <ActivityIndicator size="large" color='#00a680' />
                <Text style={styles.textLoader}>LOADING FAVORITES</Text>
            </View>
        )
    } else if (restaurants.length === 0) {
        return <NoFavorites />
    }

    return (
        <>
            <FlatList
                data={restaurants}
                renderItem={(restaurant) =>
                    <RestaurantFav
                        restaurant={restaurant}
                        toastRef={toastRef}
                        TOAST_DURATION={TOAST_DURATION}
                        setIsLoading={setIsLoading}
                        setSthRemoved={setSthRemoved}
                        navigation={navigation}
                    />
                }
                keyExtractor={(restaurant) => restaurant.id}
            />
            <Toast ref={toastRef} position='top' opacity={0.8} />
            <Loading isVisible={isLoading} text="REMOVING FROM FAVS" />
        </>
    )
}
export default Favorites;

const styles = StyleSheet.create({
    viewLoader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLoader: {
        marginTop: 20,
        color: '#00a680',
        fontWeight: 'bold'
    }
})