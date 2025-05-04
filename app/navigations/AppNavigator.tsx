import React from "react";
import { RootStackParamList } from "../assets/Types";
import { createStackNavigator } from "@react-navigation/stack";

import CoverScreen from "../screens/cover/CoverScreen";
import LoginScreen from "../screens/account/LoginScreen";
import LogoutScreen from "../screens/account/LogoutScreen";
import RegisterScreen from "../screens/account/RegisterScreen";
import TNCScreen from "../screens/information/T&C";

import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cover"
                component={CoverScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Logout"
                component={LogoutScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TNC"
                component={TNCScreen}
                options={{
                    headerShown: true,
                    title: "Terms & Conditions",
                    headerStyle: {
                        backgroundColor: "#E2BFD9",
                        height: 65,
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontFamily: "Itim-Regular",
                        fontSize: 25,
                    },
                    // headerBackTitleVisible: false,
                    headerBackTitle: "",
                }}
            />
            <Stack.Screen
                name="Menu"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
