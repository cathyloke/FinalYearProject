import React from "react";
import { RootStackParamList } from '../assets/Types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createStackNavigator } from "@react-navigation/stack";

import ItineraryScreen from "../screens/mainMenu/ItineraryScreen";

import CreateItinerary from '../screens/itineraryMenu/createItinerary';
import ViewItinerary from "../screens/itineraryMenu/viewItinerary";
import UpdateItinerary from "../screens/itineraryMenu/updateItinerary";

const Stack = createStackNavigator<RootStackParamList>();

const ItineraryNavigator = () => {
    return (
      <Stack.Navigator
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
          <Stack.Screen
            name="Itinerary"
            component={ItineraryScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateItinerary"
            component={CreateItinerary}
            options={{
              title: 'Create Itinerary',
            }}
          />
          <Stack.Screen
            name="ViewItinerary"
            component={ViewItinerary}
            options={{
              title: 'View Itinerary',
            }}
          />
          <Stack.Screen
            name="UpdateItinerary"
            component={UpdateItinerary}
            options={{
              title: 'Update Itinerary',
            }}
          />
        
  
      </Stack.Navigator>
    );
  }

  export default ItineraryNavigator;