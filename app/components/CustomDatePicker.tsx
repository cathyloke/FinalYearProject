import React, {useState} from "react";
import { TextInput, Text, View, Platform, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export const CustomStartEndDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartAndroidCalendar, setShowStartAndroidCalendar] = useState(false);
  const [showEndAndroidCalendar, setEndStartAndroidCalendar] = useState(false);

  const onChangeStartDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setShowStartAndroidCalendar(false);
  };

  const onChangeEndDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setEndStartAndroidCalendar(false);
  };

  const DatePickerStartOS = () => {
    if (Platform.OS === 'ios'){
      return(
        <View>
          <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onChangeStartDate}
            />
        </View>
      )
    } else {
      return(
        <View>
          <TouchableOpacity onPress={() => {setShowStartAndroidCalendar(true);}}>
            <TextInput style={styles.dateInput} placeholderTextColor={'#C37BC3'} placeholder='Enter date' editable={false} >
              <Text>{startDate.toDateString()}</Text>
            </TextInput>
          </TouchableOpacity>
          {showStartAndroidCalendar && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onChangeStartDate}
            />
          )}
          
        </View>
      )
    }
  }

  const DatePickerEndOS = () => {
    if (Platform.OS === 'ios'){
      return(
        <View>
          <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={onChangeEndDate}
            />
        </View>
      )
    } else {
      return(
        <View>
          <TouchableOpacity onPress={() => {setEndStartAndroidCalendar(true);}}>
            <TextInput style={styles.dateInput} placeholderTextColor={'#C37BC3'} placeholder='Enter date' editable={false} >
              <Text>{endDate.toDateString()}</Text>
            </TextInput>
          </TouchableOpacity>
          {showEndAndroidCalendar && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={onChangeEndDate}
            />
          )}
          
        </View>
      )
    }
      
  }

  return(
    <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.inputLabel}>Start Date</Text>
            <Ionicons name="calendar" size={25} color="black" style={{marginLeft: 10}} />
        </View>
        {DatePickerStartOS()}
        </View>

        <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.inputLabel}>End Date</Text>
            <Ionicons name="calendar" size={25} color="black" style={{marginLeft: 10}} />
        </View>
        {DatePickerEndOS()} 
        </View>
    </View>
  )

}

const styles = StyleSheet.create({
    inputLabel:{
      fontSize: 20,
      fontFamily: 'Itim-Regular',
      color: 'black',
    },
    dateInput:{
      fontFamily: 'Itim-Regular',
      color: 'black',
      fontSize: 18,
      margin:10,
      textAlign: 'center',
      borderColor: 'black',
      borderRadius: 10,
      borderWidth: 2, 
      width: 170,
      height: 50,
      lineHeight: 50,
    },

  });