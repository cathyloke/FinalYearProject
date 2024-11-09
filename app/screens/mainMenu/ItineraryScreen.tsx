import React from "react";
import { Alert, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import UpperTab from "../../components/UpperTab";
import { SafeAreaView } from "react-native-safe-area-context";

type ItineraryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ItineraryMenu'>;

type Props = {
  navigation: ItineraryScreenNavigationProp;
};

const ItineraryScreen: React.FC<Props> = ({ navigation }) => {
  const handleUpdateTrip = () => {
    navigation.navigate('UpdateItinerary');
  }
  const handleDeleteTrip = () => {
    Alert.alert(
      'Are you sure to delete this trip?', 
      'You will not be able to recover the trip once it is deleted.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => console.log('Delete Trip'), // Replace with your delete logic
        },
      ]
    );
  };

  function renderMenuOption(text: string, type: 'Manual' | 'AI') {
    return (
      <MenuOption onSelect={() => navigation.navigate('CreateItinerary', { type })} text={text} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <UpperTab navigation={navigation}></UpperTab>
      <ScrollView >  
        <View style={styles.headerBar}>
          <Text style = {styles.header}>My Trips</Text>
          <View style={{ alignSelf: 'center'}}>
            <Menu>
              <MenuTrigger>
                <Entypo name="plus" size={35} color="black"/>
              </MenuTrigger>
              <MenuOptions customStyles={optionsStyle}>
                {renderMenuOption('Create Manually', 'Manual')}
                {renderMenuOption('Create through AI', 'AI')}
              </MenuOptions>
            </Menu>
          </View>
          
        </View>
        

        {/* List of trips in database */}
        {/* replace with flatlist, data from database */}
        <View style={styles.content}>
          
          <Image style={styles.image} source={require('../../assets/images/HomeImage/Trip1.jpg')} />
          <TouchableOpacity onPress={() => navigation.navigate('ViewItinerary')}>
            <View style= {styles.infoContainer}>
              <Text style= {styles.info}>Perak Trip</Text>
              <Text style= {styles.info}>15 - 25 December</Text>
            </View>
          </TouchableOpacity>
              
          <View>
            <Menu>
              <MenuTrigger>
                <Entypo name="dots-three-horizontal" size={24} color="black" />
              </MenuTrigger>
              <MenuOptions customStyles={optionsStyle}>
                {/* change to function */}
                <MenuOption onSelect={handleUpdateTrip} text="Edit Trip" /> 
                <MenuOption onSelect={handleDeleteTrip} text="Delete Trip" /> 
              </MenuOptions>
            </Menu>
          </View> 

        </View>

        {/* second trip */}
        <View style={styles.content}>
          
          <Image style={styles.image} source={require('../../assets/images/HomeImage/Trip1.jpg')} />
          <TouchableOpacity onPress={() => navigation.navigate('ViewItinerary')}>
            <View style= {styles.infoContainer}>
              <Text style= {styles.info}>Pahang Trip</Text>
              <Text style= {styles.info}>15 - 25 December</Text>
            </View>
          </TouchableOpacity>
              
          <View>
            <Menu>
              <MenuTrigger>
                <Entypo name="dots-three-horizontal" size={24} color="black" />
              </MenuTrigger>
              <MenuOptions customStyles={optionsStyle}>
                {/* change to function */}
                <MenuOption onSelect={handleUpdateTrip} text="Edit Trip" /> 
                <MenuOption onSelect={handleDeleteTrip} text="Delete Trip" /> 
              </MenuOptions>
            </Menu>
          </View> 

        </View>


      </ScrollView>
    </SafeAreaView>
 
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
  headerBar: {
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor: 'grey',
    marginHorizontal:20,
    justifyContent: 'space-between',
  },
  header:{
    fontSize: 25,
    padding:5,
    margin: 10,
    fontFamily: 'Itim-Regular',
    color: 'black',     
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

export default ItineraryScreen;