import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';

import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import { firebaseApp } from '../../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Loading from '../../../components/loading';
import MyCarousel from '../../../components/myCarousel';
import TitleRestaurant from '../../../components/restaurants/titleRestaurant';
import RestaurantInfo from '../../../components/restaurants/restaurantInfo';
import ListReviews from '../../../components/restaurants/listReviews'
import { Dimensions } from 'react-native';
const db = firebase.firestore(firebaseApp);
const SCREEN_WIDTH = Dimensions.get('window').width;
const Restaurant = ({ route, navigation }) => {
    const { params: { name, id } } = route;
    navigation.setOptions({ title: name });

    const [restaurant, setRestaurant] = useState(null);
    const [rating, setRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const TOAST_DURATION = 3000;
    const toastRef = useRef();

    useFocusEffect(
        useCallback(() => {
            const getRestaurant = async () => {
                const response = await db.collection('restaurants')
                    .doc(id)
                    .get()
                let data = response.data();
                data.id = response.id;
                setRestaurant(data);
                setRating(data.rating);
            }
            getRestaurant()
        }, [])
    );

    useEffect(() => {
        const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
            try {
                if (!user) {
                    setUserLogged(false);
                } else {
                    setUserLogged(true);
                    if (restaurant) {
                        const response = await db.collection('favorites')
                            .where('idRestaurant', '==', restaurant.id)
                            .where('idUser', '==', firebase.auth().currentUser.uid)
                            .get()
                        if (response.docs.length > 0) {
                            setIsFavorite(true);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });
        return () => {
            unsubscriber();
        }
    }, [restaurant])

    const addFavorite = async () => {
        if (!userLogged) {
            toastRef.current.show("Log in first too set this restaurant as favorite", TOAST_DURATION);
        } else {
            const payload = {
                idUser: firebase.auth().currentUser.uid,
                idRestaurant: restaurant.id
            }
            try {
                await db.collection('favorites').add(payload);
                setIsFavorite(true);
                toastRef.current.show("Added to favorites", TOAST_DURATION);
            } catch (error) {
                toastRef.current.show("There was an error :(, try it later", TOAST_DURATION);
            }

        }
    }

    const removeFavorite = async () => {
        const response = await db.collection('favorites')
            .where('idRestaurant', '==', restaurant.id)
            .where('idUser', '==', firebase.auth().currentUser.uid)
            .get()
        response.forEach(async (doc) => {
            const idFavorite = doc.id;
            try {
                await db.collection('favorites')
                    .doc(idFavorite)
                    .delete()
                setIsFavorite(false);
                toastRef.current.show("Removed from favorites", TOAST_DURATION);
            } catch (error) {
                toastRef.current.show("There was an error :(, try it later", TOAST_DURATION);
            }


        });
    }

    if (!restaurant) return <Loading isVisible={true} text="Loading..." />
    return (
        <ScrollView style={styles.viewBody}>
            <View style={styles.viewFavorites}>
                <Icon
                    type="material-community"
                    name={isFavorite ? "heart" : "heart-outline"}
                    onPress={isFavorite ? removeFavorite : addFavorite}
                    color='#00a680'
                    size={35}
                    underlayColor='transparent'
                />
            </View>
            <MyCarousel
                arrayImages={restaurant.images}
                height={250}
                width={SCREEN_WIDTH}
            />
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={rating}
            />
            <RestaurantInfo
                location={restaurant.location}
                name={restaurant.name}
                address={restaurant.address}
            />
            <ListReviews
                navigation={navigation}
                idRestaurant={restaurant.id}
            />
            <Toast ref={toastRef} position="top" opacity={0.8} />
        </ScrollView>
    )
}

export default Restaurant

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: '#fff'
    },
    viewFavorites: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15
    }
})
