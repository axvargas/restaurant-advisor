import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import { useForm, Controller } from 'react-hook-form';
import { Input } from 'react-native-elements';
import { reauthenticate } from '../../../utils/api';

import * as firebase from 'firebase';
const ChangePasswordForm = ({ setShowModal, toastRef, TOAST_DURATION, setReloadUserInfo, setIsLoading, toastPrincipalRef }) => {
    const [loadingBtn, setLoadingBtn] = useState(false);

    const [showPrevPassword, setShowPrevPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);

    const { control, handleSubmit, getValues, setError, errors } = useForm();
    const prevPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmationPassword = useRef();

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
        const { prevPassword, newPassword } = data;
        try {
            const reauthentication = await reauthenticate(prevPassword);
            if (reauthentication.error) {
                loadingSyncFalse();
                setError("prevPassword", { type: "validate", message: reauthentication.message });
                return;
            }
            await firebase.auth().currentUser.updatePassword(newPassword);
            loadingSyncFalse();
            setReloadUserInfo(true);
            setShowModal(false);
            toastPrincipalRef.current.show("Password successfully changed, you've been logged out", TOAST_DURATION);
            await firebase.auth().signOut();


        } catch (error) {
            loadingSyncFalse();
            setShowModal(false);
            toastRef.current.show(error.message, TOAST_DURATION);
        }
    }
    return (
        <View style={styles.view}>
            <Controller
                name="prevPassword"
                control={control}
                defaultValue=""
                onFocus={() => {
                    prevPasswordRef.current.focus();
                }}
                rules={{
                    required: "The password is required",
                }}
                render={({ onChange, value }) => (
                    <Input
                        placeholder="Previous password"
                        secureTextEntry={showPrevPassword ? false : true}
                        containerStyle={styles.ctnPrevPassInput}
                        rightIcon={{
                            type: 'material-community',
                            name: showPrevPassword ? 'eye-off-outline' : 'eye-outline',
                            color: '#c2c2c2',
                            onPress: () => {
                                setShowPrevPassword(!showPrevPassword)
                            }
                        }}
                        onChangeText={(value) => {
                            onChange(value)
                        }}
                        value={value}
                        errorMessage={errors.prevPassword ? errors.prevPassword.message : ""}
                        ref={prevPasswordRef}
                    />
                )}
            />
            <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                onFocus={() => {
                    newPasswordRef.current.focus();
                }}
                rules={{
                    required: "The new password is required",
                    minLength: {
                        value: 6,
                        message: "Minimun 6 character length"
                    }
                }}
                render={({ onChange, value }) => (
                    <Input
                        placeholder="New password"
                        secureTextEntry={showNewPassword ? false : true}
                        containerStyle={styles.ctnInput}
                        rightIcon={{
                            type: 'material-community',
                            name: showNewPassword ? 'eye-off-outline' : 'eye-outline',
                            color: '#c2c2c2',
                            onPress: () => {
                                setShowNewPassword(!showNewPassword)
                            }
                        }}
                        onChangeText={(value) => {
                            onChange(value)
                        }}
                        value={value}
                        errorMessage={errors.newPassword ? errors.newPassword.message : ""}
                        ref={newPasswordRef}
                    />
                )}
            />

            <Controller
                name="newPasswordConfirmation"
                control={control}
                defaultValue=""
                onFocus={() => {
                    confirmationPassword.current.focus();
                }}
                rules={{
                    required: "The new password confirmation is required",
                    validate: {
                        matchesNewPassword: value => {
                            const { newPassword } = getValues();
                            return newPassword === value || "Passwords should match!";
                        }
                    }
                }}
                render={({ onChange, value }) => (
                    <Input
                        placeholder="New password confirmation"
                        secureTextEntry={showConfirmationPassword ? false : true}
                        containerStyle={styles.ctnInput}
                        rightIcon={{
                            type: 'material-community',
                            name: showConfirmationPassword ? 'eye-off-outline' : 'eye-outline',
                            color: '#c2c2c2',
                            onPress: () => {
                                setShowConfirmationPassword(!showConfirmationPassword)
                            }
                        }}
                        onChangeText={(value) => {
                            onChange(value)
                        }}
                        value={value}
                        errorMessage={errors.newPasswordConfirmation ? errors.newPasswordConfirmation.message : ""}
                        ref={confirmationPassword}
                    />
                )}
            />

            <Button
                title="Change password"
                containerStyle={styles.ctnBtn}
                buttonStyle={styles.btn}
                loading={loadingBtn}
                onPress={handleSubmit(onSubmit)}
            />

        </View>
    )
}

export default ChangePasswordForm

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    ctnPrevPassInput: {
        marginBottom: 20
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
})
