import React, { useRef, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import * as firebase from 'firebase';
import Loading from '../../../components/loading';
import UserInfo from '../../../components/account/userInfo';
import AccoutOptions from '../../../components/account/accountOptions';
const UserLogged = ({ toastPrincipalRef }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState(null);
    const [reloadUserInfo, setReloadUserInfo] = useState(true);
    const TOAST_DURATION = 3000;
    const toastRef = useRef();
    useEffect(() => {
        (async () => {
            const userInfo = await firebase.auth().currentUser;
            setUser(userInfo);
        })()
        setReloadUserInfo(false)

        return () => {
            setUser(null);
        }
    }, [reloadUserInfo])

    return (
        <>
            <Toast ref={toastRef} position='top' opacity={0.8} />
            <View style={styles.viewUserInfo}>
                {user &&
                    <>
                        <UserInfo
                            user={user}
                            toastRef={toastRef}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                            TOAST_DURATION={TOAST_DURATION}
                        />
                        <AccoutOptions
                            user={user}
                            toastRef={toastRef}
                            TOAST_DURATION={TOAST_DURATION}
                            setReloadUserInfo={setReloadUserInfo}
                            toastPrincipalRef={toastPrincipalRef}
                        />
                    </>
                }

                <Button
                    raised
                    title="Log out"
                    buttonStyle={styles.btnLogOut}
                    titleStyle={styles.textBtnLogOut}
                    containerStyle={styles.ctnBtnLogOut}
                    onPress={async () => {
                        try {
                            toastPrincipalRef.current.show("Logged out", TOAST_DURATION);
                            await firebase.auth().signOut();
                        } catch (error) {
                            const { message } = error;
                            console.log("ERROR :", message)
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