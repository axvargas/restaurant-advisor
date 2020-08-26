import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import Modal from '../../modal';
import ChangeNameForm from '../changeNameForm';
import ChangeEmailForm from '../changeEmailForm';
import ChangePasswordForm from '../changePasswordForm';
const AccountOptions = ({ user, toastRef, TOAST_DURATION, setReloadUserInfo, toastPrincipalRef }) => {
    const { displayName, email, providerData } = user;
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    const selectedComponent = (key) => {
        switch (key) {
            case 'name':
                setRenderComponent(
                    <ChangeNameForm
                        displayName={displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        TOAST_DURATION={TOAST_DURATION}
                        setReloadUserInfo={setReloadUserInfo}
                        setIsLoading={setIsLoading}
                    />
                );
                setShowModal(true);
                break;
            case 'email':
                setRenderComponent(
                    <ChangeEmailForm
                        email={email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        TOAST_DURATION={TOAST_DURATION}
                        setReloadUserInfo={setReloadUserInfo}
                        setIsLoading={setIsLoading}
                    />

                );
                setShowModal(true);
                break;
            case 'password':
                setRenderComponent(
                    <ChangePasswordForm
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        TOAST_DURATION={TOAST_DURATION}
                        setReloadUserInfo={setReloadUserInfo}
                        setIsLoading={setIsLoading}
                        isLoading={isLoading}
                        toastPrincipalRef={toastPrincipalRef}
                    />
                );
                setShowModal(true);
                break;

            default:
                setRenderComponent(null);
                break;
        }
    }
    const menuOptions = generateOptions(selectedComponent, providerData);

    return (
        <View>
            {
                menuOptions.map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.title}
                        leftIcon={{
                            type: item.iconType,
                            name: item.leftIcon,
                            color: item.leftIconColor
                        }}
                        rightIcon={{
                            type: item.iconType,
                            name: item.rightIcon,
                            color: item.rightIconColor
                        }}
                        containerStyle={styles.ctnListStyle}
                        onPress={item.onPress}
                    />
                ))
            }
            {renderComponent &&
                <Modal
                    isVisible={showModal}
                    setIsVisible={setShowModal}
                    isLoading={isLoading}
                >
                    {renderComponent}
                </Modal>
            }

        </View>
    )
}

const generateOptions = (selectedComponent, providerData) => {
    if (providerData.length !== 0) {
        if (providerData[0].providerId === "facebook.com") {
            return [
                {
                    title: "Change Name",
                    iconType: "material-community",
                    leftIcon: "account-circle",
                    leftIconColor: '#ccc',
                    rightIcon: 'chevron-right',
                    rightIconColor: '#00a680',
                    onPress: () => { selectedComponent("name") }
                }
            ]
        }
    }
    return [
        {
            title: "Change Name",
            iconType: "material-community",
            leftIcon: "account-circle",
            leftIconColor: '#ccc',
            rightIcon: 'chevron-right',
            rightIconColor: '#00a680',
            onPress: () => { selectedComponent("name") }
        },
        {
            title: "Change Email",
            iconType: "material-community",
            leftIcon: "at",
            leftIconColor: '#ccc',
            rightIcon: 'chevron-right',
            rightIconColor: '#00a680',
            onPress: () => { selectedComponent("email") }
        },
        {
            title: "Change Password",
            iconType: "material-community",
            leftIcon: "lock-reset",
            leftIconColor: '#ccc',
            rightIcon: 'chevron-right',
            rightIconColor: '#00a680',
            onPress: () => { selectedComponent("password") }
        }
    ]


}

export default AccountOptions;

const styles = StyleSheet.create({
    ctnListStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    }
})
