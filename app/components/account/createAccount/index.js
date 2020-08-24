import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
const CreateAccount = () => {
    const navigation = useNavigation();
    return (
        <Text
            style={styles.textRegister}
        >
            Don't have an account?
            <Text
                onPress={() => {
                    navigation.navigate("signup")
                }}
                style={styles.btnSignUp}
            >
                {" Sign Up"}
            </Text>
        </Text>
    )
}
export default CreateAccount

const styles = StyleSheet.create({
    textRegister: {
        textAlign: "right",
        marginTop: 15,
        marginRight: 10,
        marginLeft: 10
    },
    btnSignUp: {
        color: '#00a680',
        fontWeight: "bold"
    }
})
