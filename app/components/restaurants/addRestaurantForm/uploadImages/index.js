import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Icon, Avatar } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
const UploadImages = ({ imagesSelected, setImagesSelected, toastRef, TOAST_DURATION }) => {
    const selectImages = async () => {
        const { permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCameraRoll = permissions.cameraRoll.status;
        if (resultPermissionCameraRoll === 'denied') {
            toastRef.current.show("It's necesary to accept the permission to camera roll, go to settings and enable them", TOAST_DURATION);
        } else if (resultPermissionCameraRoll === 'granted') {
            try {
                const result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [4, 3]
                })
                if (result.cancelled) {
                    toastRef.current.show("You cancelled the image selection", TOAST_DURATION);
                } else {
                    setImagesSelected((prevState) => [...prevState, result.uri])
                    toastRef.current.show("Image successfully uploaded", 1000);
                }
            } catch (error) {
                const { message } = error;
                toastRef.current.show(message, TOAST_DURATION);
            }
        }
    }
    const removeImage = (imageURI) => {
        Alert.alert(
            "Delete image",
            "Are you sure you wnat to delete the image?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        setImagesSelected(prevState => prevState.filter(image => image !== imageURI))
                        toastRef.current.show("Image successfully deleted", 1000);
                    }
                }

            ],
            { cancelable: false }
        )
    }

    return (
        <View style={styles.viewImages}>
            {imagesSelected.length < 4 &&
                <Icon
                    type="material-community"
                    name='camera'
                    color='#a7a7a7'
                    containerStyle={styles.ctnIconStyle}
                    iconStyle={styles.iconStyle}
                    onPress={selectImages}
                    size={28}
                />
            }
            {imagesSelected.length > 0 &&
                imagesSelected.map((image, i) => (
                    <Avatar
                        key={i}
                        containerStyle={styles.miniAvatar}
                        source={{ uri: image }}
                        onLongPress={() => { removeImage(image) }}
                    />
                ))
            }
        </View>
    )
}

export default UploadImages

const styles = StyleSheet.create({
    viewImages: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 25
    },
    ctnIconStyle: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: '#e3e3e3',
        shadowColor: '#aaaaaa',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 2,
        elevation: 3,

    },
    miniAvatar: {
        width: 70,
        height: 70,
        marginRight: 5,
        borderRadius: 5,
    }
})
