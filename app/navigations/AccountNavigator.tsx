import React from "react";
import { RootStackParamList } from "../assets/Types";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/mainMenu/AccountScreen";
import AccountDataManageScreen from "../screens/accountMenu/AccountDataManage";
import AboutScreen from "../screens/accountMenu/AboutScreen";
import HelpCentreScreen from "../screens/accountMenu/HelpCentreScreen";
import FeedbackScreen from "../screens/accountMenu/Feedback";
import PrivacyAgreementScreen from "../screens/accountMenu/PrivacyAgreement";
import UserAgreementScreen from "../screens/accountMenu/UserAgreement";
import PreferencesScreen from "../screens/accountMenu/PreferencesScreen";

const Stack = createStackNavigator<RootStackParamList>();

const AccountNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
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
        >
            <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    title: "Profile",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AccountDataManage"
                component={AccountDataManageScreen}
                options={{
                    title: "My Profile",
                }}
            />
            <Stack.Screen
                name="Preferences"
                component={PreferencesScreen}
                options={{
                    title: "My Preferences",
                }}
            />
            <Stack.Screen
                name="AboutUs"
                component={AboutScreen}
                options={{
                    title: "About Us",
                }}
            />
            <Stack.Screen
                name="Feedback"
                component={FeedbackScreen}
                options={{
                    title: "Feedback",
                }}
            />
            <Stack.Screen
                name="HelpCentre"
                component={HelpCentreScreen}
                options={{
                    title: "Help Centre",
                }}
            />
            <Stack.Screen
                name="PrivacyAgreement"
                component={PrivacyAgreementScreen}
                options={{
                    title: "Privacy Agreement",
                }}
            />
            <Stack.Screen
                name="UserAgreement"
                component={UserAgreementScreen}
                options={{
                    title: "User Agreement",
                }}
            />
        </Stack.Navigator>
    );
};

export default AccountNavigator;
