import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Rating } from 'react-native-elements';

const TitleRestaurant = ({ name, description, rating }) => {
    return (
        <View style={styles.viewRestaurantTitle}>
            <View style={styles.viewSecondary}>
                <Text style={styles.txtName}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.txtDescription}>{description}</Text>
        </View>
    )
}

export default TitleRestaurant

const styles = StyleSheet.create({
    viewRestaurantTitle: {
        padding: 15
    },
    viewSecondary: {
        flexDirection: 'row'
    },
    txtName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    txtDescription: {
        marginTop: 5,
        color: 'grey'
    },
    rating: {
        position: 'absolute',
        right: 0
    }
})
