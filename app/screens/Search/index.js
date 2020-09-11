import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { FireSQL } from 'firesql';

import NotFound from '../../components/search/notFound';
import RestaurantSearch from '../../components/search/restaurantSearch';
import firebase from 'firebase/app'
const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });
const Search = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        if (searchText) {
            const searchRestaurants = async () => {
                const response = await fireSQL.query(`SELECT * FROM restaurants WHERE name LIKE '${searchText}%'`);
                setRestaurants(response);
            }
            searchRestaurants();
        }
    }, [searchText])
    return (
        <View style={styles.view}>
            <SearchBar
                placeholder="Search your restaurant..."
                onChangeText={(e) => { setSearchText(e) }}
                containerStyle={styles.searchBar}
                value={searchText}
                lightTheme
            />
            {restaurants.length === 0 ?
                <NotFound />
                :
                <FlatList
                    data={restaurants}
                    renderItem={(restaurant) => < RestaurantSearch restaurant={restaurant} navigation={navigation} />}
                    keyExtractor={(restaurant) => restaurant.id}
                />
            }
        </View>
    )
}
export default Search;

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20
    },
    view: {
        flex: 1
    }
})
