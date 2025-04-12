import React from "react";
import { RootStackParamList } from "../assets/Types";

import { createStackNavigator } from "@react-navigation/stack";

import Weather from "../screens/home/Weather";
import HomeScreen from "../screens/mainMenu/HomeScreen";
import Attraction from "../screens/home/Attraction";
import AttractionDetails from "../screens/home/AttractionDetails";
import Hotel from "../screens/home/Hotel";
import HotelDetails from "../screens/home/HotelDetails";
import HotelListings from "../screens/home/HotelListings";

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
            <Stack.Screen
                name="AttractionDetails"
                component={AttractionDetails}
            />
            <Stack.Screen name="Hotel" component={Hotel} />
            <Stack.Screen name="HotelListings" component={HotelListings} />
            <Stack.Screen name="HotelDetails" component={HotelDetails} />
        </Stack.Navigator>
    );
};

export default HomeNavigator;
