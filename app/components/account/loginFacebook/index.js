import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SocialIcon } from 'react-native-elements';
import { FacebookApi } from '../../../utils/social';
import Loading from '../../../components/loading';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { useNavigation } from '@react-navigation/native';
const LoginFacebook = ({ toastRef }) => {
    const TOAST_DURATION = 3000;
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const login = async () => {
        try {
            await Facebook.initializeAsync(FacebookApi.application_id);
            const {
                type,
                token
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: FacebookApi.permissions,
            });
            if (type === 'success') {
                try {
                    setLoading(true);
                    const credentials = await firebase.auth.FacebookAuthProvider.credential(token);
                    await firebase.auth().signInWithCredential(credentials);
                    setLoading(false);
                    navigation.navigate('account');
                } catch (error) {
                    setLoading(false);
                    const { message } = error;
                    toastRef.current.show(message, TOAST_DURATION)
                }
            } else if (type === 'cancel') {
                toastRef.current.show("Log in with Facebook canceled", TOAST_DURATION)
            } else {
                toastRef.current.show("We are sorry :(, try it later", TOAST_DURATION)
            }
        } catch (error) {
            const { message } = error
            toastRef.current.show(message, TOAST_DURATION)
        }

    }
    return (
        <>
            <SocialIcon
                title="Log In With Facebook"
                button
                type="facebook"
                onPress={login}
                raised
            />
            <Loading isVisible={loading} text={"Loggin in..."} />
        </>
    )
}

export default LoginFacebook

const styles = StyleSheet.create({})
