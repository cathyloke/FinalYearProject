import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";

import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import UpperTab from "../../components/UpperTab";

import { Entypo } from "@expo/vector-icons";

type ItineraryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ItineraryMenu'>;

type Props = {
  navigation: ItineraryScreenNavigationProp;
};

const ItineraryScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <MenuProvider backHandler={false} customStyles={{ backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>   
      <View style={styles.container}>
        <UpperTab navigation={navigation}></UpperTab>
        <ScrollView >  
          <Text style = {styles.header}>My Trips</Text>

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
                  <MenuOption onSelect={() => alert('Edit')} text="Edit Trip" /> 
                  <MenuOption onSelect={() => alert('Delete')} text="Delete Trip" />
                </MenuOptions>
              </Menu>
            </View> 

          </View>

          {/* second trip */}
          <View style={styles.content}>
            
            <Image style={styles.image} source={require('../../assets/images/HomeImage/Trip1.jpg')} />
            <View style= {styles.infoContainer}>
              <Text style= {styles.info}>Pahang Trip</Text>
              <Text style= {styles.info}>15 - 25 December</Text>
            </View>
                
            <View>
              <Menu>
                <MenuTrigger>
                  <Entypo name="dots-three-horizontal" size={24} color="black" />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyle}>
                  {/* change to function */}
                  <MenuOption onSelect={() => alert('Edit Trip')} text="Edit Trip" /> 
                  <MenuOption onSelect={() => alert('Delete')} text="Delete Trip" />
                </MenuOptions>
              </Menu>
            </View> 

          </View>

        </ScrollView>
      </View>
    </MenuProvider>
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

export default ItineraryScreen;