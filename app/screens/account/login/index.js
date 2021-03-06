import React, { useRef } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { Divider, Image } from 'react-native-elements'
import Toast from 'react-native-easy-toast'; //*! Libreria con un problema ir a clase 56 pa arreglar useNativeDriver: true
import CreateAccount from '../../../components/account/createAccount';
import LoginForm from '../../../components/account/loginForm';
import LoginFacebook from '../../../components/account/loginFacebook';
const Login = () => {
    const toastRef = useRef();
    return (
        <>
            <Toast ref={toastRef} position="top" opacity={0.8} />
            <ScrollView>
                <Image
                    source={require('../../../../assets/images/logo-cool-v2.png')}
                    resizeMode="contain"
                    transition={true}
                    style={styles.logo}
                />
                <View
                    style={styles.viewContainer}
                >
                    <LoginForm toastRef={toastRef} />
                    <CreateAccount />
                </View>
                <Divider style={styles.divider} />
                <View
                    style={styles.viewContainer}
                >
                    <LoginFacebook toastRef={toastRef} />
                </View>
            </ScrollView>
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40,
    },
    divider: {
        backgroundColor: '#00a680',
        margin: 20
    }
})
