import React, { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar, Rating } from 'react-native-elements'
import Review from '../../review';
import { firebaseApp } from '../../../utils/firebase';
import firebase from 'firebase/app'


const db = firebase.firestore(firebaseApp);
const ListReviews = ({ navigation, idRestaurant }) => {
    const [userLogged, setUserLogged] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
            try {
                !user ? setUserLogged(false) : setUserLogged(true);
            } catch (error) {
                console.log(error);
            }
        });
        return () => {
            unsubscriber();
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            const getReviews = async () => {
                const reviews = await db.collection('reviews')
                    .where('idRestaurant', '==', idRestaurant)
                    .get()

                const resultReviews = [];
                reviews.forEach((doc, i) => {
                    const data = doc.data();
                    data.id = doc.id;
                    resultReviews.push(data);
                })
                setReviews(resultReviews);
            }
            getReviews();
        }, [])
    );

    return (
        <View style={styles.viewFooter}>
            {
                userLogged ? (
                    <Button
                        title="Add your review"
                        buttonStyle={styles.btnAddReview}
                        titleStyle={styles.titleAddReview}
                        icon={{
                            type: 'material-community',
                            name: 'square-edit-outline',
                            color: '#00a680'
                        }}
                        onPress={() => navigation.navigate('addReview', { idRestaurant: idRestaurant })}
                    />
                ) : (

                        <View>
                            <Text
                                style={styles.txtNotLogged}
                                onPress={() => navigation.navigate('login')}
                            >
                                <Text style={{ fontWeight: 'bold' }}>
                                    Log in
                                </Text>
                                {" "}to write a review
                            </Text>

                        </View>
                    )
            }

            {
                reviews.length > 0 ?
                    reviews.map((review, i) => (
                        <Review key={i} reviewData={review} />
                    ))
                    :
                    <View>
                        <Text style={styles.txtNoReviews}>There are no reviews</Text>
                    </View>
            }
        </View>
    )
}

export default ListReviews

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: 'transparent'
    },
    titleAddReview: {
        color: '#00a680'
    },
    txtNotLogged: {
        textAlign: 'center',
        color: '#00a680',
        padding: 20
    },
    viewFooter: {
        marginBottom: 20
    },
    txtNoReviews: {
        marginTop: 15,
        textAlign: 'center'
    }
})
