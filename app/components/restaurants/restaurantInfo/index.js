import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements';
import Map from '../../map';

const RestaurantInfo = ({ location, name, address }) => {
    const listInfo = [
        {
            text: address,
            iconName: 'map-marker',
            iconType: 'material-community',
            action: null
        },
        {
            text: "0987496678",
            iconName: 'phone',
            iconType: 'material-community',
            action: null
        },
        {
            text: "correo@gmail.com",
            iconName: 'at',
            iconType: 'material-community',
            action: null
        }
    ]
    return (
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>
                Restaurant Info
            </Text>
            <Map
                location={location}
                name={name}
                height={100}
            />
            {
                listInfo.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.text}
                        leftIcon={{
                            name: item.iconName,
                            type: item.iconType,
                            color: '#00a680'
                        }}
                        containerStyle={styles.containerListItem}
                    />
                ))
            }
        </View>
    )
}

export default RestaurantInfo

const styles = StyleSheet.create({
    viewRestaurantInfo: {
        margin: 15,
        marginTop: 25
    },
    restaurantInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    containerListItem: {
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: 1
    }
})
