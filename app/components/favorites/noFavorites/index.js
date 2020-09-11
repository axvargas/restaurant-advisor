import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from "react-native-elements";
const NoFavorites = () => {
    return (
        <View style={styles.viewBody}>
            <Icon
                type="material-community"
                name="heart-broken-outline"
                size={40}
                color='#00a680'
            />
            <Text style={styles.txt}>You haven't added favorite restaurants yet</Text>
        </View>
    )
}

export default NoFavorites

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        fontSize: 15,
        textAlign: 'center'
    }
})
