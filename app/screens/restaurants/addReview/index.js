import React, { useRef } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button, Input, AirbnbRating } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import Toast from 'react-native-easy-toast';
import Loading from '../../../components/loading';

import { firebaseApp } from '../../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

const AddReview = ({ route, navigation }) => {
    const { params: { idRestaurant } } = route
    const { control, handleSubmit, setError, clearErrors, errors } = useForm();

    const [rating, setRating] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const TOAST_DURATION = 3400

    const toastRef = useRef();
    const titleRef = useRef();
    const reviewRef = useRef();

    const onSubmit = async (data) => {
        if (!rating) {
            setError("rating", { type: "validate", message: "Select the rating of the restaurant" })
            onError(errors);
            return;
        }
        try {
            setIsLoading(true);
            const { title, review } = data;
            const user = firebase.auth().currentUser;
            const payload = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idRestaurant: idRestaurant,
                title: title,
                review: review,
                rating: rating,
                createdAt: new Date()
            }
            await db.collection('reviews').add(payload);
            await updateRestaurant();
            setIsLoading(false);
            navigation.goBack();

        } catch (error) {
            setIsLoading(false);
            toastRef.current.show("There was an error while sending the review :(, try it again later", TOAST_DURATION);
        }

    }
    const onError = (errors) => {
        console.log("ERRORS :", errors);
        const { title, review, rating } = errors
        if (title) {
            toastRef.current.show(title.message, TOAST_DURATION);
        } else if (rating) {
            toastRef.current.show(rating.message, TOAST_DURATION);
            clearErrors("rating")
        } else if (review) {
            toastRef.current.show(review.message, TOAST_DURATION);
        }
    }

    const updateRestaurant = async () => {
        const restaurantRef = db.collection('restaurants').doc(idRestaurant);

        const response = await restaurantRef.get();
        const restaurantData = response.data();
        const ratingTotal = restaurantData.ratingTotal + rating;
        const quantityOfVotes = restaurantData.quantityOfVotes + 1;
        const ratingResult = ratingTotal / quantityOfVotes;

        restaurantRef.update({
            rating: ratingResult,
            ratingTotal,
            quantityOfVotes
        })
    }
    return (
        <>
            <ScrollView style={styles.viewBody}>
                <View style={styles.viewRating}>
                    <AirbnbRating
                        count={5}
                        reviews={["Terrible", "Bad", "OK", "Good", "Excellent"]}
                        defaultRating={0}
                        size={35}
                        onFinishRating={(value) => {
                            setRating(value)
                        }}
                    />
                </View>
                <View style={styles.viewForm}>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        onFocus={() => {
                            titleRef.current.focus();
                        }}
                        rules={{
                            required: "The title of the review is required",
                        }}
                        render={({ onChange, value }) => (
                            <Input
                                placeholder="Title"
                                containerStyle={styles.ctnTitleInput}
                                onChangeText={(value) => {
                                    onChange(value)
                                }}
                                value={value}
                                ref={titleRef}
                            />
                        )}
                    />

                    <Controller
                        name="review"
                        control={control}
                        defaultValue=""
                        onFocus={() => {
                            reviewRef.current.focus();
                        }}
                        rules={{
                            required: "The review of the restaurant is required",
                        }}
                        render={({ onChange, value }) => (
                            <Input
                                placeholder="Review"
                                multiline
                                inputContainerStyle={styles.inputCtnReview}
                                onChangeText={(value) => {
                                    onChange(value)
                                }}
                                value={value}
                                ref={reviewRef}
                            />
                        )}
                    />

                    <Button
                        title="Send Review"
                        containerStyle={styles.ctnBtnStyle}
                        buttonStyle={styles.btnStyle}
                        onPress={handleSubmit(onSubmit, onError)}
                    />
                </View>
            </ScrollView>
            <Toast ref={toastRef} position='top' opacity={0.8} />
            <Loading isVisible={isLoading} text={"Sending review..."} />
        </>
    )
}

export default AddReview

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
    },
    viewRating: {
        height: 110,
        backgroundColor: '#f2f2f2'
    },
    viewForm: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
        marginTop: 40,
        marginBottom: 20
    },
    ctnTitleInput: {
        marginTop: 1,
        marginBottom: 5
    },
    inputCtnReview: {
        width: '100%',
        padding: 0,
        margin: 0
    },
    ctnBtnStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 20,
        marginBottom: 10,
        width: '95%',
    },
    btnStyle: {
        backgroundColor: '#00a680',
        marginBottom: 20
    }
})
