import React from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Icon, Button } from 'react-native-elements';
import { firebaseApp } from '../../../utils/firebase';
import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);
const RestaurantFav = ({ restaurant, toastRef, TOAST_DURATION, setIsLoading, setSthRemoved, navigation }) => {
    const { item: { name, images, id } } = restaurant;
    const imageRestaurant = images[0];
    const confirmRemoveFavorite = () => {
        Alert.alert(
            "Delete restaurant from favorites",
            `Are you sure you want to remove ${name} from favorites`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: removeFavorite
                }
            ],
            { cancelable: false }
        )
    }

    const removeFavorite = async () => {
        try {
            setIsLoading(true);
            const response = await db.collection('favorites')
                .where('idRestaurant', '==', id)
                .where('idUser', '==', firebase.auth().currentUser.uid)
                .get()
            response.forEach(async (doc) => {
                const favId = doc.id;
                await db.collection('favorites').doc(favId).delete()
            })
            setIsLoading(false);
            setSthRemoved(true);
            toastRef.current.show("Restaurant removed from favorites", TOAST_DURATION)
        } catch (error) {
            setIsLoading(false);
            toastRef.current.show("There was an error, while removing :(, try it again later", TOAST_DURATION)
        }

    }

    const goToRestaurant = () => {
        navigation.navigate('restaurants', { screen: 'restaurant', params: { id, name } })
    }
    return (
        <View style={styles.viewRestaurantFav}>
            <TouchableOpacity
                onPress={goToRestaurant}
            >
                <Image
                    resizeMode='cover'
                    style={styles.img}
                    PlaceholderContent={<ActivityIndicator color='#00a680' />}
                    source={imageRestaurant ?
                        { uri: imageRestaurant }
                        :
                        require("../../../../assets/images/no-image.png")
                    }
                />
            </TouchableOpacity>
            <View style={styles.viewInfo}>
                <TouchableOpacity
                    onPress={goToRestaurant}
                >
                    <Text style={styles.txtName}>{name}</Text>
                </TouchableOpacity>
                <Icon
                    type="material-community"
                    name="heart"
                    color='#00a680'
                    containerStyle={styles.icnFavorite}
                    onPress={confirmRemoveFavorite}
                    underlayColor="transparent"
                />
            </View>
        </View>
    )
}

export default RestaurantFav

const styles = StyleSheet.create({
    viewRestaurantFav: {
        margin: 10
    },
    img: {
        width: '100%',
        height: 180
    },
    viewInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
        marginTop: -30,
        backgroundColor: '#ffff'
    },
    txtName: {
        fontSize: 25
    },
    icnFavorite: {
        marginTop: -35,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 50,
        zIndex: 50
    }
})
