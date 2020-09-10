import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from '../../screens/restaurants';
import Restaurant from '../../screens/restaurants/restaurant';
import AddRestaurant from '../../screens/restaurants/addRestaurant';
import AddReview from '../../screens/restaurants/addReview';
const Stack = createStackNavigator();

const RestaurantsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="restaurants"
                component={Restaurants}
                options={{
                    title: "Restaurants"
                }}
            />
            <Stack.Screen
                name="addRestaurant"
                component={AddRestaurant}
                options={{
                    title: "Add new restaurant"
                }}
            />
            <Stack.Screen
                name="restaurant"
                component={Restaurant}
            />
            <Stack.Screen
                name="addReview"
                component={AddReview}
                options={{
                    title: "New review"
                }}
            />
        </Stack.Navigator>
    );
}

export default RestaurantsStack;
