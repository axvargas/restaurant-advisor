import React, { useState, useEffect } from 'react'
import UserGuest from './userGuest';
import UserLogged from './userLogged';
import Loading from '../../components/loading';

import * as firebase from 'firebase';

const Account = () => {
    const [login, setLogin] = useState(null);
    useEffect(() => {
        const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
            try {
                !user ? setLogin(false) : setLogin(true);
            } catch (error) {
                console.log(error);
            }
        });
        return () => {
            console.log("Unmounting account");
            unsubscriber();
        }
    }, [])

    if (login === null) return <Loading isVisible={true} text="Loading" />;

    return login ? <UserLogged /> : <UserGuest />
}
export default Account;
