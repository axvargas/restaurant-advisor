import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TopRestaurants from '../../screens/topRestaurants';

const Stack = createStackNavigator();

const TopRestaurantsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="top-restaurants"
                component={TopRestaurants}
                options={{
                    title: "Top Restaurants"
                }}
            />
        </Stack.Navigator>
    );
}

export default TopRestaurantsStack;
