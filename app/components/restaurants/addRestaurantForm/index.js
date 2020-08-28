import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import FormAdd from './formAdd';
const AddRestaurantForm = ({ toastRef, setIsLoading }) => {
    const TOAST_DURATION = 3000;
    return (
        <ScrollView style={styles.scrollView}>
            <FormAdd toastRef={toastRef} TOAST_DURATION={TOAST_DURATION} setIsLoading={setIsLoading} />
        </ScrollView>
    )
}

export default AddRestaurantForm

const styles = StyleSheet.create({
    scrollView: {
        height: '100%'
    }
})
