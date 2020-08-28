import React, { useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import Loading from '../../loading';
import { useNavigation } from '@react-navigation/native'
import * as firebase from 'firebase';

const SignupForm = ({ toastRef }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const TOAST_DURATION = 3000;

    const { control, handleSubmit, errors, getValues, setError } = useForm();
    const navigation = useNavigation();

    const email = useRef();
    const password = useRef();
    const password1 = useRef();

    const onSubmit = async (data) => {
        console.log("submit success");
        try {
            setLoading(true);
            await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
            setLoading(false);
            navigation.navigate('account');
        } catch (error) {
            setLoading(false);
            const { code, message } = error;
            switch (code) {
                case 'auth/email-already-in-use':
                case 'auth/invalid-email':
                    setError("email", { type: "validate", message: message });
                    break;
                case 'auth/operation-not-allowed':
                    setError("password", { type: "validate", message: message });
                    setError("email", { type: "validate", message: message });
                    break;
                case 'auth/weak-password':
                    setError("password", { type: "validate", message: message });
                    break;
                default:
                    break;
            }
            onError(errors);
        }
    }
    const onError = errors => {
        const { email, password, password1 } = errors;
        console.log("submit errors");
        if (email) {
            toastRef.current.show(email.message, TOAST_DURATION);
        } else if (password) {
            toastRef.current.show(password.message, TOAST_DURATION);
        } else if (password1) {
            toastRef.current.show(password1.message, TOAST_DURATION);
        }
    }
    return (
        <View
            style={styles.formContainer}
        >
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
                        placeholder="Email"
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
                        message: "Minimun 6 character length"
                    }
                }}
                render={({ onChange, onBlur, value }) => (
                    <Input
                        placeholder="Password"
                        secureTextEntry={showPassword ? false : true}
                        containerStyle={styles.inputForm}
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
            <Controller
                name="password1"
                control={control}
                defaultValue=""
                onFocus={() => {
                    password1.current.focus();
                }}
                rules={{
                    required: "The password confirmation is required",
                    validate: {
                        matchesPreviousPassword: value => {
                            const { password } = getValues();
                            return password === value || "Passwords should match!";
                        }
                    }
                }}
                render={({ onChange, onBlur, value }) => (
                    <Input
                        placeholder="Password confirmation"
                        secureTextEntry={showPassword1 ? false : true}
                        containerStyle={styles.inputForm}
                        rightIcon={{
                            type: 'material-community',
                            name: showPassword1 ? 'eye-off-outline' : 'eye-outline',
                            color: '#00a680',
                            onPress: () => {
                                setShowPassword1(!showPassword1)
                            }
                        }}
                        onChangeText={(value) => {
                            onChange(value)
                        }}
                        value={value}
                        ref={password1}
                    />
                )}
            />


            <Button
                raised
                title="Sign up"
                containerStyle={styles.btnContainerStyle}
                buttonStyle={styles.btnStyle}
                onPress={handleSubmit(onSubmit, onError)}
            />
            <Loading isVisible={loading} text={"Creating Account..."} />
        </View>
    )
}

export default SignupForm

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
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
})
