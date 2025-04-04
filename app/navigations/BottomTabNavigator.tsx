import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RootStackParamList } from '../assets/Types';

import HomeScreen from "../screens/mainMenu/HomeScreen"
import BudgetNavigator from "./BudgetNavigator";
import AccountNavigator from "./AccountNavigator";
import ItineraryNavigator from "./ItineraryNavigator";
import HomeNavigator from "./HomeNavigator";

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#E2BFD9',
          height: 90,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <BottomTab.Screen
        name="HomeMenu"
        component={HomeNavigator}
        options={{ 
          tabBarIcon: ({focused}) => (            
            <MaterialCommunityIcons name='home' size={40} color={focused ? 'black': '#F7EFE5'}/>
          ),
        }}
      />
      <BottomTab.Screen
        name="ItineraryMenu"
        component={ItineraryNavigator}
        options={{ 
          tabBarIcon: ({focused}) => (            
            <MaterialCommunityIcons name='note' size={35} color={focused ? 'black': '#F7EFE5'}/>
          ),
        }}
      />
      <BottomTab.Screen
        name="BudgetMenu"
        component={BudgetNavigator}
        options={{ 
          tabBarIcon: ({focused}) => (            
            <MaterialCommunityIcons name='cash' size={40} color={focused ? 'black': '#F7EFE5'}/>
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileMenu"
        component={AccountNavigator}
        options={{ 
          tabBarIcon: ({focused}) => (            
            <MaterialCommunityIcons name='account' size={40} color={focused ? 'black': '#F7EFE5'}/>
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

export default BottomTabNavigator;