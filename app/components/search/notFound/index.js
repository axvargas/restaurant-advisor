import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Image } from 'react-native-elements';

const NotFound = () => {
    return (
        <View style={styles.viewNotfound}>
            <Image
                style={styles.imgNotfound}
                resizeMode="cover"
                source={require('../../../../assets/images/no-result-found-cool.png')}
            />
        </View>
    )
}

export default NotFound

const styles = StyleSheet.create({
    viewNotfound: {
        flex: 1,
        alignItems: 'center'
    },
    imgNotfound: {
        width: 200,
        height: 200
    }
})
