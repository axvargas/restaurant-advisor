import React, { useEffect } from 'react';
import { YellowBox } from 'react-native';
import Navigation from './app/navigations/navigation';
import { firebaseApp } from './app/utils/firebase';			// *! RECORDÁ QUE DEBERIAS INSTALAR LA VERSION 7.9.0 
import * as firebase from 'firebase';

YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
	useEffect(() => {
		console.log("Initialazing the app");
	}, []);
	return (
		<Navigation />
	);
}

