import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Icon, Image } from 'react-native-elements';
const RestaurentSearch = ({ restaurant, navigation }) => {
    const { item: { name, images, rating, id } } = restaurant;
    const imageRestaurant = images[0];
    return (
        <ListItem
            title={name}
            leftAvatar={{
                source: imageRestaurant ? { uri: imageRestaurant } : require('../../../../assets/images/no-image.png')
            }}
            rightIcon={{
                type: 'material-community',
                name: "chevron-right",
                color: '#00a680'
            }}
            onPress={() => {
                navigation.navigate('restaurants', { screen: 'restaurant', params: { id, name } })
            }}
        />
    )
}

export default RestaurentSearch

const styles = StyleSheet.create({})
