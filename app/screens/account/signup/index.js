import React, { useRef } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Image } from 'react-native-elements';
import Toast from 'react-native-easy-toast'; //*! Libreria con un problema ir a clase 56 pa arreglar useNativeDriver: true
import SignupForm from '../../../components/account/signupForm'
const Signup = () => {
    const toastRef = useRef();
    return (
        <>
            <Toast ref={toastRef} position="top" opacity={0.8} />
            <ScrollView>
                <Image
                    source={require('../../../../assets/images/logo-cool-v2.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
                <View
                    style={styles.viewForm}
                >
                    <SignupForm toastRef={toastRef} />
                </View>
            </ScrollView>
        </>
    )
}

export default Signup

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 200,
        marginTop: 20
    },
    viewForm: {
        marginRight: 40,
        marginLeft: 40
    }
})
