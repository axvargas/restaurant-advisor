import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';

const Modal = ({ isVisible, setIsVisible, isLoading, children }) => {

    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.overlay}
            onBackdropPress={() => {
                if (!isLoading) {
                    setIsVisible(false)
                }
            }}
        >
            {children}
        </Overlay>
    )
}

export default Modal;

const styles = StyleSheet.create({
    overlay: {
        height: 'auto',
        width: '90%',
        backgroundColor: '#fff',
        // borderColor: '#00a680',
        // borderWidth: 2,
        borderRadius: 10
    },
});
