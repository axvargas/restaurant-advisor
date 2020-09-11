import React, { useRef, useState, useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import Toast from 'react-native-easy-toast';
import ListTopRestaurants from '../../components/topRestaurants/listTopRestaurants';

import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app'
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

const TopRestaurants = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState(null);
    const toastRef = useRef()
    useEffect(() => {
        const getRestaurants = async () => {
            const response = await db.collection('restaurants')
                .orderBy('rating', 'desc')
                .limit(5)
                .get()
            const restaurantsData = [];
            response.forEach((doc) => {
                let restaurant = doc.data();
                restaurant.id = doc.id
                restaurantsData.push(restaurant)
            })
            setRestaurants(restaurantsData);
        }
        getRestaurants();
    }, [])
    return (
        <View>
            <ListTopRestaurants restaurants={restaurants} navigation={navigation} />
            <Toast ref={toastRef} position='center' opacity={0.8} />
        </View>
    )
}
export default TopRestaurants;
