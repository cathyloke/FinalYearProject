import React, {useState} from "react";
import { TouchableOpacity, TextInput, Text, View, Image, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";

type ItineraryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Itinerary'>;

type Props = {
  navigation: ItineraryScreenNavigationProp;
};

const ItineraryScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <UpperTab navigation={navigation}></UpperTab>
      <ScrollView >  
        <View style={styles.content}>



          <Text>Itinerary</Text>
        </View>
      </ScrollView>
    </View>
  );
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
    greetingText:{
      fontSize: 48,
      color: 'black', 
      fontFamily: 'Itim-Regular',
    },

    content:{
      alignItems: 'center',
      justifyContent: 'center',
        
    },
    header:{
        fontSize: 40,
        fontFamily: 'Itim-Regular',
        color: 'black',
    },

});

export default ItineraryScreen;