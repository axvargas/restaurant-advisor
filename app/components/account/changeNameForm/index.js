import React, { useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import * as firebase from 'firebase';
const ChangeNameForm = ({ displayName, setShowModal, toastRef, TOAST_DURATION, setReloadUserInfo, setIsLoading }) => {
    const [loadingBtn, setLoadingBtn] = useState(false);
    const { control, handleSubmit, errors } = useForm();
    const name = useRef()

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
        const { name } = data;
        const update = {
            displayName: name
        }
        try {
            await firebase.auth().currentUser.updateProfile(update);
            loadingSyncFalse();
            setReloadUserInfo(true);
            setShowModal(false);
            toastRef.current.show("Name successfully changed", TOAST_DURATION);
        } catch (error) {
            loadingSyncFalse();
            setShowModal(false);
            toastRef.current.show(error.message, TOAST_DURATION);
        }

    }

    return (
        <View style={styles.view}>
            <Controller
                name="name"
                control={control}
                defaultValue={displayName || "User"}
                onFocus={() => {
                    name.current.focus();
                }}
                rules={{
                    required: "The name is required",
                    validate: {
                        matchesPreviousName: value => {
                            const compareWith = displayName || "User";
                            return compareWith !== value || "The name can't be the same";
                        }
                    }
                }}
                render={({ onChange, value }) => (
                    <Input
                        placeholder="Name"
                        containerStyle={styles.ctnInput}
                        rightIcon={{
                            type: 'material-community',
                            name: 'account-circle-outline',
                            color: '#c2c2c2'
                        }}
                        onChangeText={(value) => {
                            onChange(value)
                        }}
                        value={value}
                        errorMessage={errors.name ? errors.name.message : ""}
                        ref={name}
                    />
                )}
            />
            <Button
                title="Change Name"
                containerStyle={styles.ctnBtn}
                buttonStyle={styles.btn}
                loading={loadingBtn}
                onPress={handleSubmit(onSubmit)}
            />
        </View>
    )
}

export default ChangeNameForm;

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
})
