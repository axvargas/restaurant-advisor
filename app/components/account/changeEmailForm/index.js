import React, { useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { useForm, Controller } from 'react-hook-form';
import { reauthenticate } from '../../../utils/api';


const ChangeEmailForm = ({ email, setShowModal, toastRef, TOAST_DURATION, setReloadUserInfo, setIsLoading }) => {
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { control, handleSubmit, errors, setError } = useForm();

    const emailRef = useRef();
    const passwordRef = useRef();

    const loadingSyncTrue = () => {
        setIsLoading(true);
        setLoadingBtn(true);
    }
    const loadingSyncFalse = () => {
        setIsLoading(false);
        setLoadingBtn(false);
    }
    const onSubmit = async (data) => {
        loadingSyncTrue();
        const { email, password } = data;
        try {
            const reauthentication = await reauthenticate(password);
            if (reauthentication.error) {
                loadingSyncFalse();
                setError("password", { type: "validate", message: reauthentication.message });
                return;
            }
            await firebase.auth().currentUser.updateEmail(email);
            loadingSyncFalse();
            setReloadUserInfo(true);
            setShowModal(false);
            toastRef.current.show("Email successfully changed", TOAST_DURATION);
        } catch (error) {
            loadingSyncFalse();
            setShowModal(false);
            toastRef.current.show(error.message, TOAST_DURATION);
        }

    }

    return (
        <View style={styles.view}>
            <Controller
                name="email"
                control={control}
                defaultValue={email || "Facebook"}
                onFocus={() => {
                    emailRef.current.focus();
                }}
                rules={{
                    required: "The email is required",
                    pattern: {
                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "The email is not valid"
                    },
                    validate: {
                        matchesPreviousEmail: value => {
                            const compareWith = email || "Facebook";
                            return compareWith !== value || "The email can't be the same";
                        }
                    }
                }}
                render={({ onChange, value }) => (
                    <Input
                        placeholder="Email"
                        containerStyle={styles.ctnInput}
                        rightIcon={{
                            type: 'material-community',
                            name: 'at',
                            color: '#c2c2c2'
                        }}
                        onChangeText={(value) => {
                            onChange(value)
                        }}
                        value={value}
                        errorMessage={errors.email ? errors.email.message : ""}
                        ref={emailRef}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                defaultValue=""
                onFocus={() => {
                    passwordRef.current.focus();
                }}
                rules={{
                    required: "The password is required",
                    minLength: {
                        value: 6,
                        message: "Supposed to be minimun 6 character length "
                    }
                }}
                render={({ onChange, value }) => (
                    <Input
                        placeholder={"Password"}
                        containerStyle={styles.ctnInput}
                        secureTextEntry={showPassword ? false : true}
                        rightIcon={{
                            type: 'material-community',
                            name: showPassword ? 'eye-off-outline' : 'eye-outline',
                            color: '#c1c1c1',
                            onPress: () => {
                                setShowPassword(!showPassword)
                            }
                        }}
                        onChangeText={(value) => {
                            onChange(value)
                        }}
                        value={value}
                        errorMessage={errors.password ? errors.password.message : ""}
                        ref={passwordRef}
                    />
                )}
            />

            <Button
                title="Change email"
                containerStyle={styles.ctnBtn}
                buttonStyle={styles.btn}
                loading={loadingBtn}
                onPress={handleSubmit(onSubmit)}
            />

        </View>
    )
}

export default ChangeEmailForm;

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    ctnInput: {
        marginBottom: 0
    },
    btn: {
        backgroundColor: '#00a680'
    },
    ctnBtn: {
        marginTop: 10,
        width: '95%'
    }
});
