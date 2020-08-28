import React, { useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import Loading from '../../loading';
import { useNavigation } from '@react-navigation/native'
import * as firebase from 'firebase';

const LoginForm = ({ toastRef }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const TOAST_DURATION = 3000;

    const { control, handleSubmit, errors, setError } = useForm();
    const navigation = useNavigation();
    const email = useRef();
    const password = useRef();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
            toastRef.current.show("Logged in", TOAST_DURATION);
            setLoading(false);
            navigation.navigate('account');
        } catch (error) {
            setLoading(false);
            const { code, message } = error;
            switch (code) {
                case 'auth/invalid-email':
                case 'auth/user-disabled':
                    setError("email", { type: "validate", message: message });
                    break;
                case 'auth/user-not-found':
                    setError("email", { type: "validate", message: "The user is not registered" });
                    break;
                case 'auth/wrong-password':
                    setError("password", { type: "validate", message: "The password is invalid or does not match the user" });
                    break;
                default:
                    break;
            }
            onError(errors);
        }
    }

    const onError = (errors) => {
        const { email, password } = errors;
        if (email) {
            toastRef.current.show(email.message, TOAST_DURATION);
        } else if (password) {
            toastRef.current.show(password.message, TOAST_DURATION);
        }
    }

    return (
        <>
            <Loading isVisible={loading} text={"Logging in"} />
            <View style={styles.formContainer}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        email.current.focus();
                    }}
                    rules={{
                        required: "The email is required",
                        pattern: {
                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "The email is not valid"
                        }
                    }}
                    render={({ onChange, onBlur, value }) => (
                        <Input
                            placeholder={"Email"}
                            containerStyle={styles.inputForm}
                            rightIcon={{
                                type: 'material-community',
                                name: 'at',
                                color: '#c1c1c1',
                            }}
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            value={value}
                            ref={email}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    onFocus={() => {
                        password.current.focus();
                    }}
                    rules={{
                        required: "The password is required",
                        minLength: {
                            value: 6,
                            message: "Supposed to be minimun 6 character length "
                        }
                    }}
                    render={({ onChange, onBlur, value }) => (
                        <Input
                            placeholder={"Password"}
                            containerStyle={styles.inputForm}
                            secureTextEntry={showPassword ? false : true}
                            rightIcon={{
                                type: 'material-community',
                                name: showPassword ? 'eye-off-outline' : 'eye-outline',
                                color: '#00a680',
                                onPress: () => {
                                    setShowPassword(!showPassword)
                                }
                            }}
                            onChangeText={(value) => {
                                onChange(value)
                            }}
                            value={value}
                            ref={password}
                        />
                    )}
                />

                <Button
                    raised
                    title="Log in"
                    containerStyle={styles.btnContainerStyle}
                    buttonStyle={styles.btnStyle}
                    onPress={handleSubmit(onSubmit, onError)}
                />

            </View>
        </>
    )
};

export default LoginForm;

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    inputForm: {
        width: "100%",
        marginTop: 5
    },
    btnStyle: {
        backgroundColor: "#00a680"
    },
    btnContainerStyle: {
        marginTop: 5,
        width: "95%",
    }
});
