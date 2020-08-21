import React, { useEffect } from 'react';
import Navigation from './app/navigations/navigation';
import { firebaseApp } from './app/utils/firebase';			//RECORDÁ QUE DEBERIAS INSTALAR LA VERSION 7.9.0 
import * as firebase from 'firebase';

export default function App() {
	useEffect(() => {
		console.log("Hello world");
		firebase.auth().onAuthStateChanged(user => {
			console.log(user);
		})
	}, []);
	return (
		<Navigation />
	);
}

