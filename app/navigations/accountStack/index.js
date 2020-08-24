import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../../screens/account';
import Login from '../../screens/account/login';
import Signup from '../../screens/account/signup';
const Stack = createStackNavigator();

const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="account"
                component={Account}
                options={{
                    title: "Account"
                }}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{
                    title: "Log in"
                }}
            />
            <Stack.Screen
                name="signup"
                component={Signup}
                options={{
                    title: "Sign up"
                }}
            />
        </Stack.Navigator>
    );
}

export default AccountStack;
