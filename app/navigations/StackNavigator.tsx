import React from "react";
import { RootStackParamList } from '../assets/Types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/menu/AccountScreen";

import AboutScreen from "../screens/accountMenu/AboutScreen";
import HelpCentreScreen from '../screens/accountMenu/HelpCentreScreen';
import FeedbackScreen from "../screens/accountMenu/Feedback";
import PrivacyAgreementScreen from "../screens/accountMenu/PrivacyAgreement";
import UserAgreementScreen from "../screens/accountMenu/UserAgreement";

const ProfileStack = createStackNavigator<RootStackParamList>();

const ProfileStackNavigator = () => {
    return (
      <ProfileStack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#C8A1E0', 
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontFamily: 'Itim-Regular',
              fontSize: 25,
          },
        }}>
          <ProfileStack.Screen
            name="Account"
            component={AccountScreen}
            options={{
              title: 'Profile',
              headerShown: false,
            }}
          />
          <ProfileStack.Screen
            name="AboutUs"
            component={AboutScreen}
            options={{
              title: 'About Us',
            }}
          />
          <ProfileStack.Screen
            name="Feedback"
            component={FeedbackScreen}
            options={{
              title: 'Feedback',
            }}
          />
          <ProfileStack.Screen
            name="HelpCentre"
            component={HelpCentreScreen}
            options={{
              title: 'Help Centre',
            }}
          />
          <ProfileStack.Screen
            name="PrivacyAgreement"
            component={PrivacyAgreementScreen}
            options={{
              title: 'Privacy Agreement',
            }}
          />
          <ProfileStack.Screen
            name="UserAgreement"
            component={UserAgreementScreen}
            options={{
              title: 'User Agreement',
            }}
          />
  
      </ProfileStack.Navigator>
    );
  }

  export default ProfileStackNavigator;