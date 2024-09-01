import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { RouteProp } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import UpperTab from "../../components/UpperTab";

import { Entypo } from "@expo/vector-icons";

type CreateItineraryNavigationProp = StackNavigationProp<RootStackParamList, 'CreateItinerary'>;

type Props = {
  navigation: CreateItineraryNavigationProp;
  route: RouteProp<RootStackParamList, 'CreateItinerary'>;
};

const CreateItinerary: React.FC<Props> = ({ navigation, route }) => {
  const { type } = route.params;
  
  if (type === 'Manual') {
    return <ManualItinerary />;
  } else if (type === 'AI') {
    return <AIItinerary />;
  } else {
    return (
      <View>
        <Text>Invalid route parameter</Text>
      </View>
    );
  }
};

const ManualItinerary = () => {
  return(
    <View>
      <Text>Manual</Text>
    </View>
  )
}

const AIItinerary = () => {
  return(
    <View>
      <Text>AI</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  

});

export default CreateItinerary;