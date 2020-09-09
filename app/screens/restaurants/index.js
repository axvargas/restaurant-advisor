import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app'
import 'firebase/firestore';
import ListRestaurants from '../../components/restaurants/listRestaurants';
const db = firebase.firestore(firebaseApp);
const Restaurants = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const [startRestaurant, setStartRestaurant] = useState(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const LIMIT_RESTAURANTS = 7
    useEffect(() => {
        const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
            !user ? setUser(null) : setUser(user);
        });
        return () => {
            unsubscriber();
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            const getSnap = async () => {
                const { size } = await db.collection('restaurants').get()
                setTotalRestaurants(size);
            }
            const getRestaurants = async () => {
                const resultRestaurants = [];
                const response = await db.collection('restaurants').orderBy('createAt', 'desc').limit(LIMIT_RESTAURANTS).get()
                setStartRestaurant(response.docs[response.docs.length - 1]);
                response.forEach((doc) => {
                    const restaurant = doc.data();
                    restaurant.id = doc.id;
                    resultRestaurants.push(restaurant);
                })
                setRestaurants(resultRestaurants);
            }
            getSnap();
            getRestaurants();

        }, [])
    );

    const handleLoadMore = async () => {
        const resultRestaurants = [];
        restaurants.length < totalRestaurants && setIsLoadingMore(true);
        const response = await db.collection('restaurants')
            .orderBy('createAt', 'desc')
            .startAfter(startRestaurant)
            .limit(LIMIT_RESTAURANTS)
            .get()
        if (response.docs.length > 0) {
            setStartRestaurant(response.docs[response.docs.length - 1]);
        } else {
            setIsLoadingMore(false);
        }
        response.forEach((doc) => {
            const restaurant = doc.data();
            restaurant.id = doc.id;
            resultRestaurants.push(restaurant);
        })
        setRestaurants([...restaurants, ...resultRestaurants]);
    }
    return (
        <View style={styles.viewBody}>
            {restaurants &&
                <ListRestaurants restaurants={restaurants} handleLoadMore={handleLoadMore} isLoadingMore={isLoadingMore} />
            }
            {user && (
                <Icon
                    reverse
                    raised
                    type='material-community'
                    name='plus'
                    color='#00a680'
                    containerStyle={styles.ctnBtn}
                    onPress={() => {
                        navigation.navigate('addRestaurant')
                    }}
                />
            )}

        </View>
    )
}
export default Restaurants;

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: '#fff'
    },
    ctnBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    }
})