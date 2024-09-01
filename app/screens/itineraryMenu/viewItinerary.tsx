import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";

import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import UpperTab from "../../components/UpperTab";

import { Entypo } from "@expo/vector-icons";

type ViewItineraryNavigationProp = StackNavigationProp<RootStackParamList, 'ViewItinerary'>;

type Props = {
  navigation: ViewItineraryNavigationProp;
};

const ViewItinerary: React.FC<Props> = ({ navigation }) => {    //add routes
  return (
    <ScrollView style={styles.container}>
        <View style={{borderBottomWidth: 1, borderBottomColor:'grey'}}>
          <View style={styles.headerSection}>
            <Text style={styles.header}>Pahang Trip</Text>
            <Text style={styles.header}>15 - 25 December</Text>
          </View>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateContainer}>
            {['15/12', '16/12', '17/12', '18/12', '19/12', '20/12'].map((date, index) => (
              <TouchableOpacity key={index} style={styles.date}>
                <Text style={styles.dateText}>{date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Change to flat list */}
        <View style={{margin:10}}>
            <Text style={{fontFamily: 'Itim-Regular', fontSize: 30}}>Day 1</Text>
            <Text style={{fontFamily: 'Itim-Regular', fontSize: 20}}>anything related to Day 1</Text>
            <Text style={{fontFamily: 'Itim-Regular', fontSize: 20}}>anything related to Day 1</Text>
            <Text style={{fontFamily: 'Itim-Regular', fontSize: 20}}>anything related to Day 1</Text>
        </View>
        <View style={{margin:10}}>
            <Text style={{fontFamily: 'Itim-Regular', fontSize: 30}}>Day 2</Text>
            <Text style={{fontFamily: 'Itim-Regular', fontSize: 20}}>anything related to Day 2</Text>
            <Text style={{fontFamily: 'Itim-Regular', fontSize: 20}}>anything related to Day 2</Text>
            <Text style={{fontFamily: 'Itim-Regular', fontSize: 20}}>anything related to Day 2</Text>
        </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F7EFE5', 
  },
  headerSection:{
    borderWidth: 2,
    borderRadius: 10,
    width: '85%',
    height: 150,
    alignSelf: 'center',
    margin: 30,
    justifyContent: 'center',
    backgroundColor: '#E2BFD9'
  },
  header: {
    fontFamily: 'Itim-Regular',
    fontSize: 30,
    alignSelf:'center'

  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 30,
    alignSelf:'center'
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  date: {
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E2BFD9'
  },
  dateText: {
    textAlign: 'center',
    fontFamily: 'Itim-Regular',
    fontSize: 18
  }

});

export default ViewItinerary;