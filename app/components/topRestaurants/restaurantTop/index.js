import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Card, Image, Icon, Rating } from 'react-native-elements';

const RestaurantTop = ({ restaurant, navigation }) => {
    const { index, item: { name, images, rating, description, id } } = restaurant;
    const [iconColor, setIconColor] = useState('#000');
    const imageRestaurant = images[0];

    useEffect(() => {
        if (index === 0) {
            setIconColor('#efb819');
        } else if (index === 1) {
            setIconColor('#a3a3a3');
        } else if (index === 1) {
            setIconColor('#cd7f32');
        }
    }, [])

    const goToRestaurant = () => {
        navigation.navigate('restaurants', { screen: 'restaurant', params: { id, name } })
    }
    return (
        <TouchableOpacity
            onPress={goToRestaurant}
        >
            <Card containerStyle={styles.ctnCard}>
                <Icon
                    type="material-community"
                    name="chess-queen"
                    color={iconColor}
                    size={35}
                    containerStyle={styles.ctnIconStyle}
                />
                <Image
                    style={styles.imgRestaurant}
                    resizeMode='cover'
                    PlaceholderContent={<ActivityIndicator color='#00a680' />}
                    source={imageRestaurant ?
                        { uri: imageRestaurant }
                        :
                        require("../../../../assets/images/no-image.png")
                    }
                />
                <View style={styles.viewRating}>
                    <Text style={styles.txtName}>{name}</Text>
                    <Rating
                        imageSize={20}
                        readonly
                        startingValue={parseFloat(rating)}
                    />
                </View>
                <Text style={styles.txtDescription}>{description}</Text>
            </Card>
        </TouchableOpacity>
    )
}

export default RestaurantTop

const styles = StyleSheet.create({
    ctnCard: {
        marginBottom: 10,
        borderWidth: 2
    },
    ctnIconStyle: {
        position: 'absolute',
        top: -30,
        left: -30,
        zIndex: 20
    },
    imgRestaurant: {
        width: '100%',
        height: 200
    },
    viewRating: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    txtName: {
        fontSize: 20
    },
    txtDescription: {
        color: 'grey',
        marginTop: 5,
        textAlign: 'justify'
    }
})
