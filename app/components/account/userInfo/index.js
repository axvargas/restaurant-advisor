import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const UserInfo = ({ user, toastRef, setLoading, setLoadingText, TOAST_DURATION }) => {
    const { uid, displayName, email, photoURL } = user;

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        try {
            const ref = firebase.storage().ref().child(`avatar/${uid}.jpg`);
            await ref.put(blob);
        } catch (error) {
            toastRef.current.show(error.message, TOAST_DURATION);
        }
    }

    const updatePhotoURL = async () => {
        const ref = firebase.storage().ref().child(`avatar/${uid}.jpg`)
        const downloadURL = await ref.getDownloadURL();
        const update = {
            photoURL: downloadURL
        }
        try {
            await firebase.auth().currentUser.updateProfile(update);
        } catch (error) {
            toastRef.current.show(error.message, TOAST_DURATION);
        }
    }
    const changeAvatar = async () => {
        const { permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermisionCameraRoll = permissions.cameraRoll.status;
        if (resultPermisionCameraRoll === 'denied') {
            toastRef.current.show("It's necesary to accept the permission to camera roll", TOAST_DURATION);
        } else if (resultPermisionCameraRoll === 'granted') {
            try {
                const result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [4, 3]
                })
                if (result.cancelled) {
                    toastRef.current.show("You cancelled the image selection", TOAST_DURATION);
                } else {
                    setLoading(true);
                    setLoadingText("Updating avatar");
                    await uploadImage(result.uri);
                    await updatePhotoURL();
                    setLoading(false);
                    setLoadingText(null);
                    toastRef.current.show("Avatar updated", TOAST_DURATION);
                }
            } catch (error) {
                const { message } = error;
                toastRef.current.show(message, TOAST_DURATION);
            }
        }
    }
    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                showAccessory
                size='large'
                containerStyle={styles.ctnAvatar}
                source={photoURL ?
                    { uri: photoURL } :
                    require('../../../../assets/images/avatar-default.jpg')
                }
                onAccessoryPress={changeAvatar}
            />
            <View>
                <Text style={styles.txtDisplayName}>
                    {displayName ? displayName : "User"}
                </Text>
                <Text >
                    {email ? email : "Facebook"}
                </Text>
            </View>

        </View>
    )
}

export default UserInfo

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingTop: 30,
        paddingBottom: 30
    },
    ctnAvatar: {
        marginRight: 20
    },
    txtDisplayName: {
        fontWeight: 'bold',
    }
})
