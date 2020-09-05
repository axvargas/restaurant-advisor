import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements';

const Restaurant = ({ restaurant, navigation }) => {
    const { item: { name, images, description, address, id } } = restaurant;
    const imageRestaurant = images[0];
    const goToRestaurant = () => {
        navigation.navigate('restaurant', { id, name });
    }
    return (
        <TouchableOpacity
            onPress={goToRestaurant}
        >
            <View style={styles.viewItem}>
                <View style={styles.viewImageRestaurant}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color='#00a680' />}
                        source={imageRestaurant ?
                            { uri: imageRestaurant }
                            :
                            require("../../../../../assets/images/no-image.png")
                        }
                        style={styles.imageRestaurant}
                    />
                </View>
                <View>
                    <Text style={styles.txtRestaurantName}>{name}</Text>
                    <Text style={styles.txtRestaurantaddress}>{address}</Text>
                    <Text style={styles.txtRestaurantdescription}>{description.substr(0, 60)}...</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Restaurant

const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        margin: 10
    },
    viewImageRestaurant: {
        marginRight: 15
    },
    imageRestaurant: {
        width: 80,
        height: 80
    },
    txtRestaurantName: {
        fontWeight: 'bold'
    },
    txtRestaurantaddress: {
        paddingTop: 2,
        color: 'grey'
    },
    txtRestaurantdescription: {
        paddingTop: 2,
        color: 'grey',
        width: 300
    }
})
