import React, {useState} from "react";
import { Alert, TextInput, Text, View, Platform, StyleSheet, TouchableOpacity, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import UpperTab from "../../../components/UpperTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

type CreateBudgetNavigationProp = StackNavigationProp<RootStackParamList, 'CreateBudget'>;

type Props = {
  navigation: CreateBudgetNavigationProp;
};

const categories = [
  { label: 'Flights', value: 'Flights' },
  { label: 'Food and Beverage', value: 'Food and Beverage' },
  { label: 'Accommodation', value: 'Accommodation' },
  { label: 'Souvenir', value: 'Souvenir' },
  { label: 'Snacks', value: 'Snacks' },
  { label: 'Petrol', value: 'Petrol' },
  { label: 'Other', value: 'Other' },
];

const CreateBudget: React.FC<Props> = ({ navigation }) => {

  const handleBudgetCreation = () => {
    Alert.alert('Budget created');
    navigation.navigate("BudgetExpenses");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.headerBox}>
          <Text style={styles.header}>Budget Name</Text>
        </View>
        <TextInput style={styles.input} placeholderTextColor={'#C37BC3'} placeholder='Enter budget name' >
        </TextInput>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.headerBox}>
          <Text style={styles.header}>Budget Amount</Text>
        </View>
        <TextInput style={styles.input} placeholderTextColor={'#C37BC3'} placeholder='Enter amount' >
        </TextInput>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBudgetCreation}>
        <Text style={styles.buttonText}>Create Budget</Text>
      </TouchableOpacity>
        
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F7EFE5', 
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20
  },
  header:{ 
    fontFamily: 'Itim-Regular', 
    fontSize: 20, 
    borderColor: 'black',
  },
  headerBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'Itim-Regular', 
    fontSize: 20, 
    borderColor: 'black',
    borderWidth: 1, 
    borderRadius: 10,
    width: 180,
    height: 40,
    backgroundColor: '#F1E4E4',
    textAlign:'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    width: 180,
    height: 50,
    backgroundColor: '#E2BFD9',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Itim-Regular',
    fontSize: 20
  },

  
 

});

export default CreateBudget;