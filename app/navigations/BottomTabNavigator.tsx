import React from "react";
import { RootStackParamList } from '../assets/Types';
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/mainMenu/HomeScreen"
import ItineraryMenu from "./ItineraryNavigator";
import BudgetExpensesScreen from "../screens/mainMenu/BudgetExpensesScreen";

import AccountNavigator from "./AccountNavigator";

const BottomTab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
    return (
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: '#C37BC3',
          tabBarStyle: {
            backgroundColor: '#E2BFD9',
            height: 65,
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
                <MaterialCommunityIcons name='home' size={40} color={focused ? '#F7EFE5': 'black'}/>
              ),
            }}
          />
          <BottomTab.Screen
            name="ItineraryMenu"
            component={ItineraryMenu}
            options={{ 
              tabBarIcon: ({focused}) => (            
                <MaterialCommunityIcons name='note' size={35} color={focused ? '#F7EFE5': 'black'}/>
              ),
            }}
          />
          <BottomTab.Screen
            name="BudgetExpenses"
            component={BudgetExpensesScreen}
            options={{ 
              tabBarIcon: ({focused}) => (            
                <MaterialCommunityIcons name='cash' size={40} color={focused ? '#F7EFE5': 'black'}/>
              ),
            }}
          />
          <BottomTab.Screen
            name="ProfileMenu"
            component={AccountNavigator}
            options={{ 
              tabBarIcon: ({focused}) => (            
                <MaterialCommunityIcons name='account' size={40} color={focused ? '#F7EFE5': 'black'}/>
              ),
            }}
          />
        </BottomTab.Navigator>
    )
  }

  export default BottomTabNavigator;