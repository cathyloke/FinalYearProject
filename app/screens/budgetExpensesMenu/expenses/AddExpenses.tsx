import React, {useState} from "react";
import { Alert, TextInput, Text, View, Platform, StyleSheet, TouchableOpacity } from "react-native";
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

type AddExpensesNavigationProp = StackNavigationProp<RootStackParamList, 'AddExpenses'>;

type Props = {
  navigation: AddExpensesNavigationProp;
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

const AddExpenses: React.FC<Props> = ({ navigation }) => {
  const [category, setCategory] = useState(null);
  const [date, setDate] = useState(new Date());
  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowAndroidCalendar(false);
  };
  const [showAndroidCalendar, setShowAndroidCalendar] = useState(false);

  const DatePickerOS = () => {
    if (Platform.OS === 'ios'){
      return(
        <View>
          <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
        </View>
      )
    } else {
      return(
        <View>
          <TouchableOpacity onPress={() => {setShowAndroidCalendar(true);}}>
            <TextInput style={styles.input} placeholderTextColor={'#C37BC3'} placeholder='Enter date' editable={false} >
              <Text>{date.toDateString()}</Text>
            </TextInput>
          </TouchableOpacity>
          {showAndroidCalendar && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          
        </View>
      )
    }
      
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView >
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.action} onPress={() => {Alert.alert('Cancel adding expenses'); navigation.navigate('BudgetDetails')}}>
            <Text style={styles.actionText}>Cancel</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.action} onPress={() => {Alert.alert('Done adding expenses'); navigation.navigate('BudgetDetails')}}>
            <Text style={styles.actionText}>Done</Text>
          </TouchableOpacity>
        </View>

        
        <View style={[styles.inputContainer,{marginTop: 40}]}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>Category</Text>
          </View>
          <Dropdown
            style={styles.dropdown}
            data={categories}
            labelField="label"
            valueField="value"
            placeholder="Select Category"
            value={category}
            onChange={item => {
              setCategory(item.value);
            }}
            placeholderStyle={styles.placeholderText}
          ></Dropdown>
          
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.headerBox}>
            <Text style={styles.header}>Pay by</Text>
          </View>
          <TextInput style={styles.input} placeholderTextColor={'#C37BC3'} placeholder='Enter payer name' >
          </TextInput>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.headerBox}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.header}>Date</Text>
              <Ionicons name="calendar" size={25} color="black" style={{marginLeft: 10}} />
            </View>
          </View>
          {DatePickerOS()}
        </View>
        
        <View style={styles.fileContainer}>
          <Ionicons name="add" size={40} color="black" style={{marginLeft: 10}} />
        </View>

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F7EFE5', 
  },
  actionContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  action: {
    borderWidth: 1,
    marginHorizontal: 30,
    borderRadius: 10,
    width: 120,
    height: 40,
    backgroundColor: '#E2BFD9',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,                          //android
    shadowColor: '#000',                    //ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
  },
  actionText: {
    fontFamily: 'Itim-Regular',
    fontSize: 20
  },
  dropdown: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: 180,
    backgroundColor: '#E2BFD9',
    elevation: 15,                          //android
    shadowColor: '#000',                    //ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
  },
  placeholderText: {
    fontFamily: 'Itim-Regular', 
    fontSize: 20, 
    textAlign: 'center'
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
    textAlign:'center',
    color: 'black'
  },
  fileContainer:{
    borderWidth:1,
    margin:20,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  }
});

export default AddExpenses;