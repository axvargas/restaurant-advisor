import React, { useState, useEffect, useRef } from 'react'
import UserGuest from './userGuest';
import UserLogged from './userLogged';
import Loading from '../../components/loading';

import * as firebase from 'firebase';
import Toast from 'react-native-easy-toast';

const Account = () => {
    const [login, setLogin] = useState(null);
    const toastRef = useRef();

    useEffect(() => {
        const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
            try {
                !user ? setLogin(false) : setLogin(true);
            } catch (error) {
                console.log(error);
            }
        });
        return () => {
            unsubscriber();
        }
    }, [])

    if (login === null) return <Loading isVisible={true} text="Loading" />;

    return (
        <>
            <Toast ref={toastRef} position='top' opacity={0.8} />
            {login ? <UserLogged toastPrincipalRef={toastRef} /> : <UserGuest />}
        </>

    )
}
export default Account;
