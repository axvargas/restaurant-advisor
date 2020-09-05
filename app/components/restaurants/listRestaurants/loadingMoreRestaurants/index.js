import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'

const LoadingMoreRestaurants = ({ isLoadingMore }) => {
    if (isLoadingMore) {
        return (
            <View style={styles.viewLoadingRestaurants} >
                <ActivityIndicator size="large" />
            </View>
        )
    } else {
        return (
            <View style={styles.viewNoMore} >
                <Text>There are no more restaurants to load</Text>
            </View>
        )
    }

}

export default LoadingMoreRestaurants

const styles = StyleSheet.create({
    viewLoadingRestaurants: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewNoMore: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    }
})
