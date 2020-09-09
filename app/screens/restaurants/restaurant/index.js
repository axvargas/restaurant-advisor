import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { firebaseApp } from '../../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Loading from '../../../components/loading';
import MyCarousel from '../../../components/myCarousel';
import TitleRestaurant from '../../../components/restaurants/titleRestaurant';
import RestaurantInfo from '../../../components/restaurants/restaurantInfo';
import { Dimensions } from 'react-native';
const db = firebase.firestore(firebaseApp);
const SCREEN_WIDTH = Dimensions.get('window').width;
const Restaurant = ({ route, navigation }) => {
    const { params: { name, id } } = route;
    navigation.setOptions({ title: name });

    const [restaurant, setRestaurant] = useState(null);
    const [rating, setRating] = useState(0)

    useEffect(() => {
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
    if (!restaurant) return <Loading isVisible={true} text="Loading..." />
    return (
        <ScrollView style={styles.viewBody}>
            <MyCarousel
                arrayImages={restaurant.images}
                height={250}
                width={SCREEN_WIDTH}
            />
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
            <RestaurantInfo
                location={restaurant.location}
                name={restaurant.name}
                address={restaurant.address}
            />
        </ScrollView>
    )
}

export default Restaurant

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
