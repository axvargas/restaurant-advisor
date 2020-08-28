import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../../components/loading';
import AddRestaurantForm from '../../../components/restaurants/addRestaurantForm';
import { ScrollView } from 'react-native-gesture-handler';
const AddRestaurant = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();
    return (
        <>
            <Toast ref={toastRef} position='top' opacity={0.8} />
            <ScrollView>
                <AddRestaurantForm
                    toastRef={toastRef}
                    setIsLoading={setIsLoading}
                />
                <Loading isVisible={isLoading} text="Creating restaurant" />
            </ScrollView>
        </>
    )
}

export default AddRestaurant

const styles = StyleSheet.create({})
