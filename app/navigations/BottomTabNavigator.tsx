import React from "react";
import { RootStackParamList } from '../assets/Types';
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/menu/HomeScreen"
import ItineraryScreen from "../screens/menu/ItineraryScreen";
import BudgetExpensesScreen from "../screens/menu/BudgetExpensesScreen";

import ProfileStackNavigator from "./StackNavigator";

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
    return (
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: '#C37BC3',
          tabBarStyle: {
            backgroundColor: '#E2BFD9',
            height: 80,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
          tabBarLabelStyle: {
            fontFamily: 'Itim-Regular',
            color: 'black',
            fontSize: 18,
            padding: 5
          },
          headerShown: false,
          tabBarShowLabel: false,
        }}>
          <BottomTab.Screen
            name="Home"
            component={HomeScreen}
            options={{ 
              tabBarIcon: ({focused}) => (            
                <MaterialCommunityIcons name='home' size={50} color={focused ? '#F7EFE5': 'black'}/>
              ),
            }}
          />
          <BottomTab.Screen
            name="Itinerary"
            component={ItineraryScreen}
            options={{ 
              tabBarIcon: ({focused}) => (            
                <MaterialCommunityIcons name='note' size={50} color={focused ? '#F7EFE5': 'black'}/>
              ),
            }}
          />
          <BottomTab.Screen
            name="BudgetExpenses"
            component={BudgetExpensesScreen}
            options={{ 
              tabBarIcon: ({focused}) => (            
                <MaterialCommunityIcons name='cash' size={50} color={focused ? '#F7EFE5': 'black'}/>
              ),
            }}
          />
          <BottomTab.Screen
            name="ProfileMenu"
            component={ProfileStackNavigator}
            options={{ 
              tabBarIcon: ({focused}) => (            
                <MaterialCommunityIcons name='account' size={50} color={focused ? '#F7EFE5': 'black'}/>
              ),
            }}
          />
        </BottomTab.Navigator>
    )
  }

  export default BottomTabNavigator;