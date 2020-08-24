import React, { useRef, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import * as firebase from 'firebase';
import Loading from '../../../components/loading';
import UserInfo from '../../../components/account/userInfo';
const UserLogged = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState(null);
    const TOAST_DURATION = 3000;
    const toastRef = useRef();
    useEffect(() => {
        (async () => {
            const userInfo = await firebase.auth().currentUser;
            setUser(userInfo);
        })()
        return () => {
            setUser(null);
        }
    }, [])

    return (
        <>
            <Toast ref={toastRef} position='top' opacity={0.8} />
            <View style={styles.viewUserInfo}>
                {user &&
                    <UserInfo
                        user={user}
                        toastRef={toastRef}
                        setLoading={setLoading}
                        setLoadingText={setLoadingText}
                        TOAST_DURATION={TOAST_DURATION}
                    />
                }

                <Text>Account options</Text>
                <Button
                    raised
                    title="Log out"
                    buttonStyle={styles.btnLogOut}
                    titleStyle={styles.textBtnLogOut}
                    containerStyle={styles.ctnBtnLogOut}
                    onPress={async () => {
                        try {
                            // setLoading(true);
                            await firebase.auth().signOut()
                            // toastRef.current.show("You logged out", TOAST_DURATION);
                            // setLoading(false)
                        } catch (error) {
                            // setLoading(false)
                            const { message } = error;
                            console.log("ERROR :", message)
                            // toastRef.current.show(message, TOAST_DURATION);
                        }

                    }}
                />
                <Loading isVisible={loading} text={loadingText} />
            </View>
        </>
    )
}
export default UserLogged;

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: '100%',
        backgroundColor: '#f2f2f2'
    },
    btnLogOut: {
        // marginTop: 20,
        borderRadius: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        paddingTop: 10,
        paddingBottom: 10
    },
    textBtnLogOut: {
        color: '#00a680'
    },
    ctnBtnLogOut: {
        marginTop: 20
    }
});