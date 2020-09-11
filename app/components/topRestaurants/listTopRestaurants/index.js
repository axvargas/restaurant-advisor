import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'

import RestaurantTop from '../restaurantTop';
const ListTopRestaurants = ({ restaurants, navigation }) => {
    return (
        <>
            <FlatList
                data={restaurants}
                renderItem={(restaurant) => < RestaurantTop restaurant={restaurant} navigation={navigation} />}
                keyExtractor={(restaurant) => restaurant.id}
            />
        </>
    )
}

export default ListTopRestaurants

const styles = StyleSheet.create({})
