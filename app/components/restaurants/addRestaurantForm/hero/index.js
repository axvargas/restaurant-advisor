import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Image } from 'react-native-elements';

const WidthScreen = Dimensions.get('window').width;
const Hero = ({ imageRestaurant }) => {
    return (
        <Image
            source={{ uri: imageRestaurant }}
            style={styles.image}
            transition
        />
    )
}

export default Hero;

const styles = StyleSheet.create({
    hero: {
        alignItems: 'center',
        height: 200,
        marginBottom: 10
    },
    image: {
        width: WidthScreen,
        height: 200
    }
})
