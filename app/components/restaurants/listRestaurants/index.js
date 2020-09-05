import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    FlatList,
    View,
} from 'react-native'

import Restaurant from './restaurant';
import LoadingMoreRestaurants from './loadingMoreRestaurants';

const ListRestaurants = ({ restaurants, handleLoadMore, isLoadingMore }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.view}>
            {restaurants.length > 0 ?

                <FlatList
                    data={restaurants}
                    renderItem={(restaurant) => < Restaurant restaurant={restaurant} navigation={navigation} />}
                    keyExtractor={(restaurant) => restaurant.id}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={<LoadingMoreRestaurants isLoadingMore={isLoadingMore} />}
                />


                :
                <View style={styles.viewLoader}>
                    <ActivityIndicator size="large" color='#00a680' />
                    <Text style={styles.textLoader}>LOADING RESTAURANTS</Text>
                </View>
            }
        </View >
    )
}

export default ListRestaurants

const styles = StyleSheet.create({
    view: {
        marginRight: 10,
        marginLeft: 10
    },
    viewLoader: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLoader: {
        marginTop: 10,
        color: '#00a680',
        fontWeight: 'bold'
    }
})
