import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../utils/firebase';
import * as firebase from 'firebase';
const Restaurants = ({ navigation }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
            !user ? setUser(null) : setUser(user);
            console.log("re-renderig");
        });
        return () => {
            unsubscriber();
        }
    }, [])
    return (
        <View style={styles.viewBody}>
            <Text>Restaurants</Text>
            {user && (
                <Icon
                    reverse
                    raised
                    type='material-community'
                    name='plus'
                    color='#00a680'
                    containerStyle={styles.ctnBtn}
                    onPress={() => {
                        navigation.navigate('addRestaurant')
                    }}
                />
            )}

        </View>
    )
}
export default Restaurants;

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: '#fff'
    },
    ctnBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    }
})