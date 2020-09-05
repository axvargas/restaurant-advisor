import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import UploadImages from '../uploadImages';
import Hero from '../hero';
import Map from '../map';
import { firebaseApp } from '../../../../utils/firebase';
import firebase from 'firebase/app';
import uuid from 'random-uuid-v4'
import 'firebase/storage';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

const FormAdd = ({ toastRef, TOAST_DURATION, setIsLoading }) => {
    const [restaurantLocation, setRestaurantLocation] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const { control, handleSubmit, setError, clearErrors, errors } = useForm();
    const nameRef = useRef();
    const addressRef = useRef();
    const descriptionRef = useRef();
    const navigation = useNavigation()

    const onSubmit = async (data) => {
        if (!restaurantLocation) {
            setError("location", { type: "validate", message: "Select the location in the map" })
            onError(errors);
            return;

        } if (imagesSelected.length === 0) {
            setError("images", { type: "validate", message: "Add a photo of the restaurant first" })
            onError(errors);
            return;
        }
        try {
            setIsLoading(true);
            const imageBlobs = await uploadImagesToStore();
            await saveRestaurant(data, imageBlobs);
            setIsLoading(false);
            toastRef.current.show("Restaurant succesfully created", TOAST_DURATION);
            navigation.navigate('restaurants');
        } catch (error) {
            setIsLoading(false);
            toastRef.current.show("There was an error while uploading the restaurant :(, try it again later", TOAST_DURATION);
        }

    }
    const onError = (errors) => {
        console.log(errors);
        const { name, address, location, description, images } = errors;
        console.log("submit errors");
        if (name) {
            toastRef.current.show(name.message, TOAST_DURATION);
        } else if (address) {
            toastRef.current.show(address.message, TOAST_DURATION);
        } else if (location) {
            toastRef.current.show(location.message, TOAST_DURATION);
            clearErrors("location")
        } else if (description) {
            toastRef.current.show(description.message, TOAST_DURATION);
        } else if (images) {
            toastRef.current.show(images.message, TOAST_DURATION);
            clearErrors("images")
        }
    }

    const uploadImagesToStore = async () => {

        console.log("Saving images...");
        const imageBlobs = [];
        await Promise.all(
            imagesSelected.map(async (image, i) => {

                const response = await fetch(image);
                const blob = await response.blob();
                const ref = firebase.storage().ref('restaurants').child(uuid());
                const uploadTask = await ref.put(blob);
                const imageName = uploadTask.metadata.name;
                const photoURL = await firebaseApp.storage().ref(`restaurants/${imageName}`).getDownloadURL();
                imageBlobs.push(photoURL);
            })
        );
        return imageBlobs;

    }

    const saveRestaurant = async (data, imageBlobs) => {
        const { name, address, description } = data;
        const newRestaurant = {
            name: name,
            address: address,
            description: description,
            location: restaurantLocation,
            images: imageBlobs,
            rating: 0,
            ratingTotal: 0,
            quantityOfVotes: 0,
            createAt: new Date(),
            createBy: firebase.auth().currentUser.uid
        }
        await db.collection('restaurants').add(newRestaurant);
    }
    return (
        <>
            {imagesSelected.length > 0 &&
                <Hero imageRestaurant={imagesSelected[0]} />
            }
            {
                isVisibleMap &&

                <Map
                    loc={restaurantLocation}
                    setLoc={setRestaurantLocation}
                    isVisibleMap={isVisibleMap}
                    setIsVisibleMap={setIsVisibleMap}
                    toastRef={toastRef}
                    TOAST_DURATION={TOAST_DURATION}
                />
            }
            <View style={styles.viewForm}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        nameRef.current.focus();
                    }}
                    rules={{
                        required: "The name of the restaurant is required",
                    }}
                    render={({ onChange, value }) => (
                        <Input
                            placeholder="Name of the restaurant"
                            containerStyle={styles.ctnInput}
                            rightIcon={{
                                type: 'material-community',
                                name: 'silverware-fork-knife',
                                color: '#c2c2c2'
                            }}
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            value={value}
                            ref={nameRef}
                        />
                    )}
                />
                <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        addressRef.current.focus();
                    }}
                    rules={{
                        required: "The address of the restaurant is required",
                    }}
                    render={({ onChange, value }) => (
                        <Input
                            placeholder="Address"
                            containerStyle={styles.ctnInput}
                            rightIcon={{
                                type: 'material-community',
                                name: 'google-maps',
                                color: restaurantLocation ? '#00a680' : '#ff8484',
                                onPress: () => {
                                    setIsVisibleMap(true)
                                }
                            }}
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            errorMessage={restaurantLocation ? `lat: ${Number(restaurantLocation.latitude).toFixed(3)}, long: ${Number(restaurantLocation.longitude).toFixed(3)}` : ""}
                            errorStyle={styles.locationErrorStyle}
                            value={value}
                            ref={addressRef}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        descriptionRef.current.focus();
                    }}
                    rules={{
                        required: "The description of the restaurant is required",
                    }}
                    render={({ onChange, value }) => (
                        <Input
                            multiline
                            placeholder="Description"
                            containerStyle={styles.ctnInput}
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            value={value}
                            ref={descriptionRef}
                        />
                    )}
                />
                <UploadImages
                    imagesSelected={imagesSelected}
                    setImagesSelected={setImagesSelected}
                    toastRef={toastRef}
                    TOAST_DURATION={TOAST_DURATION}
                />

                <View style={styles.viewBtn}>
                    <Button
                        raised
                        title="Add restaurant"
                        buttonStyle={styles.btnAddRestaurant}
                        onPress={handleSubmit(onSubmit, onError)}
                    />
                </View>

            </View>
        </>
    )
}

export default FormAdd;

const styles = StyleSheet.create({
    viewBtn: {
        marginRight: 10,
        marginLeft: 10,
    },
    viewForm: {
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        paddingBottom: 10
    },
    ctnInput: {
        marginBottom: 0
    },
    inputTextArea: {
        height: 100,
        width: '100%',
        padding: 0,
        margin: 0
    },
    btnAddRestaurant: {
        backgroundColor: '#00a680',
        elevation: 3
    },
    locationErrorStyle: {
        color: '#a8a8a8'
    }
})
