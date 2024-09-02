import React from "react";
import { RootStackParamList } from "../assets/Types";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type UpperTabProps = {
    navigation: StackNavigationProp<RootStackParamList>;
};

const UpperTab: React.FC<UpperTabProps> = ({ navigation }) => {
    return (
        <View style={styles.upperTab}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.greetingText}>Ferio</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
              <MaterialCommunityIcons name="logout" size={30} color="black" />
          </TouchableOpacity>
        </View>
    );
};

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
      height: 65,      
      elevation: 20, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
    },
    greetingText:{
      fontSize: 30,
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

export default UpperTab;