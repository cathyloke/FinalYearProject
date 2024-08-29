import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";

import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import UpperTab from "../../components/UpperTab";

import { Entypo } from "@expo/vector-icons";

type CreateItineraryNavigationProp = StackNavigationProp<RootStackParamList, 'CreateItinerary'>;

type Props = {
  navigation: CreateItineraryNavigationProp;
};

const CreateItinerary: React.FC<Props> = ({ navigation }) => {    //add routes
  return (
    <View>
        <Text>Create Itinerary</Text>
    </View>
  );
}


const optionsStyle = {
  optionsContainer: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    borderRadius: 15,
  },
  optionWrapper: {
    padding: 10,
  },
  optionText: {
    color: 'black',
    fontFamily: 'Itim-Regular',
    fontSize: 18,
  },

}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#F7EFE5', 
    },
    upperTab:{
      flexDirection: 'row',
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: 15, 
      backgroundColor: '#E2BFD9',
      height: 85,
    },
    content:{     
      flexDirection: 'row',
      margin: 20,
      justifyContent: 'space-between'
    },
    image: {
      width: 125,
      height: 125,
      borderRadius: 30,
    },
    header:{
      fontSize: 28,
      padding:5,
      margin: 10,
      fontFamily: 'Itim-Regular',
      color: 'black',
      borderBottomWidth:1,
      borderBottomColor: 'grey'
    },
    infoContainer: {
      justifyContent: 'flex-start',
    },
    info: {
      fontFamily: 'Itim-Regular',
      color: 'black',
      fontSize: 20,
    },

});

export default CreateItinerary;