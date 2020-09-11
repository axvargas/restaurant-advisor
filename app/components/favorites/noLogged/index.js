import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
const NoLogged = ({ navigation }) => {
    return (
        <View style={styles.viewBody}>
            <Icon
                type="material-community"
                name="alert-outline"
                size={40}
                color='#00a680'
            />
            <Text style={styles.txt}>Yo need to be looged to check out this section</Text>
            <Button
                title="Go to log in"
                containerStyle={styles.ctnBtnStyle}
                buttonStyle={styles.btnStyle}
                onPress={() => navigation.navigate('account', { screen: 'login' })}
            />
        </View>
    )
}

export default NoLogged

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        fontSize: 15,
        textAlign: 'center'
    },
    ctnBtnStyle: {
        marginTop: 20,
        width: '80%'
    },
    btnStyle: {
        backgroundColor: '#00a680'
    }
})
