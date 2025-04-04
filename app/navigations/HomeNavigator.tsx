import React from "react";
import { RootStackParamList } from "../assets/Types";

import { createStackNavigator } from "@react-navigation/stack";

import Weather from "../screens/home/Weather";
import HomeScreen from "../screens/mainMenu/HomeScreen";
import Attraction from "../screens/home/Attraction";

const Stack = createStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#E2BFD9",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontFamily: "Itim-Regular",
                    fontSize: 25,
                },
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="Weather" component={Weather} />
            <Stack.Screen name="Attraction" component={Attraction} />
        </Stack.Navigator>
    );
};

export default HomeNavigator;
