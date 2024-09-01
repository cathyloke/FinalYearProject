import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";

import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import UpperTab from "../../components/UpperTab";

import { Entypo } from "@expo/vector-icons";

type UpdateItineraryNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateItinerary'>;

type Props = {
  navigation: UpdateItineraryNavigationProp;
};

const UpdateItinerary: React.FC<Props> = ({ navigation }) => {    //add routes
  return (
    <View>
        <Text>Update Itinerary</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  

});

export default UpdateItinerary;